import { findIndex } from "lodash";
import React from "react";
import { Redirect } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { SendMessage } from "../components/SendMessage";
import { MessagesContainer } from "../containers/MessagesContainer";
import { Sidebar } from "../containers/Sidebar";
import { Team, useMeQuery } from "../generated/graphql";

interface ViewTeamProps {
  match: { params: { teamId: string; channelId: string } };
}

const ViewTeam: React.FC<ViewTeamProps> = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const { loading, error, data } = useMeQuery();

  const { me } = data || {};
  const { teams } = me || {};

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

  if (!(loading || teams)) {
    console.error("no teams!");
    return <Redirect to="/create-team" />;
  }

  if (!teams) return null;

  const teamIdx = teamId ? findIndex(teams, ["id", teamIdInt]) : 0;
  const team = teams[teamIdx];

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
        teams={teams.map((t) => ({
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
