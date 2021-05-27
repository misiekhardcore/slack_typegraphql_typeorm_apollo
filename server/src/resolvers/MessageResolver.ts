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
import { Message } from "../entity/Message";
import { Channel } from "../entity/Channel";
import { Context } from "../index";
import { User } from "../entity/User";

@Resolver(() => Message)
export class MessageResolver implements ResolverInterface<Message> {
  @Query(() => [Message])
  async getMessages() {
    return await Message.find({});
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("channelId") channelId: number,
    @Arg("text") text: string,
    @Ctx() { user }: Context
  ): Promise<Message> {
    const message = Message.create<Message>({
      channel: { id: channelId },
      text,
      user,
    });
    await message.save();
    return message;
  }

  @FieldResolver()
  async channel(@Root() { id }: Message) {
    return (
      (await Message.findOne(id, { relations: ["channel"] }))?.channel ||
      new Channel()
    );
  }

  @FieldResolver()
  async user(@Root() { id }: Message) {
    return (
      (await Message.findOne(id, { relations: ["user"] }))?.user || new User()
    );
  }
}
