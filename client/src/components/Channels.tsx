import React from 'react';
import { Link } from 'react-router-dom';
import { Icon as Icona } from 'semantic-ui-react';
import styled from 'styled-components';
import { Channel, Team } from '../generated/graphql';

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

const paddingLeft = 'padding-left:10px;';

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

const Icon = styled(Icona)`
  margin-left: 5px !important;
  &:hover {
    cursor: pointer;
  }
`;

const channel = ({ id, name }: Channel, teamId: number): JSX.Element => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>{`# ${name}`}</SideBarListItem>
  </Link>
);

const dmchannel = ({ id, name }: Channel, teamId: number): JSX.Element => (
  <Link key={`user-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>
      <Bubble on />
      {name}
    </SideBarListItem>
  </Link>
);

interface ChannelsProps {
  team: Team;
  onAddChannelClick: () => void;
  onDirectMessageClick: () => void;
  onInvitePeople: () => void;
}

export const Channels: React.FC<ChannelsProps> = ({
  team,
  onDirectMessageClick,
  onAddChannelClick,
  onInvitePeople,
}) => {
  const { channels, name, id, owner, admin } = team || {};

  const dmChannels: Channel[] = [];

  const normalChannels: Channel[] = [];

  channels.forEach((c) =>
    c.isDm ? dmChannels.push(c) : normalChannels.push(c)
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
          {admin && <Icon onClick={onAddChannelClick} name="add circle" />}
        </SideBarListHeader>
        {normalChannels.map((c) => channel(c, id))}
      </SideBarList>
      <SideBarList>
        <SideBarListHeader>
          Direct Messages
          <Icon onClick={onDirectMessageClick} name="add circle" />
        </SideBarListHeader>
        {dmChannels.map((c) => dmchannel(c, id))}
        {admin && (
          <SideBarListItem style={{ marginTop: '0.5rem' }}>
            <a href="#invite-people" onClick={onInvitePeople}>
              + Invite People
            </a>
          </SideBarListItem>
        )}
      </SideBarList>
    </ChannelsWrapper>
  );
};
