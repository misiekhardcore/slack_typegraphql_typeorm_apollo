import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Channel } from "../entity/Channel";
import { CreateUserResponse, LoginResponse } from "../entity/Outputs";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { Context } from "../index";
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../inputs/UserInputs";
import { isAuth } from "../permissions";
import { UserService } from "../services/user.service";

@Resolver(() => User)
export class UserResolver {
  private readonly userService;
  constructor() {
    this.userService = new UserService();
  }
  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.userService.getMany();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { user }: Context): Promise<User | null> {
    if (!user) return null;
    return (await this.userService.getOneById(user.id)) || null;
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
  async teams(
    @Root() user: User,
    @Ctx() { memberTeamsLoader }: Context
  ): Promise<Team[]> {
    return await memberTeamsLoader.load(user.id);
  }

  @FieldResolver()
  async channels(
    @Root() user: User,
    @Ctx() { userChannelsLoader }: Context
  ): Promise<Channel[]> {
    return await userChannelsLoader.load(user.id);
  }
}
