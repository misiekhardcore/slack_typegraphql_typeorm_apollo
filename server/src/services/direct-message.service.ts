import { getRepository, Repository } from "typeorm";
import { DirectMessage } from "../entity/DirectMessage";
import { File } from "../entity/File";
import {
  CreateDirectMessageInput,
  UpdateDirectMessageInput,
} from "../inputs/DirectMessageInput";

export class DirectMessageService {
  private readonly directMessageRepository: Repository<DirectMessage>;
  constructor() {
    this.directMessageRepository = getRepository(DirectMessage);
  }

  public async create(
    createMessageInput: CreateDirectMessageInput,
    userId: number,
    file: File | null
  ): Promise<DirectMessage> {
    return await this.directMessageRepository
      .create({ ...createMessageInput, userFromId: userId, file })
      .save();
  }

  public async update(
    updateMessageInput: UpdateDirectMessageInput
  ): Promise<DirectMessage | undefined> {
    const { id, ...rest } = updateMessageInput;
    this.directMessageRepository.update({ id }, rest);
    return await this.directMessageRepository.findOne(id);
  }

  public async getOne(id: number): Promise<DirectMessage | undefined> {
    return await this.directMessageRepository.findOne(id);
  }

  public async getMany(
    userFromId: number,
    userToId: number,
    teamId: number
  ): Promise<DirectMessage[]> {
    return await this.directMessageRepository.find({
      where: [
        { userFromId, userToId, teamId },
        { userFromId: userToId, userToId: userFromId, teamId },
      ],
      order: { createdAt: "ASC" },
    });
  }

  public async populateMany<T>(
    message: DirectMessage,
    field: string
  ): Promise<T[]> {
    return await this.directMessageRepository
      .createQueryBuilder()
      .relation(DirectMessage, field)
      .of(message)
      .loadMany<T>();
  }

  public async populateOne<T>(
    message: DirectMessage,
    field: string
  ): Promise<T | undefined> {
    return await this.directMessageRepository
      .createQueryBuilder()
      .relation(DirectMessage, field)
      .of(message)
      .loadOne<T>();
  }
}
