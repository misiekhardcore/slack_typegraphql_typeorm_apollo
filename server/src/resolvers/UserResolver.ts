import { CreateUserResponse, LoginResponse } from "../entity/Outputs";
import {
  Arg,
  Ctx,
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
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../inputs/UserInputs";
import { UserService } from "../services/user.service";
import { Context } from "../index";

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {
  private readonly userService;
  constructor() {
    this.userService = new UserService();
  }
  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.userService.getMany();
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg("id") id: number): Promise<User | null> {
    return (await this.userService.getOneById(id)) || null;
  }

  @Mutation(() => CreateUserResponse)
  async register(
    @Arg("userInput")
    cerateUserInput: CreateUserInput
  ): Promise<CreateUserResponse> {
    try {
      const user = await this.userService.create(cerateUserInput);
      return { ok: true, user };
    } catch (error) {
      return { ok: false, errors: error };
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("userInput") loginUserInput: LoginUserInput,
    @Ctx() { jwtSecret1, jwtSecret2 }: Context
  ): Promise<LoginResponse> {
    const { email, password } = loginUserInput;
    const user = await this.userService.getOneByEmail(email);
    if (!user)
      return {
        ok: false,
        errors: [{ path: "email", msg: "user not found" }],
      };
    if (!user.validatePassword(password))
      return {
        ok: false,
        errors: [
          { path: "email", msg: "invalid email or password" },
          { path: "password", msg: "" },
        ],
      };

    const refreshTokenSecret = user.password + jwtSecret2;

    const [token, refreshToken] = user.createTokens(
      jwtSecret1,
      refreshTokenSecret
    );
    return {
      ok: true,
      token,
      refreshToken,
    };
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
