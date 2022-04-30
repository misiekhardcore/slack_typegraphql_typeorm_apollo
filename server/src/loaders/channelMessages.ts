import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Message } from '../entity/Message';

const batchMessages = async (channelIds: readonly number[]) => {
  const messages = await Message.find({
    where: {
      channelId: In([...channelIds]),
    },
  });

  const channelIdToMessgaes: { [key: number]: Message[] } = {};

  messages.forEach((m) => {
    if (m.channelId in channelIdToMessgaes) {
      channelIdToMessgaes[m.channelId].push(m);
    } else {
      channelIdToMessgaes[m.channelId] = [m];
    }
  });

  return channelIds.map((channelId) => channelIdToMessgaes[channelId]);
};

export const createChannelMessagesLoader = () => new DataLoader(batchMessages);
