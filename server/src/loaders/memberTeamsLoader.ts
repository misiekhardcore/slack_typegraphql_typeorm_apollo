import DataLoader from "dataloader";
import { In } from "typeorm";
import { TeamMember } from "../entity/TeamMember";
import { Team } from "src/entity/Team";

const batchTeams = async (userIds: readonly number[]) => {
  const teamMembers = await TeamMember.find({
    join: {
      alias: "teamMember",
      innerJoinAndSelect: {
        team: "teamMember.team",
      },
    },
    where: {
      userId: In([...userIds]),
    },
  });

  let userIdToTeam: { [key: number]: Team[] } = {};

  teamMembers.forEach((tm) => {
    if (tm.userId in userIdToTeam) {
      userIdToTeam[tm.userId].push({
        ...(tm as any).team,
        admin: tm.admin,
      });
    } else {
      userIdToTeam[tm.userId] = [
        { ...(tm as any).team, admin: tm.admin },
      ];
    }
  });

  return userIds.map((teamId) => userIdToTeam[teamId]);
};

export const createMemberTeamsLoader = () => new DataLoader(batchTeams);
