import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { User } from '../entity/User';
import { TeamMember } from '../entity/TeamMember';

const batchMembers = async (teamIds: readonly number[]) => {
  const memberTeams = await TeamMember.find({
    join: {
      alias: 'teamMember',
      innerJoinAndSelect: {
        user: 'teamMember.user',
      },
    },
    where: {
      teamId: In([...teamIds]),
    },
  });

  const teamIdToMember: { [key: number]: User[] } = {};

  memberTeams.forEach((mt) => {
    if (mt.teamId in teamIdToMember) {
      teamIdToMember[mt.teamId].push(mt.user);
    } else {
      teamIdToMember[mt.teamId] = [mt.user];
    }
  });

  return teamIds.map((teamId) => teamIdToMember[teamId]);
};

export const createTeamMembersLoader = () => new DataLoader(batchMembers);
