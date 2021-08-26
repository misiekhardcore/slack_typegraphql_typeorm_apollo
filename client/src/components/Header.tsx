import styled from "styled-components";
import { Header as He } from "semantic-ui-react";

export const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  /* background-color: #4e3a4c; */
`;

interface HeaderPros {
  channelName: string;
}

export const Header: React.FC<HeaderPros> = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <He>{channelName}</He>
    </HeaderWrapper>
  );
};
