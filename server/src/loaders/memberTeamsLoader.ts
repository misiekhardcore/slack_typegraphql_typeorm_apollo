import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Team } from 'src/entity/Team';
import { TeamMember } from '../entity/TeamMember';

const batchTeams = async (userIds: readonly number[]) => {
  const teamMembers = await TeamMember.find({
    join: {
      alias: 'teamMember',
      innerJoinAndSelect: {
        team: 'teamMember.team',
      },
    },
    where: {
      userId: In([...userIds]),
    },
  });

  const userIdToTeam: { [key: number]: Team[] } = {};

  teamMembers.forEach((tm) => {
    if (tm.userId in userIdToTeam) {
      userIdToTeam[tm.userId].push({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(tm as any).team,
        admin: tm.admin,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userIdToTeam[tm.userId] = [{ ...(tm as any).team, admin: tm.admin }];
    }
  });

  return userIds.map((teamId) => userIdToTeam[teamId]);
};

export const createMemberTeamsLoader = () => new DataLoader(batchTeams);
