import { AuthenticationError } from 'apollo-server-errors';
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
} from 'type-graphql';
import { ChannelService } from '../services/channel.service';
import { Channel } from '../entity/Channel';
import { File } from '../entity/File';
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import { Context } from '../index';
import { CreateMessageInput } from '../inputs/MessageInput';
import { isTeamMember } from '../permissions';
import { FileService } from '../services/file.service';
import { MessageService } from '../services/message.service';
import { ChannelMemberService } from '../services/channel-member.service';

@Resolver(() => Message)
export class MessageResolver implements ResolverInterface<Message> {
  private readonly messageService: MessageService;

  private readonly fileService: FileService;

  private readonly channelService: ChannelService;

  private readonly channelMemberService: ChannelMemberService;

  constructor() {
    this.messageService = new MessageService();
    this.fileService = new FileService();
    this.channelService = new ChannelService();
    this.channelMemberService = new ChannelMemberService();
  }

  @Query(() => [Message], { nullable: true })
  async getMessages(
    @Arg('channelId') channelId: number,
    @Ctx() { user }: Context,
    @Arg('cursor', { nullable: true }) cursor?: string
  ) {
    if (!user) return null;

    const channel = await this.channelService.getOne(channelId);

    if (!channel?.isPublic) {
      const member = this.channelMemberService.getOne(user.id, channelId);
      if (!member) throw new AuthenticationError('Not authenticated');
    }

    return this.messageService.getMany(channelId, cursor);
  }

  @Query(() => Message, { nullable: true })
  async getMessage(@Arg('messageId') messageId: number) {
    return this.messageService.getOne(messageId);
  }

  @Mutation(() => Message)
  @UseMiddleware(isTeamMember)
  async createMessage(
    @Arg('messageInput') createMessageInput: CreateMessageInput,
    @Ctx() { user }: Context,
    @PubSub('NEW_MESSAGE') publish: Publisher<Message>
  ): Promise<Message> {
    if (!user) throw new AuthenticationError('not authenticated');
    const rawFile = await createMessageInput.file;
    let file: File | null = null;
    if (rawFile) {
      file = await this.fileService.create(rawFile);
    }

    const message = await this.messageService.create(
      createMessageInput,
      user.id,
      file
    );

    await publish(message);
    return message;
  }

  @Subscription(() => Message, {
    topics: 'NEW_MESSAGE',
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
    @Arg('channelId') _channelId: number
  ): Message {
    return payload;
  }

  @FieldResolver()
  async channel(@Root() message: Message) {
    return (
      (await this.messageService.populateOne<Channel>(message, 'channel')) ||
      new Channel()
    );
  }

  @FieldResolver()
  async user(@Root() message: Message) {
    return (
      (await this.messageService.populateOne<User>(message, 'user')) ||
      new User()
    );
  }

  @FieldResolver({ nullable: true })
  async file(@Root() message: Message) {
    return (
      (await this.messageService.populateOne<File>(message, 'file')) || null
    );
  }
}
