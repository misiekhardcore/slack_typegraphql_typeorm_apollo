import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TeamsWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border: thick solid #767676;
  }
`;

type TTeam = { id: number; letter: string };

const team = ({ id, letter }: TTeam): JSX.Element => (
  <Link to={`/view-team/${id}`} key={`team-${id}`}>
    <TeamListItem>{letter}</TeamListItem>
  </Link>
);

const addteam = (): JSX.Element => (
  <Link to="/create-team" key="addTeam">
    <TeamListItem>+</TeamListItem>
  </Link>
);

interface TeamsProps {
  teams: TTeam[];
}

export const Teams: React.FC<TeamsProps> = ({ teams }) => {
  return (
    <TeamsWrapper>
      <TeamList>
        {teams.map(team)}
        {addteam()}
      </TeamList>
    </TeamsWrapper>
  );
};
