import DataLoader from "dataloader";
import { User } from "../entity/User";
import { In } from "typeorm";
import { TeamMember } from "../entity/TeamMember";

const batchMembers = async (teamIds: readonly number[]) => {
  const memberTeams = await TeamMember.find({
    join: {
      alias: "teamMember",
      innerJoinAndSelect: {
        user: "teamMember.user",
      },
    },
    where: {
      teamId: In([...teamIds]),
    },
  });

  let teamIdToMember: { [key: number]: User[] } = {};

  memberTeams.forEach((mt) => {
    if (mt.teamId in teamIdToMember) {
      teamIdToMember[mt.teamId].push((mt as any).user);
    } else {
      teamIdToMember[mt.teamId] = [(mt as any).user];
    }
  });

  return teamIds.map((teamId) => teamIdToMember[teamId]);
};

export const createTeamMembersLoader = () =>
  new DataLoader(batchMembers);
