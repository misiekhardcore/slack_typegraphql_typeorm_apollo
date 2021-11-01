import { findIndex } from 'lodash';
import React from 'react';
import { Redirect } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Header } from '../components/Header';
import { SendMessage } from '../components/SendMessage';
import { DirectMessagesContainer } from '../containers/DirectMessagesContainer';
import { Sidebar } from '../containers/Sidebar';
import {
  Team,
  useCreateDirectMessageMutation,
  useGetDirectModalQuery,
} from '../generated/graphql';

interface DirectMessagesProps {
  match: { params: { teamId: string; userId: string } };
}

const DirectMessages: React.FC<DirectMessagesProps> = ({
  match: {
    params: { teamId, userId },
  },
}) => {
  const [createDirectMessage] = useCreateDirectMessageMutation();
  const { loading, error, data } = useGetDirectModalQuery({
    variables: { userId: +userId },
  });

  const { me, getUser } = data || {};
  const { teams, id } = me || {};

  const teamIdInt = parseInt(teamId, 10);

  if (teamId && !teamIdInt) {
    console.error('invalid teamid!');
    return <Redirect to="/view-team" />;
  }

  const userIdInt = parseInt(userId, 10);

  if (userId && !userIdInt) {
    console.error('invalid userId!');
    return <Redirect to={`/view-team/${teamId}`} />;
  }

  if (!(loading || teams)) {
    console.error('no teams!');
    return <Redirect to="/create-team" />;
  }

  if (!(loading || getUser)) {
    console.error('no such user!');
    return <Redirect to={`/view-team/${teamId}`} />;
  }

  if (!teams) return null;
  if (!getUser) return null;

  const teamIdx = teamId ? findIndex(teams, ['id', teamIdInt]) : 0;
  const team = teams[teamIdx];

  if (!team) {
    console.error('no team with that id!');
    return <Redirect to="/create-team" />;
  }

  if (!id) {
    console.error('no user id!');
    return <Redirect to="/login" />;
  }

  if (loading || error) return null;

  const onSubmit = async (message: string | null, file: File | null) =>
    createDirectMessage({
      variables: {
        createDirectMessageInput: {
          teamId: team.id,
          userToId: userIdInt,
          text: message,
          file,
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
      <Header title={`@${getUser?.username}`} />
      <DirectMessagesContainer teamId={+teamId} userToId={+userId} />
      <SendMessage placeholder={`@${getUser?.username}`} onSubmit={onSubmit} />
    </AppLayout>
  );
};

export default DirectMessages;
