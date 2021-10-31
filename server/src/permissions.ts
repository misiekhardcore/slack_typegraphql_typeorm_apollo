import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { getRepository } from "typeorm";
import { Channel } from "./entity/Channel";
import { TeamMember } from "./entity/TeamMember";
import { Context } from "./index";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.user?.id) {
    throw new AuthenticationError("not authenticated");
  }
  return next();
};

export const isTeamMember: MiddlewareFn<Context> = async (
  { context: { user }, args: { channelId } },
  next
) => {
  if (!user?.id) {
    throw new AuthenticationError("not authenticated");
  }

  const channel = await getRepository(Channel).findOne(channelId);

  if (!channel) throw new AuthenticationError("not authenticated");

  const member = await getRepository(TeamMember).findOne({
    where: { teamId: channel.teamId, userId: user.id },
  });

  if (!member) throw new AuthenticationError("not authenticated");

  return next();
};

export const isAbleToDirectMessage: MiddlewareFn<Context> = async (
  { context: { user }, args: { userToId, teamId } },
  next
) => {
  if (!user?.id) {
    throw new AuthenticationError("not authenticated");
  }

  const members = await getRepository(TeamMember).find({
    where: [
      { teamId, userId: user.id },
      { teamId, userId: userToId },
    ],
  });

  if (members.length !== 2)
    throw new AuthenticationError("not authenticated");

  return next();
};
