import { findIndex } from "lodash";
import React from "react";
import { Redirect } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { SendMessage } from "../components/SendMessage";
import { MessagesContainer } from "../containers/MessagesContainer";
import { Sidebar } from "../containers/Sidebar";
import { Team, useGetTeamsQuery } from "../generated/graphql";

interface ViewTeamProps {
  match: { params: { teamId: string; channelId: string } };
}

const ViewTeam: React.FC<ViewTeamProps> = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const { loading, error, data } = useGetTeamsQuery();

  const { getTeams } = data || {};

  const teamIdInt = parseInt(teamId);

  if (teamId && !teamIdInt) {
    console.error("invalid teamid!");
    return <Redirect to="/view-team" />;
  }

  const channelIdInt = parseInt(channelId);

  if (channelId && !channelIdInt) {
    console.error("invalid channelid!");
    return <Redirect to="/view-team" />;
  }

  if (!(loading || getTeams)) {
    console.error("no teams!");
    return <Redirect to="/create-team" />;
  }

  if (!getTeams) return null;

  const teamIdx = teamId ? findIndex(getTeams, ["id", teamIdInt]) : 0;
  const team = getTeams[teamIdx];

  if (!team) {
    console.error("no team with that id!");
    return <Redirect to="/create-team" />;
  }

  const channelIdx = channelId
    ? findIndex(team.channels, ["id", channelIdInt])
    : 0;
  const channel = team?.channels[channelIdx] || {};

  if (loading || error) return null;

  return (
    <AppLayout>
      <Sidebar
        teams={getTeams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team as Team}
      />
      {channel && (
        <>
          <Header channelName={channel.name} />
          <MessagesContainer channelId={channel.id} />
          <SendMessage
            channelName={channel.name}
            channelId={channel.id}
          />
        </>
      )}
    </AppLayout>
  );
};

export default ViewTeam;
