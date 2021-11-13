import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { TeamMember } from '../entity/TeamMember';

interface CreateTeamMemberInput {
  teamId: number;
  userId: number;
  admin?: boolean;
}

export class TeamMemberService {
  private readonly teamMemberRepository: Repository<TeamMember>;

  constructor() {
    this.teamMemberRepository = getRepository(TeamMember);
  }

  /**
   * Creates new team member
   * @param {CreateTeamMemberInput} input
   * @returns {TeamMember} team member
   */
  public async create(input: CreateTeamMemberInput): Promise<TeamMember> {
    return this.teamMemberRepository.create(input).save();
  }

  /**
   * Finds one team member
   * @param {number} userId id of the user
   * @param {number} teamId id of the team
   * @returns {TeamMember | undefined} team member
   */
  public async getOne(
    userId: number,
    teamId: number
  ): Promise<TeamMember | undefined> {
    return this.teamMemberRepository.findOne({
      where: { userId, teamId },
    });
  }

  /**
   * Finds the owner of given team
   * @param {number} teamId id of the team
   * @returns {TeamMember | undefined} team member/owner
   */
  public async getOwner(teamId: number): Promise<User | undefined> {
    return (
      await this.teamMemberRepository.findOne({
        join: {
          alias: 'teamMember',
          innerJoinAndSelect: {
            user: 'teamMember.user',
          },
        },
        where: { teamId, admin: true },
      })
    )?.user;
  }
}
