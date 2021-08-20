import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInputs";

export class UserService {
  private readonly userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.create(createUserInput).save();
  }

  public async update(
    updateUserInput: UpdateUserInput
  ): Promise<User | undefined> {
    const { id, ...rest } = updateUserInput;
    this.userRepository.update({ id }, rest);
    return await this.userRepository.findOne(id);
  }

  public async getOneById(id: number) {
    return await this.userRepository.findOne(id);
  }

  public async getOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email });
  }

  public async getMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async populateMany<T>(
    user: User,
    field: string
  ): Promise<T[]> {
    return await this.userRepository
      .createQueryBuilder()
      .relation(User, field)
      .of(user)
      .loadMany<T>();
  }

  public async populateOne<T>(
    user: User,
    field: string
  ): Promise<T | undefined> {
    return await this.userRepository
      .createQueryBuilder()
      .relation(User, field)
      .of(user)
      .loadOne<T>();
  }
}