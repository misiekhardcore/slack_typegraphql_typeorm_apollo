import DataLoader from "dataloader";
import { In } from "typeorm";
import { Channel } from "../entity/Channel";
import { ChannelMember } from "../entity/ChannelMember";

const batchChannels = async (userIds: readonly number[]) => {
  const channelUsers = await ChannelMember.find({
    join: {
      alias: "channelMember",
      innerJoinAndSelect: {
        author: "channelMember.channel",
      },
    },
    where: {
      userId: In([...userIds]),
    },
  });

  let userIdToChannel: { [key: number]: Channel[] } = {};

  channelUsers.forEach((cu) => {
    if (cu.userId in userIdToChannel) {
      userIdToChannel[cu.userId].push((cu as any).__channel__);
    } else {
      userIdToChannel[cu.userId] = [(cu as any).__channel__];
    }
  });

  return userIds.map((userId) => userIdToChannel[userId]);
};

export const createUserChannelsLoader = () =>
  new DataLoader(batchChannels);
