// import { ChannelMember } from "src/entity/ChannelMember";
import { getRepository, Repository } from "typeorm";
import { TeamMember } from "../entity/TeamMember";

export class MemberService {
  private readonly teamMemberRepository: Repository<TeamMember>;
  // private readonly channelMemberRepository: Repository<ChannelMember>;
  constructor() {
    this.teamMemberRepository = getRepository(TeamMember);
    // this.channelMemberRepository = getRepository(ChannelMember);
  }

  public getTeamOwner(teamId: number): Promise<TeamMember | undefined> {
    return this.teamMemberRepository.findOne({
      where: { teamId, isAdmin: true },
    });
  }
}
