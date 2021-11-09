import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Comment } from 'semantic-ui-react';
import styled from 'styled-components';
import {
  File,
  Message,
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  useGetMessagesQuery,
} from '../generated/graphql';

const Messages = styled.div`
  padding: 1.5rem;
  grid-column: 3;
  grid-row: 2;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

const EndInfo = styled.p`
  width: 100%;
  padding: 1rem;
  color: gray;
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
  font-style: italic;
`;

const media = ({ filename, mimetype, url }: File): JSX.Element => {
  const type = mimetype.split('/')[0];
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
  const { data, loading, error, subscribeToMore, fetchMore } =
    useGetMessagesQuery({
      variables: { channelId },
      notifyOnNetworkStatusChange: true,
    });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: () => console.log(),
  });

  const ref = useRef<HTMLDivElement>(null);

  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

  const { getMessages } = data || {};

  const onLoadMore = () => {
    let cursor: string | undefined;
    if (getMessages?.length)
      cursor = new Date(
        +getMessages[getMessages?.length - 1].createdAt
      ).toLocaleString();
    fetchMore({
      variables: { channelId, cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.getMessages) return prev;
        if (fetchMoreResult.getMessages.length < 35) setHasMoreToLoad(false);
        // document.querySelector('#comments')?.scrollTop = 0;
        return {
          ...prev,
          getMessages: [
            ...(prev.getMessages || []),
            ...fetchMoreResult.getMessages,
          ],
        };
      },
    });
  };

  const handleScroll = () => {
    if (
      !loading &&
      ref.current?.getBoundingClientRect().top &&
      hasMoreToLoad &&
      (getMessages || []).length >= 35 &&
      ref.current?.getBoundingClientRect().top > 0
    )
      onLoadMore();
  };

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
          getMessages: [
            subscriptionData.data.newMessage,
            ...(prev.getMessages || []),
          ],
        };
      },
    });

    return unsubscribe;
  }, [channelId, subscribeToMore]);

  return (
    <Messages
      onScroll={handleScroll}
      {...getRootProps({
        style: isDragActive ? { border: '2px dashed blue' } : undefined,
      })}
    >
      <input {...getInputProps()} />
      <Comment.Group style={{ maxWidth: '100%', margin: 0 }}>
        <div ref={ref} />
        {!hasMoreToLoad && (getMessages || []).length > 0 && (
          <EndInfo>~~~That&apos;s the end of that story~~~</EndInfo>
        )}
        {!hasMoreToLoad && (getMessages || []).length === 0 && (
          <EndInfo>~~~You haven&apos;t spoken yet~~~</EndInfo>
        )}
        {hasMoreToLoad && (getMessages || []).length >= 35 && (
          <Button fluid onClick={onLoadMore}>
            Load more
          </Button>
        )}
        {getMessages &&
          [...getMessages].reverse().map((mes) => message(mes as Message))}
      </Comment.Group>
      {error && JSON.stringify(error)}
    </Messages>
  );
};
