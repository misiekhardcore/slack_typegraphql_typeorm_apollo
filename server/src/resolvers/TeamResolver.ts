import { CreateTeamResponse } from "../entity/Outputs";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { Context } from "../index";
import { CreateTeamInput } from "../inputs/TeamInputs";
import { TeamService } from "../services/team.service";
import { isAuth } from "../permissions";
import { Channel } from "../entity/Channel";
import { ChannelService } from "../services/channel.service";

/**
 * Resolver for all Team related operations
 */
@Resolver(() => Team)
export class TeamResolver implements ResolverInterface<Team> {
  private readonly teamService: TeamService;
  private readonly channelService: ChannelService;
  constructor() {
    this.teamService = new TeamService();
    this.channelService = new ChannelService();
  }

  /**
   * Get the list of all teams
   * @type query
   * @returns {Promise<Team[]>} all teams
   */
  @Query(() => [Team])
  // @UseMiddleware(isAuth)
  async getTeams(@Ctx() { user }: Context): Promise<Team[]> {
    if (user) return await this.teamService.getMany(user.id);
    return [];
  }

  @Query(() => Team, { nullable: true })
  @UseMiddleware(isAuth)
  async getTeam(
    @Ctx() { user }: Context,
    @Arg("teamId") teamId: number
  ) {
    if (user) return await this.teamService.getOne(user.id, teamId);
    return null;
  }

  @Mutation(() => CreateTeamResponse)
  @UseMiddleware(isAuth)
  async createTeam(
    @Arg("createTeamInput") createTeamInput: CreateTeamInput,
    @Ctx() { user }: Context
  ): Promise<CreateTeamResponse> {
    try {
      if (!user)
        return {
          ok: false,
          errors: [{ path: "user", msg: "" }],
        };
      const team = await this.teamService.create(
        createTeamInput,
        user.id
      );

      if (!team)
        return {
          ok: false,
          errors: [{ path: "team", msg: "" }],
        };

      this.channelService.create({
        name: "general",
        teamId: team.id,
        isPublic: true,
      });

      return {
        ok: true,
        team,
      };
    } catch (error) {
      return {
        ok: false,
        errors: error,
      };
    }
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

  @FieldResolver()
  async channels(@Root() team: Team) {
    return await this.teamService.populateMany<Channel>(
      team,
      "channels"
    );
  }
}
