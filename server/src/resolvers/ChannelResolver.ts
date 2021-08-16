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
import { Team } from "../entity/Team";
import { User } from "../entity/User";
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

  @Mutation(() => Channel)
  async createChannel(
    @Arg("channelInput") createChannelInput: CreateChannelInput
  ): Promise<Channel> {
    return await this.channelService.create(createChannelInput);
  }

  @FieldResolver()
  async users(@Root() channel: Channel) {
    const users = await this.channelService.populateMany<User>(
      channel,
      "users"
    );
    return users;
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
