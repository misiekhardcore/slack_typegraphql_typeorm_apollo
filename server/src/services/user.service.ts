import { getRepository, In, Repository } from 'typeorm';
import { TeamMember } from '../entity/TeamMember';
import { User } from '../entity/User';
import { CreateUserInput, UpdateUserInput } from '../inputs/UserInputs';

export class UserService {
  private readonly userRepository: Repository<User>;

  private readonly teamMemberRepository: Repository<TeamMember>;

  constructor() {
    this.userRepository = getRepository(User);
    this.teamMemberRepository = getRepository(TeamMember);
  }

  public async create(createUserInput: CreateUserInput): Promise<User> {
    return this.userRepository.create(createUserInput).save();
  }

  public async update(
    updateUserInput: UpdateUserInput
  ): Promise<User | undefined> {
    const { id, ...rest } = updateUserInput;
    this.userRepository.update({ id }, rest);
    return this.userRepository.findOne(id);
  }

  public async getOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  public async getOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  public async getMany(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getManyByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.find({ where: { id: In(ids) } });
  }

  public async getMember(
    teamId: number,
    userId: number
  ): Promise<TeamMember | undefined> {
    return this.teamMemberRepository.findOne({
      where: { teamId, userId },
    });
  }

  public async populateMany<T>(user: User, field: string): Promise<T[]> {
    return this.userRepository
      .createQueryBuilder()
      .relation(User, field)
      .of(user)
      .loadMany<T>();
  }

  public async populateOne<T>(
    user: User,
    field: string
  ): Promise<T | undefined> {
    return this.userRepository
      .createQueryBuilder()
      .relation(User, field)
      .of(user)
      .loadOne<T>();
  }
}
