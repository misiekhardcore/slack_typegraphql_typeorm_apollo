import {
  Arg,
  ArgumentValidationError,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { User } from "../entity/User";
import { Team } from "../entity/Team";
import { Context } from "../index";

@Resolver(() => Team)
export class TeamResolver implements ResolverInterface<Team> {
  @Query(() => [Team], { nullable: true })
  async getTeams() {
    return await Team.find();
  }

  @Query(() => Team, { nullable: true })
  async getTeam(@Arg("teamId") teamId: number) {
    return await Team.findOne(teamId);
  }

  @Mutation(() => Team)
  async createTeam(@Arg("name") name: string, @Ctx() { user }: Context) {
    try {
      const newTeam = Team.create({
        name,
        owner: user,
        members: [user],
      });
      await newTeam.save();
      return newTeam;
    } catch (error) {
      console.log(error);
      throw new ArgumentValidationError(error);
    }
  }

  @FieldResolver()
  async members(@Root() { id }: Team) {
    return (await Team.findOne(id, { relations: ["members"] }))?.members || [];
  }

  @FieldResolver()
  async owner(@Root() { id }: Team) {
    return (
      (await Team.findOne(id, { relations: ["owner"] }))?.owner || new User()
    );
  }
}
