import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  team: Team;
  messages?: Maybe<Array<Message>>;
  users: Array<User>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  channel: Channel;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  createTeam: Team;
  createChannel: Channel;
  createMessage: Message;
};


export type MutationCreateUserArgs = {
  userInput: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  userInput: UpdateUserInput;
  id: Scalars['Float'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  public?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  teamId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  text: Scalars['String'];
  channelId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<Array<User>>;
  getUser?: Maybe<User>;
  getTeams?: Maybe<Array<Team>>;
  getTeam?: Maybe<Team>;
  getChannels?: Maybe<Array<Channel>>;
  getChannel?: Maybe<Channel>;
  getMessages: Array<Message>;
};


export type QueryGetUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetTeamArgs = {
  teamId: Scalars['Float'];
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  members: Array<User>;
  owner: User;
};

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  teams?: Maybe<Array<Team>>;
  channels?: Maybe<Array<Channel>>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<(
    { __typename: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )>> }
);


export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    __typename
    username
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;