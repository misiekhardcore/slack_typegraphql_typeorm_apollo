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
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { Context } from "../index";
import { CreateTeamInput } from "../inputs/TeamInputs";
import { TeamService } from "../services/team.service";

/**
 * Resolver for all Team related operations
 */
@Resolver(() => Team)
export class TeamResolver implements ResolverInterface<Team> {
  private readonly teamService: TeamService;
  constructor() {
    this.teamService = new TeamService();
  }

  /**
   * Get the list of all teams
   * @returns All teams
   */
  @Query(() => [Team], { nullable: true })
  async getTeams() {
    return await this.teamService.getMany();
  }

  @Query(() => Team, { nullable: true })
  async getTeam(@Arg("teamId") teamId: number) {
    return await this.teamService.getOne(teamId);
  }

  @Mutation(() => Team)
  async createTeam(
    @Arg("createTeamInput") createTeamInput: CreateTeamInput,
    @Ctx() { user }: Context
  ) {
    return await this.teamService.create(createTeamInput, user.id);
  }

  @FieldResolver()
  async members(@Root() team: Team) {
    return await this.teamService.populateMany<User>(team, "members");
  }

  @FieldResolver()
  async owner(@Root() team: Team): Promise<User> {
    return (
      (await this.teamService.populateOne<User>(team, "owner")) ||
      new User()
    );
  }
}
