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

export type AddMemberInput = {
  email: Scalars['String'];
  teamId: Scalars['Int'];
};

export type AddMemberResponse = {
  __typename?: 'AddMemberResponse';
  ok: Scalars['Boolean'];
  member: User;
  errors?: Maybe<Array<ListError>>;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
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

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  ok: Scalars['Boolean'];
  channel?: Maybe<Channel>;
  errors?: Maybe<Array<ListError>>;
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
  id: Scalars['Int'];
  text: Scalars['String'];
  channel: Channel;
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: CreateChannelResponse;
  createMessage: Message;
  createTeam: CreateTeamResponse;
  addMember: AddMemberResponse;
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


export type MutationAddMemberArgs = {
  addMemberInput: AddMemberInput;
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
  getTeams: Array<Team>;
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
  id: Scalars['Int'];
  name: Scalars['String'];
  members: Array<User>;
  owner: User;
  channels: Array<Channel>;
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
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  teams?: Maybe<Array<Team>>;
  channels?: Maybe<Array<Channel>>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type AddMemberMutationVariables = Exact<{
  addMemberAddMemberInput: AddMemberInput;
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: { __typename?: 'AddMemberResponse', ok: boolean, member: { __typename?: 'User', id: number, username: string }, errors?: Maybe<Array<{ __typename?: 'ListError', msg: string, path: string }>> } };

export type CreateChannelMutationVariables = Exact<{
  createChannelChannelInput: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'CreateChannelResponse', ok: boolean, channel?: Maybe<{ __typename?: 'Channel', id: number, name: string, isPublic: boolean }>, errors?: Maybe<Array<{ __typename?: 'ListError', msg: string, path: string }>> } };

export type CreateTeamMutationVariables = Exact<{
  createTeamInput: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'CreateTeamResponse', ok: boolean, team?: Maybe<{ __typename?: 'Team', id: number, name: string, owner: { __typename?: 'User', username: string }, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, name: string }> }>, errors?: Maybe<Array<{ __typename?: 'ListError', msg: string, path: string }>> } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', ok: boolean, token?: Maybe<string>, refreshToken?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'ListError', msg: string, path: string }>> } };

export type RegisterMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'CreateUserResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'ListError', path: string, msg: string }>> } };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', getTeams: Array<{ __typename?: 'Team', id: number, name: string, owner: { __typename?: 'User', username: string }, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Maybe<Array<{ __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }>> };


export const AddMemberDocument = gql`
    mutation addMember($addMemberAddMemberInput: AddMemberInput!) {
  addMember(addMemberInput: $addMemberAddMemberInput) {
    ok
    member {
      id
      username
    }
    errors {
      msg
      path
    }
  }
}
    `;
export type AddMemberMutationFn = Apollo.MutationFunction<AddMemberMutation, AddMemberMutationVariables>;

/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      addMemberAddMemberInput: // value for 'addMemberAddMemberInput'
 *   },
 * });
 */
export function useAddMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, options);
      }
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<AddMemberMutation, AddMemberMutationVariables>;
export const CreateChannelDocument = gql`
    mutation createChannel($createChannelChannelInput: CreateChannelInput!) {
  createChannel(channelInput: $createChannelChannelInput) {
    ok
    channel {
      id
      name
      isPublic
    }
    errors {
      msg
      path
    }
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      createChannelChannelInput: // value for 'createChannelChannelInput'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($createTeamInput: CreateTeamInput!) {
  createTeam(createTeamInput: $createTeamInput) {
    ok
    team {
      id
      name
      owner {
        username
      }
      channels {
        id
        isPublic
        name
      }
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
export const GetTeamsDocument = gql`
    query getTeams {
  getTeams {
    id
    name
    owner {
      username
    }
    channels {
      id
      isPublic
      name
    }
    members {
      username
      id
    }
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
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