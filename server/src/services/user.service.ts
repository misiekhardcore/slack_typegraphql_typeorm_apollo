import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInputs";

export class UserService {
  private readonly userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async create(createUserInput: CreateUserInput) {
    return await this.userRepository.create(createUserInput).save();
  }

  public async update(updateUserInput: UpdateUserInput) {
    const { id, ...rest } = updateUserInput;
    this.userRepository.update({ id }, rest);
    return await this.userRepository.findOne(id);
  }

  public async getOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  public async getMany() {
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
