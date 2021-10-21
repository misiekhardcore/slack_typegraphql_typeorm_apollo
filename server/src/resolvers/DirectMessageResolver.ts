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
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { Context } from "../index";
import { CreateDirectMessageInput } from "../inputs/DirectMessageInput";
import { isAuth, isTeamMember } from "../permissions";
import { DirectMessageService } from "../services/direct-message.service";

@Resolver(() => DirectMessage)
export class DirectMessageResolver
  implements ResolverInterface<DirectMessage>
{
  private readonly directMessageService: DirectMessageService;
  constructor() {
    this.directMessageService = new DirectMessageService();
  }

  @Query(() => [DirectMessage])
  async getDirectMessages(@Ctx() { user }: Context) {
    if (!user) return [];
    return await this.directMessageService.getMany(user.id);
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
    const message = await this.directMessageService.create(
      createMessageInput,
      user?.id || 0
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
        payload.teamId === teamId &&
        payload.userToId === userToId &&
        payload.userFromId === user.id
      );
    },
  })
  @UseMiddleware(isTeamMember)
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
