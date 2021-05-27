import { UserInputError } from "apollo-server-errors";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entity/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInputs";

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {
  @Query(() => [User], { nullable: true })
  async getUsers() {
    return await User.find({});
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg("id") id: number) {
    return await User.findOne(id);
  }

  @Mutation(() => User)
  async register(
    @Arg("userInput")
    { password, ...restArgs }: CreateUserInput
  ) {
    try {
      const hashPassword = await argon2.hash(password);
      const user = User.create({ password: hashPassword, ...restArgs });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("userInput", { nullable: false }) userInput: UpdateUserInput
  ) {
    const user = await User.findOne({ id });
    if (!user) throw new UserInputError("User not found");
    Object.assign(user, userInput);
    await user.save();
    return user;
  }

  @FieldResolver()
  async teams(@Root() { id }: User) {
    return (await User.findOne(id, { relations: ["teams"] }))?.teams || [];
  }

  @FieldResolver()
  async channels(@Root() { id }: User) {
    return (await User.findOne(id, { relations: ["teams"] }))?.channels || [];
  }
}
