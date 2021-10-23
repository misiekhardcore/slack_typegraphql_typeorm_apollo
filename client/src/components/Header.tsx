import React from "react";
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
  title: string;
}

export const Header: React.FC<HeaderPros> = ({ title }) => {
  return (
    <HeaderWrapper>
      <He>{title}</He>
    </HeaderWrapper>
  );
};
