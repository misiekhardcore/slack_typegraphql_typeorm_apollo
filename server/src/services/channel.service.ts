import { getRepository, Repository } from 'typeorm';
import { Channel } from '../entity/Channel';
import {
  CreateChannelInput,
  UpdateChannelInput,
} from '../inputs/ChannelInputs';

export class ChannelService {
  private readonly channelRepository: Repository<Channel>;

  constructor() {
    this.channelRepository = getRepository(Channel);
  }

  public async create(
    createChannelInput: CreateChannelInput
  ): Promise<Channel> {
    return this.channelRepository.create(createChannelInput).save();
  }

  public async update(
    updateChannelInput: UpdateChannelInput
  ): Promise<Channel | undefined> {
    const { id, ...rest } = updateChannelInput;
    this.channelRepository.update({ id }, rest);
    return this.channelRepository.findOne(id);
  }

  public async getOne(id: number): Promise<Channel | undefined> {
    return this.channelRepository.findOne(id);
  }

  public async getMany(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  public async populateMany<T>(channel: Channel, field: string): Promise<T[]> {
    return this.channelRepository
      .createQueryBuilder()
      .relation(Channel, field)
      .of(channel)
      .loadMany<T>();
  }

  public async populateOne<T>(
    channel: Channel,
    field: string
  ): Promise<T | undefined> {
    return this.channelRepository
      .createQueryBuilder()
      .relation(Channel, field)
      .of(channel)
      .loadOne<T>();
  }
}
