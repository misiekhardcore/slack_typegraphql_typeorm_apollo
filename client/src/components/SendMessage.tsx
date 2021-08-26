import styled from "styled-components";
import React from "react";
import { Input } from "semantic-ui-react";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  /* background-color: #4e3a4c; */
`;

interface SendMessageProps {
  channelName: string;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  channelName,
}) => {
  return (
    <SendMessageWrapper>
      <Input fluid placeholder={`Message #${channelName}`} />
    </SendMessageWrapper>
  );
};
