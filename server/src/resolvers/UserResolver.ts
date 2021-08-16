import argon2 from "argon2";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { Channel } from "../entity/Channel";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInputs";
import { UserService } from "../services/user.service";

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {
  private readonly userService;
  constructor() {
    this.userService = new UserService();
  }
  @Query(() => [User], { nullable: true })
  async getUsers() {
    return await this.userService.getMany();
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg("id") id: number) {
    return await this.userService.getOne(id);
  }

  @Mutation(() => User)
  async register(
    @Arg("userInput")
    { password, ...restArgs }: CreateUserInput
  ) {
    try {
      const hashPassword = await argon2.hash(password);
      return await this.userService.create({
        ...restArgs,
        password: hashPassword,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("userInput", { nullable: false }) userInput: UpdateUserInput
  ) {
    return await this.userService.update(userInput);
  }

  @FieldResolver()
  async teams(@Root() user: User) {
    return await this.userService.populateMany<Team>(user, "teams");
  }

  @FieldResolver()
  async channels(@Root() user: User) {
    return await this.userService.populateMany<Channel>(
      user,
      "channels"
    );
  }
}
