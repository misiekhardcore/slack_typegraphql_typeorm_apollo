import {
  getRepository,
  Repository,
  getConnection,
  Connection,
} from "typeorm";
import { Channel } from "../entity/Channel";
import { Team } from "../entity/Team";
import { CreateTeamInput, UpdateTeamInput } from "../inputs/TeamInputs";

export class TeamService {
  private readonly teamRepository: Repository<Team>;
  private readonly getConnection: Connection;
  constructor() {
    this.teamRepository = getRepository(Team);
    this.getConnection = getConnection();
  }

  public async create(
    createTeamInput: CreateTeamInput,
    ownerId: number
  ): Promise<Team> {
    return await this.getConnection.transaction(
      "SERIALIZABLE",
      async (transactionEntityManager) => {
        const team = await transactionEntityManager
          .create(Team, {
            ...createTeamInput,
            ownerId,
          })
          .save();
        await transactionEntityManager
          .create(Channel, {
            name: "general",
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
    return await this.teamRepository.findOne(id);
  }

  public async getOne(teamId: number) {
    return await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ["members"],
    });
  }

  public async getMany(ownerId: number) {
    return await this.teamRepository.find({ where: { ownerId } });
  }

  public async populateMany<T>(
    team: Team,
    field: string
  ): Promise<T[]> {
    return await this.teamRepository
      .createQueryBuilder()
      .relation(Team, field)
      .of(team)
      .loadMany<T>();
  }

  public async populateOne<T>(
    team: Team,
    field: string
  ): Promise<T | undefined> {
    return await this.teamRepository
      .createQueryBuilder()
      .relation(Team, field)
      .of(team)
      .loadOne<T>();
  }
}
