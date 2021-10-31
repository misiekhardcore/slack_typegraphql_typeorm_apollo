import { AuthenticationError } from "apollo-server-errors";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  ResolverInterface,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { DirectMessage } from "../entity/DirectMessage";
import { File } from "../entity/File";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { Context } from "../index";
import { CreateDirectMessageInput } from "../inputs/DirectMessageInput";
import { isAbleToDirectMessage, isAuth } from "../permissions";
import { DirectMessageService } from "../services/direct-message.service";
import { FileService } from "../services/file.service";

@Resolver(() => DirectMessage)
export class DirectMessageResolver
  implements ResolverInterface<DirectMessage>
{
  private readonly directMessageService: DirectMessageService;
  private readonly fileService: FileService;
  constructor() {
    this.directMessageService = new DirectMessageService();
    this.fileService = new FileService();
  }

  @Query(() => [DirectMessage])
  async getDirectMessages(
    @Ctx() { user }: Context,
    @Arg("userToId") userToId: number,
    @Arg("teamId") teamId: number
  ) {
    if (!user) return [];
    return await this.directMessageService.getMany(
      user.id,
      userToId,
      teamId
    );
  }

  @Query(() => DirectMessage)
  async getDirectMessage(@Arg("messageId") messageId: number) {
    return await this.directMessageService.getOne(messageId);
  }

  @Mutation(() => DirectMessage)
  @UseMiddleware(isAuth)
  async createDirectMessage(
    @Arg("messageInput") createMessageInput: CreateDirectMessageInput,
    @Ctx() { user }: Context,
    @PubSub("NEW_DIRECT_MESSAGE") publish: Publisher<DirectMessage>
  ): Promise<DirectMessage> {
    let rawFile = await createMessageInput.file;
    let file: File | null = null;
    if (rawFile) {
      file = await this.fileService.create(rawFile);
    }
    const message = await this.directMessageService.create(
      createMessageInput,
      user!.id,
      file
    );

    await publish(message);
    return message;
  }

  @Subscription(() => DirectMessage, {
    topics: "NEW_DIRECT_MESSAGE",
    filter: async ({
      payload,
      args: { teamId, userToId },
      context: { user },
    }: ResolverFilterData<
      DirectMessage,
      { teamId: number; userToId: number },
      Context
    >) => {
      if (!user) throw new AuthenticationError("not authenticated");
      return (
        (payload.teamId === teamId &&
          payload.userToId === userToId &&
          payload.userFromId === user.id) ||
        (payload.teamId === teamId &&
          payload.userFromId === userToId &&
          payload.userToId === user.id)
      );
    },
  })
  @UseMiddleware(isAbleToDirectMessage)
  newDirectMessage(
    @Root() payload: DirectMessage,
    @Arg("userToId") _userToId: number,
    @Arg("teamId") _teamId: number
  ): DirectMessage {
    return payload;
  }

  @FieldResolver()
  async team(@Root() message: DirectMessage) {
    return (
      (await this.directMessageService.populateOne<Team>(
        message,
        "team"
      )) || new Team()
    );
  }

  @FieldResolver()
  async userFrom(@Root() message: DirectMessage) {
    return (
      (await this.directMessageService.populateOne<User>(
        message,
        "userFrom"
      )) || new User()
    );
  }

  @FieldResolver()
  async userTo(@Root() message: DirectMessage) {
    return (
      (await this.directMessageService.populateOne<User>(
        message,
        "userTo"
      )) || new User()
    );
  }
}
