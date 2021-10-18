// import { ChannelMember } from "src/entity/ChannelMember";
import { getRepository, Repository } from "typeorm";
import { TeamMember } from "../entity/TeamMember";

interface CreateTeamMemberInput {
  teamId: number;
  userId: number;
  admin?: boolean;
}

export class TeamMemberService {
  private readonly teamMemberRepository: Repository<TeamMember>;
  // private readonly channelMemberRepository: Repository<ChannelMember>;
  constructor() {
    this.teamMemberRepository = getRepository(TeamMember);
    // this.channelMemberRepository = getRepository(ChannelMember);
  }

  public async create(input: CreateTeamMemberInput) {
    this.teamMemberRepository.create(input).save();
  }

  public async getOwner(
    teamId: number
  ): Promise<TeamMember | undefined> {
    return this.teamMemberRepository.findOne({
      where: { teamId, isAdmin: true },
    });
  }
}
