import DataLoader from 'dataloader';
import { Channel } from '../entity/Channel';

const batchChannels =
  (userId: number) => async (teamIds: readonly number[]) => {
    const channels = await Channel.createQueryBuilder('c')
      .distinct()
      .leftJoin('channel_member', 'cm', 'cm.channel_id = c.id')
      .where(
        'c.team_id IN (:...teamIds) and (c.is_public = true or cm.user_id = :userId )',
        { teamIds, userId }
      )
      .getMany();

    const teamIdToChannel: { [key: number]: Channel[] } = {};

    channels.forEach((ct) => {
      if (ct.teamId in teamIdToChannel) {
        teamIdToChannel[ct.teamId].push(ct);
      } else {
        teamIdToChannel[ct.teamId] = [ct];
      }
    });
    return teamIds.map((teamId) => teamIdToChannel[teamId]);
  };

export const createTeamChannelsLoader = () => (userId: number) =>
  new DataLoader(batchChannels(userId));
