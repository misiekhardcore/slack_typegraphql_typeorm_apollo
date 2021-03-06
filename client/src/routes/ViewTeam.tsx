import { findIndex } from 'lodash';
import React from 'react';
import { Redirect } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Header } from '../components/Header';
import { SendMessage } from '../components/SendMessage';
import { MessagesContainer } from '../containers/MessagesContainer';
import { Sidebar } from '../containers/Sidebar';
import {
  Team,
  useCreateMessageMutation,
  useMeQuery,
} from '../generated/graphql';

interface ViewTeamProps {
  match: { params: { teamId: string; channelId: string } };
}

const ViewTeam: React.FC<ViewTeamProps> = ({
  match: {
    params: { teamId, channelId },
  },
}) => {
  const [createMessage] = useCreateMessageMutation();
  const { loading, error, data } = useMeQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { me } = data || {};
  const { teams, id } = me || {};

  if (!(id || loading)) {
    console.error('no user id!');
    return <Redirect to="/login" />;
  }

  const teamIdInt = parseInt(teamId, 10);

  if (teamId && !teamIdInt) {
    console.error('invalid teamid!');
    return <Redirect to="/view-team" />;
  }

  const channelIdInt = parseInt(channelId, 10);

  if (channelId && !channelIdInt) {
    console.error('invalid channelid!');
    return <Redirect to="/view-team" />;
  }

  if (!(loading || teams)) {
    console.error('no teams!');
    return <Redirect to="/create-team" />;
  }

  if (!teams) return null;

  const teamIdx = teamId ? findIndex(teams, ['id', teamIdInt]) : 0;
  const team = teams[teamIdx];

  if (!team) {
    console.error('no team with that id!');
    return <Redirect to="/create-team" />;
  }

  const channelIdx = channelId
    ? findIndex(team.channels, ['id', channelIdInt])
    : 0;
  const channel = team.channels[channelIdx] || {};

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const onSubmit = async (message: string | null, file: File | null) =>
    createMessage({
      variables: {
        createMessageInput: {
          channelId: channel.id,
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
        userId={id || 0}
      />
      {channel && (
        <>
          <Header title={`#${channel.name}`} />
          <MessagesContainer channelId={channel.id} />
          <SendMessage placeholder={`#${channel.name}`} onSubmit={onSubmit} />
        </>
      )}
    </AppLayout>
  );
};

export default ViewTeam;
