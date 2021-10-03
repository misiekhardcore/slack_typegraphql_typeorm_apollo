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
import { Message } from "../entity/Message";
import { CreateChannelResponse } from "../entity/Outputs";
import { Team } from "../entity/Team";
import { CreateChannelInput } from "../inputs/ChannelInputs";
import { ChannelService } from "../services/channel.service";

@Resolver(() => Channel)
export class ChannelResolver implements ResolverInterface<Channel> {
  private readonly channelService: ChannelService;
  constructor() {
    this.channelService = new ChannelService();
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
  async createChannel(
    @Arg("channelInput") createChannelInput: CreateChannelInput
  ): Promise<CreateChannelResponse> {
    try {
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
  async team(@Root() channel: Channel) {
    return (
      (await this.channelService.populateOne<Team>(channel, "team")) ||
      new Team()
    );
  }

  @FieldResolver()
  async messages(@Root() channel: Channel) {
    return await this.channelService.populateMany<Message>(
      channel,
      "messages"
    );
  }
}
