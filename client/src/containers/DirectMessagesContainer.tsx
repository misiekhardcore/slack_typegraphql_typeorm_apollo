import React, { useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { Messages } from '../components/Messages';
import {
  DirectMessage,
  NewDirectMessageDocument,
  NewDirectMessageSubscription,
  NewDirectMessageSubscriptionVariables,
  useGetDirectMessageQuery,
} from '../generated/graphql';

const message = ({
  text,
  createdAt,
  id,
  file,
  userFrom: { username },
}: DirectMessage): JSX.Element => (
  <Comment key={`dir-mess-${id}`}>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
    <Comment.Content>
      <Comment.Author as="a">{username}</Comment.Author>
      <Comment.Metadata>
        <div>{new Date(+createdAt).toLocaleString()}</div>
      </Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
      {file && (
        <Comment.Text>
          <img src={`http://localhost:4000${file.url}`} alt={file.filename} />
        </Comment.Text>
      )}
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

interface DirectMessagesContainerProps {
  userToId: number;
  teamId: number;
}

export const DirectMessagesContainer: React.FC<DirectMessagesContainerProps> =
  ({ teamId, userToId }) => {
    const { data, error, loading, subscribeToMore } = useGetDirectMessageQuery({
      variables: { userToId, teamId },
      fetchPolicy: 'network-only',
    });

    useEffect(() => {
      const unsubscribe = subscribeToMore<
        NewDirectMessageSubscription,
        NewDirectMessageSubscriptionVariables
      >({
        document: NewDirectMessageDocument,
        variables: { userToId, teamId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData?.data) return prev;
          return {
            ...prev,
            getDirectMessages: [
              ...prev.getDirectMessages,
              subscriptionData.data.newDirectMessage,
            ],
          };
        },
      });

      return unsubscribe;
    }, [teamId, userToId, subscribeToMore]);

    return loading ? null : (
      <Messages>
        <Comment.Group>
          {data?.getDirectMessages &&
            data.getDirectMessages.map((mes) => message(mes as DirectMessage))}
        </Comment.Group>
        {error && JSON.stringify(error)}
      </Messages>
    );
  };
