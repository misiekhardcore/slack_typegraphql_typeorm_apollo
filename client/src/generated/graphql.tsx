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
  isPublic: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  team: Team;
  messages?: Maybe<Array<Message>>;
  users: Array<User>;
};

export type CreateChannelInput = {
  name: Scalars['String'];
  teamId: Scalars['Float'];
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type CreateMessageInput = {
  channelId: Scalars['Float'];
  text: Scalars['String'];
};

export type CreateTeamInput = {
  name: Scalars['String'];
};

export type CreateTeamResponse = {
  __typename?: 'CreateTeamResponse';
  ok: Scalars['Boolean'];
  team?: Maybe<Team>;
  errors?: Maybe<Array<ListError>>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
  errors?: Maybe<Array<ListError>>;
};

export type ListError = {
  __typename?: 'ListError';
  path: Scalars['String'];
  msg: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ListError>>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  channel: Channel;
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  createMessage: Message;
  createTeam: CreateTeamResponse;
  register: CreateUserResponse;
  login: LoginResponse;
  updateUser: User;
};


export type MutationCreateChannelArgs = {
  channelInput: CreateChannelInput;
};


export type MutationCreateMessageArgs = {
  messageInput: CreateMessageInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationRegisterArgs = {
  userInput: CreateUserInput;
};


export type MutationLoginArgs = {
  userInput: LoginUserInput;
};


export type MutationUpdateUserArgs = {
  userInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getChannels?: Maybe<Array<Channel>>;
  getChannel?: Maybe<Channel>;
  getMessages: Array<Message>;
  getMessage: Message;
  getTeams?: Maybe<Array<Team>>;
  getTeam?: Maybe<Team>;
  getUsers?: Maybe<Array<User>>;
  getUser?: Maybe<User>;
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetTeamArgs = {
  teamId: Scalars['Float'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  members: Array<User>;
  owner: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UpdateUserInput = {
  id: Scalars['Float'];
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
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type CreateTeamMutationVariables = Exact<{
  createTeamInput: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'CreateTeamResponse', ok: boolean, team?: Maybe<{ __typename?: 'Team', id: string, name: string }>, errors?: Maybe<Array<{ __typename?: 'ListError', msg: string, path: string }>> } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', ok: boolean, token?: Maybe<string>, refreshToken?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'ListError', msg: string, path: string }>> } };

export type RegisterMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'CreateUserResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'ListError', path: string, msg: string }>> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Maybe<Array<{ __typename?: 'User', id: string, username: string, email: string, createdAt: string, updatedAt: string }>> };


export const CreateTeamDocument = gql`
    mutation createTeam($createTeamInput: CreateTeamInput!) {
  createTeam(createTeamInput: $createTeamInput) {
    ok
    team {
      id
      name
    }
    errors {
      msg
      path
    }
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      createTeamInput: // value for 'createTeamInput'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginUserInput: LoginUserInput!) {
  login(userInput: $loginUserInput) {
    ok
    token
    refreshToken
    errors {
      msg
      path
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($userInput: CreateUserInput!) {
  register(userInput: $userInput) {
    ok
    errors {
      path
      msg
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    username
    email
    createdAt
    updatedAt
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