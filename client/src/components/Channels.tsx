import decode from "jwt-decode";
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Channel, Team, User } from "../generated/graphql";
import { JWTTokenPayload } from "../types";

const ChannelsWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const paddingLeft = "padding-left:10px;";

const SideBarListItem = styled.li`
  ${paddingLeft}
  &:hover {
    background-color: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  padding: 2px;
  ${paddingLeft}
`;

const PushLeft = styled.div`
  ${paddingLeft}
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on }: { on: boolean }): JSX.Element =>
  on ? <Green>● </Green> : <span>○</span>;

const channel = (
  { id, name }: Channel,
  teamId: number
): JSX.Element => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>{`# ${name}`}</SideBarListItem>
  </Link>
);

const user = ({ id, username }: User): JSX.Element => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble on />
    {username}
  </SideBarListItem>
);

interface ChannelsProps {
  team: Team;
  onAddChannelClick: () => void;
  onInvitePeople: () => void;
}

export const Channels: React.FC<ChannelsProps> = ({
  team,
  onAddChannelClick,
  onInvitePeople,
}) => {
  let username = "";
  try {
    const token = localStorage.getItem("token") || "";
    const { user } = decode(token) as JWTTokenPayload;
    username = user.username;
  } catch (error) {}

  const { channels, owner, name, id, members } = team || {};
  const allPeople = [owner, ...(members || [])].filter(
    (user) => user.username !== username
  );
  return (
    <ChannelsWrapper>
      <PushLeft>
        <TeamNameHeader>{name}</TeamNameHeader>
        {owner.username}
      </PushLeft>
      <SideBarList>
        <SideBarListHeader>
          Channels
          <Icon onClick={onAddChannelClick} name="add circle" />
        </SideBarListHeader>
        {channels.map((chan) => channel(chan, id))}
      </SideBarList>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {allPeople.map(user)}
        <SideBarListItem style={{ marginTop: "0.5rem" }}>
          <a href="#invite-people" onClick={onInvitePeople}>
            + Invite People
          </a>
        </SideBarListItem>
      </SideBarList>
    </ChannelsWrapper>
  );
};
