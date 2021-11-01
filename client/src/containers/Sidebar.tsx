import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AddChannelModal } from '../components/AddChannelModal';
import { Channels } from '../components/Channels';
import { DirectMessageModal } from '../components/DirectMessageModal';
import { InvitePeopleModal } from '../components/InvitePeopleModal';
import { Teams } from '../components/Teams';
import { Team } from '../generated/graphql';

interface SidebarProps {
  teams: { id: number; letter: string }[];
  team: Team;
  userId: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ teams, team, userId }) => {
  const history = useHistory();
  const [state, setState] = useState({
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false,
  });

  if (!(teams && team)) {
    history.push('/login');
    return null;
  }

  const handleAddChannelModalClose = () =>
    setState({ ...state, openAddChannelModal: false });

  const handleAddChannelModalOpen = () =>
    setState({ ...state, openAddChannelModal: true });

  const handleInvitePeopleModalClose = () =>
    setState({ ...state, openInvitePeopleModal: false });

  const handleInvitePeopleModalOpen = () =>
    setState({ ...state, openInvitePeopleModal: true });

  const handleDirectMessageModalClose = () =>
    setState({ ...state, openDirectMessageModal: false });

  const handleDirectMessageModalOpen = () => {
    setState({ ...state, openDirectMessageModal: true });
  };

  return (
    <>
      <Teams key="team-sidebar" teams={teams} />
      <Channels
        key="channel-sidebar"
        team={team}
        userId={userId}
        onAddChannelClick={handleAddChannelModalOpen}
        onDirectMessageClick={handleDirectMessageModalOpen}
        onInvitePeople={handleInvitePeopleModalOpen}
      />
      <AddChannelModal
        teamId={team.id}
        open={state.openAddChannelModal}
        onClose={handleAddChannelModalClose}
      />
      <DirectMessageModal
        teamId={team.id}
        open={state.openDirectMessageModal}
        onClose={handleDirectMessageModalClose}
      />
      <InvitePeopleModal
        teamId={team.id}
        open={state.openInvitePeopleModal}
        onClose={handleInvitePeopleModalClose}
      />
    </>
  );
};
