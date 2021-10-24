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
  errors?: Maybe<Array<ListError>>;
  member?: Maybe<User>;
  ok: Scalars['Boolean'];
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isPublic: Scalars['Boolean'];
  members: Array<User>;
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  team: Team;
  updatedAt: Scalars['String'];
};

export type CreateChannelInput = {
  isPublic?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  teamId: Scalars['Float'];
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  channel?: Maybe<Channel>;
  errors?: Maybe<Array<ListError>>;
  ok: Scalars['Boolean'];
};

export type CreateDirectMessageInput = {
  teamId: Scalars['Float'];
  text: Scalars['String'];
  userToId: Scalars['Float'];
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
  errors?: Maybe<Array<ListError>>;
  ok: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  errors?: Maybe<Array<ListError>>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  team: Team;
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  userFrom: User;
  userTo: User;
};

export type ListError = {
  __typename?: 'ListError';
  msg: Scalars['String'];
  path: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<ListError>>;
  ok: Scalars['Boolean'];
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  channel: Channel;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMember: AddMemberResponse;
  createChannel: CreateChannelResponse;
  createDirectMessage: DirectMessage;
  createMessage: Message;
  createTeam: CreateTeamResponse;
  login: LoginResponse;
  register: CreateUserResponse;
  updateUser: User;
};


export type MutationAddMemberArgs = {
  addMemberInput: AddMemberInput;
};


export type MutationCreateChannelArgs = {
  channelInput: CreateChannelInput;
};


export type MutationCreateDirectMessageArgs = {
  messageInput: CreateDirectMessageInput;
};


export type MutationCreateMessageArgs = {
  messageInput: CreateMessageInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationLoginArgs = {
  userInput: LoginUserInput;
};


export type MutationRegisterArgs = {
  userInput: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  userInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getChannel?: Maybe<Channel>;
  getChannels?: Maybe<Array<Channel>>;
  getDirectMessage: DirectMessage;
  getDirectMessages: Array<DirectMessage>;
  getMessage: Message;
  getMessages: Array<Message>;
  getTeam?: Maybe<Team>;
  getTeams: Array<Team>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetDirectMessageArgs = {
  messageId: Scalars['Float'];
};


export type QueryGetDirectMessagesArgs = {
  teamId: Scalars['Float'];
  userToId: Scalars['Float'];
};


export type QueryGetMessageArgs = {
  messageId: Scalars['Float'];
};


export type QueryGetMessagesArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetTeamArgs = {
  teamId: Scalars['Float'];
};


export type QueryGetUserArgs = {
  userId: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newDirectMessage: DirectMessage;
  newMessage: Message;
};


export type SubscriptionNewDirectMessageArgs = {
  teamId: Scalars['Float'];
  userToId: Scalars['Float'];
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  admin: Scalars['Boolean'];
  channels: Array<Channel>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  members: Array<User>;
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  channels?: Maybe<Array<Channel>>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  teams?: Maybe<Array<Team>>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type AddMemberMutationVariables = Exact<{
  addMemberAddMemberInput: AddMemberInput;
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: { __typename?: 'AddMemberResponse', ok: boolean, member?: { __typename?: 'User', id: number, username: string } | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type CreateChannelMutationVariables = Exact<{
  createChannelChannelInput: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'CreateChannelResponse', ok: boolean, channel?: { __typename?: 'Channel', id: number, name: string, isPublic: boolean } | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type CreateDirectMessageMutationVariables = Exact<{
  createDirectMessageInput: CreateDirectMessageInput;
}>;


export type CreateDirectMessageMutation = { __typename?: 'Mutation', createDirectMessage: { __typename?: 'DirectMessage', id: number, text: string } };

export type CreateMessageMutationVariables = Exact<{
  createMessageInput: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', text: string, id: number } };

export type CreateTeamMutationVariables = Exact<{
  createTeamInput: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'CreateTeamResponse', ok: boolean, team?: { __typename?: 'Team', id: number, name: string, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> } | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', ok: boolean, token?: string | null | undefined, refreshToken?: string | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type RegisterMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'CreateUserResponse', ok: boolean, errors?: Array<{ __typename?: 'ListError', path: string, msg: string }> | null | undefined } };

export type GetDirectMessageQueryVariables = Exact<{
  userToId: Scalars['Float'];
  teamId: Scalars['Float'];
}>;


export type GetDirectMessageQuery = { __typename?: 'Query', getDirectMessages: Array<{ __typename?: 'DirectMessage', id: number, text: string, createdAt: string, updatedAt: string, userTo: { __typename?: 'User', id: number, username: string }, userFrom: { __typename?: 'User', id: number, username: string } }> };

export type GetMessagesQueryVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', id: number, text: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string } }> };

export type GetTeamMembersQueryVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeam?: { __typename?: 'Team', members: Array<{ __typename?: 'User', username: string, id: number }> } | null | undefined };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', getTeams: Array<{ __typename?: 'Team', id: number, name: string, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, teams?: Array<{ __typename?: 'Team', id: number, name: string, admin: boolean, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> }> | null | undefined } | null | undefined };

export type NewDirectMessageSubscriptionVariables = Exact<{
  userToId: Scalars['Float'];
  teamId: Scalars['Float'];
}>;


export type NewDirectMessageSubscription = { __typename?: 'Subscription', newDirectMessage: { __typename?: 'DirectMessage', id: number, text: string, createdAt: string, updatedAt: string, userFrom: { __typename?: 'User', id: number, username: string }, userTo: { __typename?: 'User', id: number, username: string } } };

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, text: string, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string } } };


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
export const CreateDirectMessageDocument = gql`
    mutation createDirectMessage($createDirectMessageInput: CreateDirectMessageInput!) {
  createDirectMessage(messageInput: $createDirectMessageInput) {
    id
    text
  }
}
    `;
export type CreateDirectMessageMutationFn = Apollo.MutationFunction<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      createDirectMessageInput: // value for 'createDirectMessageInput'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>(CreateDirectMessageDocument, options);
      }
export type CreateDirectMessageMutationHookResult = ReturnType<typeof useCreateDirectMessageMutation>;
export type CreateDirectMessageMutationResult = Apollo.MutationResult<CreateDirectMessageMutation>;
export type CreateDirectMessageMutationOptions = Apollo.BaseMutationOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;
export const CreateMessageDocument = gql`
    mutation createMessage($createMessageInput: CreateMessageInput!) {
  createMessage(messageInput: $createMessageInput) {
    text
    id
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      createMessageInput: // value for 'createMessageInput'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($createTeamInput: CreateTeamInput!) {
  createTeam(createTeamInput: $createTeamInput) {
    ok
    team {
      id
      name
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
export const GetDirectMessageDocument = gql`
    query getDirectMessage($userToId: Float!, $teamId: Float!) {
  getDirectMessages(userToId: $userToId, teamId: $teamId) {
    id
    text
    userTo {
      id
      username
    }
    userFrom {
      id
      username
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDirectMessageQuery__
 *
 * To run a query within a React component, call `useGetDirectMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDirectMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDirectMessageQuery({
 *   variables: {
 *      userToId: // value for 'userToId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetDirectMessageQuery(baseOptions: Apollo.QueryHookOptions<GetDirectMessageQuery, GetDirectMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDirectMessageQuery, GetDirectMessageQueryVariables>(GetDirectMessageDocument, options);
      }
export function useGetDirectMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDirectMessageQuery, GetDirectMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDirectMessageQuery, GetDirectMessageQueryVariables>(GetDirectMessageDocument, options);
        }
export type GetDirectMessageQueryHookResult = ReturnType<typeof useGetDirectMessageQuery>;
export type GetDirectMessageLazyQueryHookResult = ReturnType<typeof useGetDirectMessageLazyQuery>;
export type GetDirectMessageQueryResult = Apollo.QueryResult<GetDirectMessageQuery, GetDirectMessageQueryVariables>;
export const GetMessagesDocument = gql`
    query getMessages($channelId: Float!) {
  getMessages(channelId: $channelId) {
    id
    text
    user {
      id
      username
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetTeamMembersDocument = gql`
    query getTeamMembers($teamId: Float!) {
  getTeam(teamId: $teamId) {
    members {
      username
      id
    }
  }
}
    `;

/**
 * __useGetTeamMembersQuery__
 *
 * To run a query within a React component, call `useGetTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamMembersQuery(baseOptions: Apollo.QueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
      }
export function useGetTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
        }
export type GetTeamMembersQueryHookResult = ReturnType<typeof useGetTeamMembersQuery>;
export type GetTeamMembersLazyQueryHookResult = ReturnType<typeof useGetTeamMembersLazyQuery>;
export type GetTeamMembersQueryResult = Apollo.QueryResult<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const GetTeamsDocument = gql`
    query getTeams {
  getTeams {
    id
    name
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
export const GetUserDocument = gql`
    query getUser($userId: Float!) {
  getUser(userId: $userId) {
    id
    username
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers {
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
export const MeDocument = gql`
    query me {
  me {
    id
    username
    teams {
      id
      name
      admin
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
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewDirectMessageDocument = gql`
    subscription newDirectMessage($userToId: Float!, $teamId: Float!) {
  newDirectMessage(userToId: $userToId, teamId: $teamId) {
    id
    text
    userFrom {
      id
      username
    }
    userTo {
      id
      username
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNewDirectMessageSubscription__
 *
 * To run a query within a React component, call `useNewDirectMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewDirectMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewDirectMessageSubscription({
 *   variables: {
 *      userToId: // value for 'userToId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useNewDirectMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewDirectMessageSubscription, NewDirectMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewDirectMessageSubscription, NewDirectMessageSubscriptionVariables>(NewDirectMessageDocument, options);
      }
export type NewDirectMessageSubscriptionHookResult = ReturnType<typeof useNewDirectMessageSubscription>;
export type NewDirectMessageSubscriptionResult = Apollo.SubscriptionResult<NewDirectMessageSubscription>;
export const NewMessageDocument = gql`
    subscription newMessage($channelId: Float!) {
  newMessage(channelId: $channelId) {
    id
    text
    user {
      id
      username
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;