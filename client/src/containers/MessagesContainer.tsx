import React from "react";
import { Comment } from "semantic-ui-react";
import { Messages } from "../components/Messages";
import { Message, useGetMessagesQuery } from "../generated/graphql";

const message = ({
  text,
  createdAt,
  id,
  user: { username },
}: Message): JSX.Element => (
  <Comment key={`mess-${id}`}>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
    <Comment.Content>
      <Comment.Author as="a">{username}</Comment.Author>
      <Comment.Metadata>
        <div>{new Date(+createdAt).toLocaleString()}</div>
      </Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
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
      <Comment.Group>
        {data?.getMessages &&
          data.getMessages.map((mes) => message(mes as Message))}
      </Comment.Group>
      {error && JSON.stringify(error)}
    </Messages>
  );
};
