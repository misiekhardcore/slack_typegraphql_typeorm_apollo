import decode from "jwt-decode";
import React, { useState } from "react";
import { AddChannelModal } from "../components/AddChannelModal";
import { InvitePeopleModal } from "../components/InvitePeopleModal";
import { Channels } from "../components/Channels";
import { Teams } from "../components/Teams";
import { Team } from "../generated/graphql";
import { JWTTokenPayload } from "../types";
import { useHistory } from "react-router";

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
  if (!(teams && team)) {
    history.push("/login");
    return null;
  }

  const channels = team?.channels || [];

  let username = "";
  try {
    const token = localStorage.getItem("token") || "";
    if (!token) history.push("/login");
    const { user } = decode(token) as JWTTokenPayload;
    if (!user) history.push("/login");
    username = user.username;
  } catch (error) {}

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
        teamId={team.id}
        teamName={team?.name}
        userName={username}
        channels={channels}
        users={[
          { id: 1, name: "user1" },
          { id: 2, name: "user2" },
        ]}
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
