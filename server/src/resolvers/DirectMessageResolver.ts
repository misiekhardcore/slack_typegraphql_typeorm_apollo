import { AuthenticationError } from "apollo-server-errors";
import { DirectMessage } from "src/entity/DirectMessage";
import { CreateDirectMessageInput } from "src/inputs/DirectMessageInput";
import { DirectMessageService } from "src/services/direct-message.service";
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
  async getMessages(@Arg("channelId") channelId: number) {
    return await this.directMessageService.getMany(channelId);
  }

  @Mutation(() => DirectMessage)
  async createMessage(
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
  newMessage(
    @Root() payload: DirectMessage,
    @Arg("channelId") _channelId: number
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
