import styled from "styled-components";
import { Header as He } from "semantic-ui-react";

export const HeaderWrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
  grid-column: 3;
  grid-row: 1;
  text-align: center;
  background-color: #b9a7c5;
`;

interface HeaderPros {
  channelName: string;
}

export const Header: React.FC<HeaderPros> = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <He>#{channelName}</He>
    </HeaderWrapper>
  );
};
