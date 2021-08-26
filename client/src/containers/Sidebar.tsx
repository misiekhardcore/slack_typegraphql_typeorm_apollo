import _ from "lodash";
import React from "react";
import decode from "jwt-decode";
import { Channels } from "../components/Channels";
import { Teams } from "../components/Teams";
import { useGetTeamsQuery } from "../generated/graphql";
import { JWTTokenPayload } from "../types";

interface SidebarProps {
  currentTeamId: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTeamId }) => {
  const { loading, error, data } = useGetTeamsQuery();
  const teams = data?.getTeams;
  if (!teams) return null;
  const teamIdx = _.findIndex(teams, ["id", currentTeamId]);
  const team = teams[teamIdx];
  const channels = team.channels;

  let username = "";
  try {
    const token = localStorage.getItem("token") || "";
    const { user } = decode(token) as JWTTokenPayload;
    username = user.username;
  } catch (error) {}

  return loading || error ? null : (
    <>
      <Teams
        key="team-sidebar"
        teams={teams.map((team) => ({
          ...team,
          id: Number(team.id),
          letter: team.name.slice(0, 1).toUpperCase(),
        }))}
      />
      <Channels
        key="channel-sidebar"
        teamName={team.name}
        userName={username}
        channels={channels}
        users={[
          { id: 1, name: "user1" },
          { id: 2, name: "user2" },
        ]}
      />
    </>
  );
};
