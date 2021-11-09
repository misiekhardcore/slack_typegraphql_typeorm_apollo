import { getRepository, Repository } from 'typeorm';
import { ChannelMember } from '../entity/ChannelMember';

interface CreateChannelMemberInput {
  channelId: number;
  userId: number;
  admin?: boolean;
}

interface CreateChannelMembersInput {
  channelId: number;
  userIds: number[];
  admin: number;
}

export class ChannelMemberService {
  private readonly channelMemberRepository: Repository<ChannelMember>;

  constructor() {
    this.channelMemberRepository = getRepository(ChannelMember);
  }

  public create(input: CreateChannelMemberInput): ChannelMember {
    return this.channelMemberRepository.create(input);
  }

  public createMany({
    channelId,
    userIds,
    admin,
  }: CreateChannelMembersInput): ChannelMember[] {
    const members: ChannelMember[] = [];
    userIds.forEach((member) =>
      members.push(
        this.create({
          channelId,
          userId: member,
          admin: member === admin,
        })
      )
    );
    return members;
  }

  public async getOne(
    userId: number,
    channelId: number
  ): Promise<ChannelMember | undefined> {
    return this.channelMemberRepository.findOne({
      where: { channelId, userId },
    });
  }

  public async getOneById(
    channelId: number
  ): Promise<ChannelMember | undefined> {
    return this.channelMemberRepository.findOne({
      where: { channelId },
    });
  }

  public async getOwner(teamId: number): Promise<ChannelMember | undefined> {
    return this.channelMemberRepository.findOne({
      where: { teamId, isAdmin: true },
    });
  }
}
