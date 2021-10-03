import { findIndex } from "lodash";
import React from "react";
import { useHistory } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { Messages } from "../components/Messages";
import { SendMessage } from "../components/SendMessage";
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
  const history = useHistory();
  const { loading, error, data } = useGetTeamsQuery();

  const { getTeams } = data || {};
  if (!getTeams) return null;

  const teamIdx = teamId ? findIndex(getTeams, ["id", +teamId]) : 0;
  const team = getTeams[teamIdx];

  if (!team) {
    history.push("/login");
    return null;
  }

  const channelIdx = channelId
    ? findIndex(team.channels, ["id", +channelId])
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
      <Header channelName={channel?.name || "none"} />
      <Messages>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName="general">
        <input type="text" placeholder="CSS Grid Layout Module" />
      </SendMessage>
    </AppLayout>
  );
};

export default ViewTeam;
