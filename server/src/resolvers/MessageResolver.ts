import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  Subscription,
} from "type-graphql";
import { Channel } from "../entity/Channel";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { Context } from "../index";
import { CreateMessageInput } from "../inputs/MessageInput";
import { MessageService } from "../services/message.service";

@Resolver(() => Message)
export class MessageResolver implements ResolverInterface<Message> {
  private readonly messageService: MessageService;
  constructor() {
    this.messageService = new MessageService();
  }

  @Query(() => [Message])
  async getMessages(@Arg("channelId") channelId: number) {
    return await this.messageService.getMany(channelId);
  }

  @Query(() => Message)
  async getMessage(@Arg("messageId") messageId: number) {
    return await this.messageService.getOne(messageId);
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("messageInput") createMessageInput: CreateMessageInput,
    @Ctx() { user }: Context,
    @PubSub("NEW_MESSAGE") publish: Publisher<Message>
  ): Promise<Message> {
    const message = await this.messageService.create(
      createMessageInput,
      user?.id || 0
    );

    await publish(message);
    return message;
  }

  @Subscription(() => Message, {
    topics: "NEW_MESSAGE",
    filter: ({
      payload,
      args,
    }: {
      payload: Message;
      args: { channelId: number };
    }) => {
      return payload.channelId === args.channelId;
    },
  })
  newMessage(
    @Root() payload: Message,
    @Arg("channelId") _channelId: number
  ): Message {
    return payload;
  }

  @FieldResolver()
  async channel(@Root() message: Message) {
    return (
      (await this.messageService.populateOne<Channel>(
        message,
        "channel"
      )) || new Channel()
    );
  }

  @FieldResolver()
  async user(@Root() message: Message) {
    return (
      (await this.messageService.populateOne<User>(message, "user")) ||
      new User()
    );
  }
}
