import { FindManyOptions, getRepository, LessThan, Repository } from 'typeorm';
import { File } from '../entity/File';
import { Message } from '../entity/Message';
import { CreateMessageInput, UpdateMessageInput } from '../inputs/MessageInput';

export class MessageService {
  private readonly messageRepository: Repository<Message>;

  constructor() {
    this.messageRepository = getRepository(Message);
  }

  public async create(
    createMessageInput: CreateMessageInput,
    userId: number,
    file: File | null
  ): Promise<Message> {
    return this.messageRepository
      .create({ ...createMessageInput, userId, file })
      .save();
  }

  public async update(
    updateMessageInput: UpdateMessageInput
  ): Promise<Message | undefined> {
    const { id, ...rest } = updateMessageInput;
    this.messageRepository.update({ id }, rest);
    return this.messageRepository.findOne(id);
  }

  public async getOne(id: number): Promise<Message | undefined> {
    return this.messageRepository.findOne(id);
  }

  public async getMany(channelId: number, cursor?: string): Promise<Message[]> {
    const options: FindManyOptions<Message> | undefined = {
      where: { channelId },
      order: { createdAt: 'DESC' },
      take: 35,
    };

    if (cursor) {
      options.where = {
        channelId,
        createdAt: LessThan(cursor),
      };
    }

    return this.messageRepository.find(options);
  }

  public async populateMany<T>(message: Message, field: string): Promise<T[]> {
    return this.messageRepository
      .createQueryBuilder()
      .relation(Message, field)
      .of(message)
      .loadMany<T>();
  }

  public async populateOne<T>(
    message: Message,
    field: string
  ): Promise<T | undefined> {
    return this.messageRepository
      .createQueryBuilder()
      .relation(Message, field)
      .of(message)
      .loadOne<T>();
  }
}
