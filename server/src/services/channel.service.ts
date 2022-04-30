import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { Channel } from '../entity/Channel';
import {
  CreateChannelInput,
  UpdateChannelInput,
} from '../inputs/ChannelInputs';
import { ChannelMemberService } from './channel-member.service';
import { UserService } from './user.service';

export class ChannelService {
  private readonly channelRepository: Repository<Channel>;

  private readonly userService: UserService;

  private readonly channelMemberService: ChannelMemberService;

  private readonly getConnection: Connection;

  constructor() {
    this.channelRepository = getRepository(Channel);
    this.userService = new UserService();
    this.channelMemberService = new ChannelMemberService();
    this.getConnection = getConnection();
  }

  public async create(
    createChannelInput: CreateChannelInput,
    userId: number
  ): Promise<Channel> {
    return this.getConnection.transaction(
      'SERIALIZABLE',
      async (transactionEntityManager) => {
        const channel = await transactionEntityManager
          .create(Channel, createChannelInput)
          .save();

        if (!createChannelInput.isPublic && createChannelInput.membersIds) {
          const userIds = [...createChannelInput.membersIds, userId];
          const membersToSave = this.channelMemberService.createMany({
            channelId: channel.id,
            userIds,
            admin: userId,
          });

          await transactionEntityManager.save(membersToSave);
        }

        return channel;
      }
    );
  }

  public async createDM(
    createChannelInput: CreateChannelInput,
    userId: number
  ): Promise<Channel | undefined> {
    return this.getConnection.transaction(
      'SERIALIZABLE',
      async (transactionEntityManager) => {
        if (!createChannelInput.membersIds) return undefined;
        const members = await this.userService.getManyByIds(
          createChannelInput.membersIds
        );

        const name = members.map((m) => m.username).join(', ');

        const channel = await transactionEntityManager
          .create(Channel, { ...createChannelInput, name })
          .save();

        if (!createChannelInput.isPublic && createChannelInput.membersIds) {
          const userIds = [...createChannelInput.membersIds, userId];
          const membersToSave = this.channelMemberService.createMany({
            channelId: channel.id,
            userIds,
            admin: userId,
          });

          await transactionEntityManager.save(membersToSave);
        }

        return channel;
      }
    );
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

  public async getOneDM(
    teamId: number,
    members: number[],
    userId: number
  ): Promise<Channel | undefined> {
    if (!members) return undefined;
    const allMembers = [...members, userId];
    return this.channelRepository
      .createQueryBuilder('c')
      .leftJoin('channel_member', 'cm', 'cm.channel_id = c.id')
      .where('c.is_dm = true and c.is_public = false and c.team_id = :teamId', {
        teamId,
      })
      .groupBy('c.id')
      .having(
        `array_agg(cm.user_id) @> Array[${allMembers.join(
          ','
        )}] and count(cm.user_id) = :count`,
        { count: allMembers.length }
      )
      .getOne();
  }

  public async getMany(teamId: number, userId: number): Promise<Channel[]> {
    return this.channelRepository
      .createQueryBuilder('c')
      .distinct()
      .leftJoin('channel_member', 'cm', 'cm.channel_id = c.id')
      .where(
        'c.team_id = :teamId and (c.is_public = true or cm.user_id = :userId )',
        { teamId, userId }
      )
      .getMany();
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
