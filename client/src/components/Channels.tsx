import React from "react";
import styled from "styled-components";

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

export type TChannel = { id: number; isPublic: boolean; name: string };
type TUser = { id: number; name: string };

const channel = ({ id, name }: TChannel): JSX.Element => (
  <SideBarListItem key={`channel-${id}`}>{`# ${name}`}</SideBarListItem>
);

const user = ({ id, name }: TUser): JSX.Element => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble on />
    {name}
  </SideBarListItem>
);

interface ChannelsProps {
  teamName: string;
  userName: string;
  channels: TChannel[];
  users: TUser[];
}

export const Channels: React.FC<ChannelsProps> = ({
  users,
  channels,
  userName,
  teamName,
}) => {
  return (
    <ChannelsWrapper>
      <PushLeft>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {userName}
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarListHeader>Channels</SideBarListHeader>
          {channels.map(channel)}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {users.map(user)}
        </SideBarList>
      </div>
    </ChannelsWrapper>
  );
};
