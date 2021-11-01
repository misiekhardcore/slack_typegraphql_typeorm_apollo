import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Comment } from 'semantic-ui-react';
import { Messages } from '../components/Messages';
import {
  File,
  Message,
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  useGetMessagesQuery,
} from '../generated/graphql';

const media = ({ filename, mimetype, url }: File): JSX.Element => {
  const type = mimetype.split('/')[0];
  console.log(type);
  if (!url) return <p style={{ color: 'red' }}>File URL broken</p>;
  switch (type) {
    case 'image':
      return (
        <img
          style={{ maxWidth: '100%' }}
          src={`http://localhost:4000${url}`}
          alt={filename}
        />
      );
    case 'audio':
      return (
        <audio controls>
          Your browser does not support <code>audio</code> element.
          <source src={`http://localhost:4000${url}`} type={mimetype} />
          <track default kind="captions" label={filename} />
        </audio>
      );
    default:
      return <div>{filename}</div>;
  }
};

const message = ({
  text,
  createdAt,
  id,
  file,
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
      {file && media(file)}
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
  const { data, error, loading, subscribeToMore } = useGetMessagesQuery({
    variables: { channelId },
    fetchPolicy: 'network-only',
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: () => console.log(),
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<
      NewMessageSubscription,
      NewMessageSubscriptionVariables
    >({
      document: NewMessageDocument,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData?.data) return prev;
        return {
          ...prev,
          getMessages: [...prev.getMessages, subscriptionData.data.newMessage],
        };
      },
    });

    return unsubscribe;
  }, [channelId, subscribeToMore]);

  return loading ? null : (
    <Messages
      {...getRootProps({
        style: isDragActive ? { border: '2px dashed blue' } : undefined,
      })}
    >
      <input {...getInputProps()} />
      <Comment.Group style={{ maxWidth: '100%' }}>
        {data?.getMessages &&
          data.getMessages.map((mes) => message(mes as Message))}
      </Comment.Group>
      {error && JSON.stringify(error)}
    </Messages>
  );
};
