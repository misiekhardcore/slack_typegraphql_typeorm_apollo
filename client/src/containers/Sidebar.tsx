import decode from "jwt-decode";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { AddChannelModal } from "../components/AddChannelModal";
import { Channels } from "../components/Channels";
import { InvitePeopleModal } from "../components/InvitePeopleModal";
import { Teams } from "../components/Teams";
import { Team } from "../generated/graphql";
import { JWTTokenPayload } from "../types";

interface SidebarProps {
  teams: { id: number; letter: string }[];
  team: Team;
}

export const Sidebar: React.FC<SidebarProps> = ({ teams, team }) => {
  const history = useHistory();
  const [state, setState] = useState({
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  });

  let userId = 0;
  try {
    const token = localStorage.getItem("token") || "";
    const { user } = decode(token) as JWTTokenPayload;
    userId = user.id;
  } catch (error) {}

  if (!(teams && team)) {
    history.push("/login");
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
  return (
    <>
      <Teams key="team-sidebar" teams={teams} />
      <Channels
        key="channel-sidebar"
        team={team}
        userId={userId}
        onAddChannelClick={handleAddChannelModalOpen}
        onInvitePeople={handleInvitePeopleModalOpen}
      />
      <AddChannelModal
        teamId={team.id}
        open={state.openAddChannelModal}
        onClose={handleAddChannelModalClose}
      />
      <InvitePeopleModal
        teamId={team.id}
        open={state.openInvitePeopleModal}
        onClose={handleInvitePeopleModalClose}
      />
    </>
  );
};
