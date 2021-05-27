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
import { Channel } from "../entity/Channel";
import { Team } from "../entity/Team";
import { Context } from "../index";

@Resolver(() => Channel)
export class ChannelResolver implements ResolverInterface<Channel> {
  @Query(() => [Channel], { nullable: true })
  async getChannels() {
    return await Channel.find({});
  }

  @Query(() => Channel, { nullable: true })
  async getChannel(@Arg("channelId") channelId: number) {
    return await Channel.findOne(channelId);
  }

  @Mutation(() => Channel)
  async createChannel(
    @Arg("teamId") teamId: number,
    @Arg("name") name: string,
    @Arg("public", { defaultValue: false }) isPublic: boolean,
    @Ctx() { user }: Context
  ): Promise<Channel> {
    const channel = Channel.create({
      public: isPublic,
      team: { id: teamId },
      name,
      users: [user],
    });
    await channel.save();
    return channel;
  }

  @FieldResolver()
  async users(@Root() { id }: Channel) {
    return (await Channel.findOne(id, { relations: ["users"] }))?.users || [];
  }

  @FieldResolver()
  async team(@Root() { id }: Channel) {
    return (
      (await Channel.findOne(id, { relations: ["team"] }))?.team || new Team()
    );
  }

  @FieldResolver()
  async messages(@Root() { id }: Channel) {
    return (
      (await Channel.findOne(id, { relations: ["messages"] }))?.messages || null
    );
  }
}
