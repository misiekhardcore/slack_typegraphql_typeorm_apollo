import { User } from "src/entity/User";
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
import { Message } from "../entity/Message";
import { CreateChannelResponse } from "../entity/Outputs";
import { Team } from "../entity/Team";
import { Context } from "../index";
import { CreateChannelInput } from "../inputs/ChannelInputs";
import { isAuth } from "../permissions";
import { ChannelService } from "../services/channel.service";
import { TeamService } from "../services/team.service";

@Resolver(() => Channel)
export class ChannelResolver implements ResolverInterface<Channel> {
  private readonly channelService: ChannelService;
  private readonly teamService: TeamService;
  constructor() {
    this.channelService = new ChannelService();
    this.teamService = new TeamService();
  }

  @Query(() => [Channel], { nullable: true })
  async getChannels() {
    return await this.channelService.getMany();
  }

  @Query(() => Channel, { nullable: true })
  async getChannel(@Arg("channelId") channelId: number) {
    return await this.channelService.getOne(channelId);
  }

  @Mutation(() => CreateChannelResponse)
  @UseMiddleware(isAuth)
  async createChannel(
    @Arg("channelInput") createChannelInput: CreateChannelInput,
    @Ctx() { user }: Context
  ): Promise<CreateChannelResponse> {
    try {
      const team = await this.teamService.getOne(
        createChannelInput.teamId
      );

      if (team?.ownerId !== user?.id)
        return {
          ok: false,
          errors: [
            {
              msg: "You have to be team owner to create channels",
              path: "channelName",
            },
          ],
        };

      const channel = await this.channelService.create(
        createChannelInput
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
      (await this.channelService.populateOne<Team>(channel, "team")) ||
      new Team()
    );
  }

  @FieldResolver()
  async messages(@Root() channel: Channel): Promise<Message[]> {
    return await this.channelService.populateMany<Message>(
      channel,
      "messages"
    );
  }

  @FieldResolver()
  async users(
    @Root() channel: Channel,
    @Ctx() { channelUsersLoader }: Context
  ): Promise<User[]> {
    return await channelUsersLoader.load(channel.id);
  }
}
