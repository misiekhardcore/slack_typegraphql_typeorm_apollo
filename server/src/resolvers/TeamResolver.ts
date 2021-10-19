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
import { Channel } from "../entity/Channel";
import {
  AddMemberResponse,
  CreateTeamResponse,
} from "../entity/Outputs";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { Context } from "../index";
import { AddMemberInput, CreateTeamInput } from "../inputs/TeamInputs";
import { isAuth } from "../permissions";
import { TeamMemberService } from "../services/team-member.service";
import { TeamService } from "../services/team.service";
import { UserService } from "../services/user.service";

/**
 * Resolver for all Team related operations
 */
@Resolver(() => Team)
export class TeamResolver implements ResolverInterface<Team> {
  private readonly teamService: TeamService;
  private readonly userService: UserService;
  private readonly teamMemberService: TeamMemberService;
  constructor() {
    this.teamService = new TeamService();
    this.userService = new UserService();
    this.teamMemberService = new TeamMemberService();
  }

  /**
   * Get the list of all teams
   * @type query
   * @returns all teams
   */
  @Query(() => [Team])
  @UseMiddleware(isAuth)
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
    if (user) {
      const team = await this.teamService.getOne(teamId);
      const member = await this.teamMemberService.getOne(
        user.id,
        teamId
      );
      if (member?.admin) return team;
    }
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

      const team = await this.teamService.create(createTeamInput);

      await this.teamMemberService.create({
        teamId: team.id,
        userId: user.id,
        admin: true,
      });

      if (!team)
        return {
          ok: false,
          errors: [{ path: "team", msg: "" }],
        };

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

  @Mutation(() => AddMemberResponse)
  @UseMiddleware(isAuth)
  async addMember(
    @Arg("addMemberInput") { email, teamId }: AddMemberInput,
    @Ctx() { user }: Context
  ): Promise<AddMemberResponse> {
    try {
      if (!user)
        return {
          ok: false,
          errors: [{ path: "user", msg: "You must be logged in" }],
        };

      const memberPromise = this.teamMemberService.getOne(
        user.id,
        teamId
      );
      const teamPromise = this.teamService.getOne(teamId);
      const userToAddPromise = this.userService.getOneByEmail(email);
      const [member, team, userToAdd] = await Promise.all([
        memberPromise,
        teamPromise,
        userToAddPromise,
      ]);

      if (!member?.admin) {
        return {
          ok: false,
          errors: [
            {
              msg: "You cannot add members to the team",
              path: "email",
            },
          ],
        };
      }

      if (!userToAdd) {
        return {
          ok: false,
          errors: [
            {
              msg: "Could not find user with this email",
              path: "email",
            },
          ],
        };
      }
      await this.teamMemberService.create({
        teamId: team!.id,
        userId: userToAdd.id,
      });

      return {
        ok: true,
        member: userToAdd,
      };
    } catch (error) {
      return {
        ok: false,
        errors: error,
      };
    }
  }

  @FieldResolver()
  async members(
    @Root() team: Team,
    @Ctx() { teamMembersLoader }: Context
  ): Promise<User[]> {
    return (await teamMembersLoader.load(team.id)) || [];
  }

  @FieldResolver()
  async channels(@Root() team: Team) {
    return await this.teamService.populateMany<Channel>(
      team,
      "channels"
    );
  }
}
