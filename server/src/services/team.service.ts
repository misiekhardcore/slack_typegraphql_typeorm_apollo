import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { Channel } from '../entity/Channel';
import { Team } from '../entity/Team';
import { TeamMember } from '../entity/TeamMember';
import { User } from '../entity/User';
import { CreateTeamInput, UpdateTeamInput } from '../inputs/TeamInputs';

export class TeamService {
  private readonly teamRepository: Repository<Team>;

  private readonly getConnection: Connection;

  constructor() {
    this.teamRepository = getRepository(Team);
    this.getConnection = getConnection();
  }

  public async create(createTeamInput: CreateTeamInput): Promise<Team> {
    return this.getConnection.transaction(
      'SERIALIZABLE',
      async (transactionEntityManager) => {
        const team = await transactionEntityManager
          .create(Team, createTeamInput)
          .save();
        await transactionEntityManager
          .create(Channel, {
            name: 'general',
            teamId: team.id,
            isPublic: true,
          })
          .save();
        return team;
      }
    );
  }

  public async update(updateTeamInput: UpdateTeamInput) {
    const { id, ...rest } = updateTeamInput;
    this.teamRepository.update({ id }, rest);
    return this.teamRepository.findOne(id);
  }

  public async getOne(teamId: number) {
    return this.teamRepository.findOne({
      where: { id: teamId },
    });
  }

  /**
   *
   * @param userId
   * @returns all teams owned by user or where user is member
   */
  public async getMany(userId: number) {
    // SELECT * FROM teams LEFT JOIN team_member  ON team_member.team_id=teams.id LEFT JOIN users ON users.id=team_member.user_id WHERE users.id = $1
    return this.teamRepository
      .createQueryBuilder('teams')
      .leftJoinAndSelect(
        TeamMember,
        'team_member',
        'team_member.team_id=teams.id'
      )
      .leftJoinAndSelect(User, 'users', 'users.id=team_member.user_id')
      .where('users.id = :userId', {
        userId,
      })
      .getMany();
  }

  public async populateMany<T>(team: Team, field: string): Promise<T[]> {
    return this.teamRepository
      .createQueryBuilder()
      .relation(Team, field)
      .of(team)
      .loadMany<T>();
  }

  public async populateOne<T>(
    team: Team,
    field: string
  ): Promise<T | undefined> {
    return this.teamRepository
      .createQueryBuilder()
      .relation(Team, field)
      .of(team)
      .loadOne<T>();
  }
}
