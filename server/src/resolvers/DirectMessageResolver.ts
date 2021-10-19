import { AuthenticationError } from "apollo-server-errors";
import { DirectMessage } from "../entity/DirectMessage";
import { CreateDirectMessageInput } from "../inputs/DirectMessageInput";
import { DirectMessageService } from "../services/direct-message.service";
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
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { Context } from "../index";
import { isAuth } from "../permissions";
import { ChannelService } from "../services/channel.service";
import { TeamMemberService } from "../services/team-member.service";

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
    topics: "NEW_MESSAGE",
    filter: async ({
      payload,
      args: { channelId },
      context: { user },
    }: ResolverFilterData<Message, { channelId: number }, Context>) => {
      const channelService = new ChannelService();
      const teamMemberService = new TeamMemberService();
      const { teamId } = (await channelService.getOne(channelId)) || {};
      if (!(user && teamId))
        throw new AuthenticationError("Not athenticated");
      const member = teamMemberService.getOne(user.id, teamId);
      if (!member)
        throw new AuthenticationError(
          "You have to be a part of a team"
        );
      return payload.channelId === channelId;
    },
  })
  @UseMiddleware(isAuth)
  newDirectMessage(
    @Root() payload: DirectMessage,
    @Arg("userToId") _userToId: number
  ): DirectMessage {
    return payload;
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
        "userFrom"
      )) || new User()
    );
  }
}
