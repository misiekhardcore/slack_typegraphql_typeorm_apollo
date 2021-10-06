import React from "react";
import styled from "styled-components";
import { Messages } from "../components/Messages";
import { Message, useGetMessagesQuery } from "../generated/graphql";

const Glowka = styled.span`
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 25%;
  background-color: red;
`;

const MessagesList = styled.ul`
  list-style: none;
`;

const MessageItem = styled.li`
  display: flex;
`;

const message = ({
  text,
  createdAt,
  id,
  user: { username },
}: Message): JSX.Element => (
  <MessageItem key={`mess-${id}`}>
    <Glowka />
    <div>
      <p>
        {username}
        <span>{new Date(+createdAt).toLocaleString()}</span>
      </p>
      <p>{text}</p>
    </div>
  </MessageItem>
);

interface MessagesContainerProps {
  channelId: number;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  channelId,
}) => {
  const { data, error, loading } = useGetMessagesQuery({
    variables: { channelId },
  });

  return loading ? null : (
    <Messages>
      <MessagesList>
        {data?.getMessages &&
          data.getMessages.map((mes) => message(mes as Message))}
      </MessagesList>
      {error && JSON.stringify(error)}
    </Messages>
  );
};
