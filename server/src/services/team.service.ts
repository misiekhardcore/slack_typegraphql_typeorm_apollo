import { getRepository, Repository } from "typeorm";
import { Team } from "../entity/Team";
import { CreateTeamInput, UpdateTeamInput } from "../inputs/TeamInputs";

export class TeamService {
  private readonly teamRepository: Repository<Team>;
  constructor() {
    this.teamRepository = getRepository(Team);
  }

  public async create(
    createTeamInput: CreateTeamInput,
    ownerId: number
  ) {
    return await this.teamRepository
      .create({ ...createTeamInput, ownerId })
      .save();
  }

  public async update(updateTeamInput: UpdateTeamInput) {
    const { id, ...rest } = updateTeamInput;
    this.teamRepository.update({ id }, rest);
    return await this.teamRepository.findOne(id);
  }

  public async getOne(id: number) {
    return await this.teamRepository.findOne(id);
  }

  public async getMany() {
    return await this.teamRepository.find();
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
