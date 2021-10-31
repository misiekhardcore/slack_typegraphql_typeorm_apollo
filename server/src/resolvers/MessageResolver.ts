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
import { Channel } from "../entity/Channel";
import { File } from "../entity/File";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { Context } from "../index";
import { CreateMessageInput } from "../inputs/MessageInput";
import { isTeamMember } from "../permissions";
import { FileService } from "../services/file.service";
import { MessageService } from "../services/message.service";

@Resolver(() => Message)
export class MessageResolver implements ResolverInterface<Message> {
  private readonly messageService: MessageService;
  private readonly fileService: FileService;
  constructor() {
    this.messageService = new MessageService();
    this.fileService = new FileService();
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
  @UseMiddleware(isTeamMember)
  async createMessage(
    @Arg("messageInput") createMessageInput: CreateMessageInput,
    @Ctx() { user }: Context,
    @PubSub("NEW_MESSAGE") publish: Publisher<Message>
  ): Promise<Message> {
    let rawFile = await createMessageInput.file;
    let file: File | null = null;
    if (rawFile) {
      file = await this.fileService.create(rawFile);
    }

    const message = await this.messageService.create(
      createMessageInput,
      user!.id,
      file
    );

    await publish(message);
    return message;
  }

  @Subscription(() => Message, {
    topics: "NEW_MESSAGE",
    filter: async ({
      payload,
      args: { channelId },
    }: ResolverFilterData<Message, { channelId: number }, Context>) => {
      return payload.channelId === channelId;
    },
  })
  @UseMiddleware(isTeamMember)
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

  @FieldResolver()
  async file(@Root() message: Message) {
    return (
      (await this.messageService.populateOne<File>(message, "file")) ||
      new File()
    );
  }
}
