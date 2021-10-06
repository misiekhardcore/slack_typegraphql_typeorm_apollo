import { getRepository, Repository } from "typeorm";
import { Message } from "../entity/Message";
import {
  CreateMessageInput,
  UpdateMessageInput,
} from "../inputs/MessageInput";

export class MessageService {
  private readonly messageRepository: Repository<Message>;
  constructor() {
    this.messageRepository = getRepository(Message);
  }

  public async create(
    createMessageInput: CreateMessageInput,
    userId: number
  ) {
    return await this.messageRepository
      .create({ ...createMessageInput, userId })
      .save();
  }

  public async update(updateMessageInput: UpdateMessageInput) {
    const { id, ...rest } = updateMessageInput;
    this.messageRepository.update({ id }, rest);
    return await this.messageRepository.findOne(id);
  }

  public async getOne(id: number) {
    return await this.messageRepository.findOne(id);
  }

  public async getMany(channelId: number) {
    return await this.messageRepository.find({ where: { channelId } });
  }

  public async populateMany<T>(
    message: Message,
    field: string
  ): Promise<T[]> {
    return await this.messageRepository
      .createQueryBuilder()
      .relation(Message, field)
      .of(message)
      .loadMany<T>();
  }

  public async populateOne<T>(
    message: Message,
    field: string
  ): Promise<T | undefined> {
    return await this.messageRepository
      .createQueryBuilder()
      .relation(Message, field)
      .of(message)
      .loadOne<T>();
  }
}
