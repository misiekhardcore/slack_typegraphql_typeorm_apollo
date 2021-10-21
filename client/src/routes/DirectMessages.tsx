import { findIndex } from "lodash";
import React from "react";
import { Redirect } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { SendMessage } from "../components/SendMessage";
import { Sidebar } from "../containers/Sidebar";
import {
  Team,
  useCreateDirectMessageMutation,
  useMeQuery,
} from "../generated/graphql";

interface DirectMessagesProps {
  match: { params: { teamId: string; userId: string } };
}

const DirectMessages: React.FC<DirectMessagesProps> = ({
  match: {
    params: { teamId, userId },
  },
}) => {
  const [createDirectMessage] = useCreateDirectMessageMutation();
  const { loading, error, data } = useMeQuery();

  const { me } = data || {};
  const { teams, id } = me || {};

  const teamIdInt = parseInt(teamId);

  if (teamId && !teamIdInt) {
    console.error("invalid teamid!");
    return <Redirect to="/view-team" />;
  }

  const userIdInt = parseInt(userId);

  if (userId && !userIdInt) {
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

  if (!id) {
    console.error("no user id!");
    return <Redirect to="/login" />;
  }

  if (loading || error) return null;

  const onSubmit = async (message: string) =>
    await createDirectMessage({
      variables: {
        createDirectMessageInput: {
          teamId: team.id,
          userToId: userIdInt,
          text: message,
        },
      },
    });

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team as Team}
        userId={id}
      />
      {/* <Header channelName={""} />
      <MessagesContainer channelId={1} /> */}
      <SendMessage placeholder={"asdasdsadads"} onSubmit={onSubmit} />
    </AppLayout>
  );
};

export default DirectMessages;
