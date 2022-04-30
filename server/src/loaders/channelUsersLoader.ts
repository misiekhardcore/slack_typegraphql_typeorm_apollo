import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { User } from '../entity/User';
import { ChannelMember } from '../entity/ChannelMember';

const batchUsers = async (channelIds: readonly number[]) => {
  const userChannels = await ChannelMember.find({
    join: {
      alias: 'channelMember',
      innerJoinAndSelect: {
        user: 'channelMember.user',
      },
    },
    where: {
      channelId: In([...channelIds]),
    },
  });

  const channelIdToUser: { [key: number]: User[] } = {};

  userChannels.forEach((uc) => {
    if (uc.channelId in channelIdToUser) {
      channelIdToUser[uc.channelId].push(uc.user);
    } else {
      channelIdToUser[uc.channelId] = [uc.user];
    }
  });

  return channelIds.map((channelId) => channelIdToUser[channelId]);
};

export const createChannelUsersLoader = () => new DataLoader(batchUsers);
