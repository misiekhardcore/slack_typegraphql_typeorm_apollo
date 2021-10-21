import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { getRepository } from "typeorm";
import { Channel } from "./entity/Channel";
import { TeamMember } from "./entity/TeamMember";
import { Context } from "./index";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.user) {
    throw new AuthenticationError("not authenticated");
  }
  return next();
};

export const isTeamMember: MiddlewareFn<Context> = async (
  { context, args: { channelId } },
  next
) => {
  if (!context.user) {
    throw new AuthenticationError("not authenticated");
  }

  const channel = await getRepository(Channel).findOne(channelId);

  if (!channel) throw new AuthenticationError("not authenticated");

  const member = await getRepository(TeamMember).findOne({
    where: { teamId: channel.teamId, userId: context.user.id },
  });

  if (!member) throw new AuthenticationError("not authenticated");

  return next();
};
