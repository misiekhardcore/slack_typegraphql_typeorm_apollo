import DataLoader from "dataloader";
import { In } from "typeorm";
import { TeamMember } from "../entity/TeamMember";
import { Team } from "src/entity/Team";

const batchTeams = async (userIds: readonly number[]) => {
  const teamMembers = await TeamMember.find({
    join: {
      alias: "teamMember",
      innerJoinAndSelect: {
        author: "teamMember.team",
      },
    },
    where: {
      userId: In([...userIds]),
    },
  });

  let userIdToTeam: { [key: number]: Team[] } = {};

  teamMembers.forEach((tm) => {
    if (tm.userId in userIdToTeam) {
      userIdToTeam[tm.userId].push((tm as any).__team__);
    } else {
      userIdToTeam[tm.userId] = [(tm as any).__team__];
    }
  });

  return userIds.map((teamId) => userIdToTeam[teamId]);
};

export const createMemberTeamsLoader = () => new DataLoader(batchTeams);
