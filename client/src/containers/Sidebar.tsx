import React, { useState } from 'react';
import { Redirect } from 'react-router';
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

export const Sidebar: React.FC<SidebarProps> = ({
  teams = [],
  team,
  userId,
}) => {
  const [state, setState] = useState({
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false,
  });

  if (!(teams && team)) {
    return <Redirect to="/login" />;
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
        team={team}
        onAddChannelClick={handleAddChannelModalOpen}
        onDirectMessageClick={handleDirectMessageModalOpen}
        onInvitePeople={handleInvitePeopleModalOpen}
      />
      <AddChannelModal
        teamId={team.id}
        userId={userId}
        open={state.openAddChannelModal}
        onClose={handleAddChannelModalClose}
      />
      <DirectMessageModal
        teamId={team.id}
        userId={userId}
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
