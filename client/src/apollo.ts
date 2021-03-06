import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-token': localStorage.getItem('token') || '',
      'x-refresh-token': localStorage.getItem('refreshToken') || '',
    },
  };
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  });
});

const httpLinkWithMiddlewares = afterwareLink.concat(authLink.concat(httpLink));

export const wsClient = new SubscriptionClient(
  `${process.env.REACT_APP_SERVER_WS}/graphql`,
  {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    }),
  }
);

const wsLink = new WebSocketLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkWithMiddlewares
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
