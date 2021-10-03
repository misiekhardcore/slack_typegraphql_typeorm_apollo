import DataLoader from "dataloader";
import { User } from "../entity/User";
import { In } from "typeorm";
import { ChannelMember } from "../entity/ChannelMember";

const batchUsers = async (channelIds: readonly number[]) => {
  const userChannels = await ChannelMember.find({
    join: {
      alias: "channelMember",
      innerJoinAndSelect: {
        author: "channelMember.user",
      },
    },
    where: {
      channelId: In([...channelIds]),
    },
  });

  let channelIdToUser: { [key: number]: User[] } = {};

  userChannels.forEach((uc) => {
    if (uc.channelId in channelIdToUser) {
      channelIdToUser[uc.channelId].push((uc as any).__user__);
    } else {
      channelIdToUser[uc.channelId] = [(uc as any).__user__];
    }
  });

  return channelIds.map((channelId) => channelIdToUser[channelId]);
};

export const createChannelUsersLoader = () =>
  new DataLoader(batchUsers);
