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
} from 'type-graphql';
import { Channel } from '../entity/Channel';
import { Message } from '../entity/Message';
import { CreateChannelResponse } from '../entity/Outputs';
import { Team } from '../entity/Team';
import { User } from '../entity/User';
import { Context } from '../index';
import { CreateChannelInput } from '../inputs/ChannelInputs';
import { isAuth } from '../permissions';
import { ChannelService } from '../services/channel.service';
import { TeamMemberService } from '../services/team-member.service';
import { TeamService } from '../services/team.service';

@Resolver(() => Channel)
export class ChannelResolver implements ResolverInterface<Channel> {
  private readonly channelService: ChannelService;

  private readonly teamService: TeamService;

  private readonly teamMemberService: TeamMemberService;

  constructor() {
    this.channelService = new ChannelService();
    this.teamService = new TeamService();
    this.teamMemberService = new TeamMemberService();
  }

  @Query(() => [Channel], { nullable: true })
  async getChannels(@Arg('teamId') teamId: number, @Ctx() { user }: Context) {
    if (!user) return null;
    return this.channelService.getMany(teamId, user.id);
  }

  @Query(() => Channel, { nullable: true })
  async getChannel(@Arg('channelId') channelId: number) {
    return this.channelService.getOne(channelId);
  }

  @Mutation(() => CreateChannelResponse)
  @UseMiddleware(isAuth)
  async createChannel(
    @Arg('channelInput') createChannelInput: CreateChannelInput,
    @Ctx() { user }: Context
  ): Promise<CreateChannelResponse> {
    try {
      const team = await this.teamService.getOne(createChannelInput.teamId);

      if (!user)
        return {
          ok: false,
          errors: [{ path: 'user', msg: '' }],
        };

      if (!team)
        return {
          ok: false,
          errors: [{ msg: 'Team not found', path: 'team' }],
        };

      const member = await this.teamMemberService.getOne(user.id, team.id);

      if (!member?.admin)
        return {
          ok: false,
          errors: [
            {
              msg: 'You have to be team owner to create channels',
              path: 'channelName',
            },
          ],
        };

      const channel = await this.channelService.create(
        createChannelInput,
        user.id
      );

      return { ok: true, channel };
    } catch (error) {
      return {
        ok: false,
        errors: error,
      };
    }
  }

  @FieldResolver()
  async team(@Root() channel: Channel): Promise<Team> {
    return (
      (await this.channelService.populateOne<Team>(channel, 'team')) ||
      new Team()
    );
  }

  @FieldResolver()
  async messages(@Root() channel: Channel): Promise<Message[]> {
    return this.channelService.populateMany<Message>(channel, 'messages');
  }

  @FieldResolver()
  async members(
    @Root() channel: Channel,
    @Ctx() { channelUsersLoader }: Context
  ): Promise<User[]> {
    return channelUsersLoader.load(channel.id);
  }
}
