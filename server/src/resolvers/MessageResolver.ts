import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
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
  async getMessages() {
    return await this.messageService.getMany();
  }

  @Query(() => Message)
  async getMessage(messageId: number) {
    return await this.messageService.getOne(messageId);
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("messageInput") createMessageInput: CreateMessageInput,
    @Ctx() { user }: Context
  ): Promise<Message> {
    return this.messageService.create(createMessageInput, user.id);
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
