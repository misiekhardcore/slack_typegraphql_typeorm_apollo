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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
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
  isDm: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  members: Array<User>;
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  team: Team;
  updatedAt: Scalars['String'];
};

export type CreateChannelInput = {
  isDm?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  membersIds?: Maybe<Array<Scalars['Int']>>;
  name: Scalars['String'];
  teamId: Scalars['Int'];
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  channel?: Maybe<Channel>;
  errors?: Maybe<Array<ListError>>;
  ok: Scalars['Boolean'];
};

export type CreateMessageInput = {
  channelId: Scalars['Int'];
  file?: Maybe<Scalars['Upload']>;
  text?: Maybe<Scalars['String']>;
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

export type File = {
  __typename?: 'File';
  createdAt: Scalars['String'];
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['Int'];
  mimetype: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
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
  file?: Maybe<File>;
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMember: AddMemberResponse;
  createChannel: CreateChannelResponse;
  createDMChannel: CreateChannelResponse;
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


export type MutationCreateDmChannelArgs = {
  channelInput: CreateChannelInput;
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
  getMessage?: Maybe<Message>;
  getMessages?: Maybe<Array<Message>>;
  getTeam?: Maybe<Team>;
  getTeams: Array<Team>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetChannelsArgs = {
  teamId: Scalars['Float'];
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
  newMessage: Message;
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
  owner: User;
  updatedAt: Scalars['String'];
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
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


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'CreateChannelResponse', ok: boolean, channel?: { __typename?: 'Channel', id: number, name: string, isPublic: boolean, isDm: boolean } | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type CreateDmChannelMutationVariables = Exact<{
  createChannelChannelInput: CreateChannelInput;
}>;


export type CreateDmChannelMutation = { __typename?: 'Mutation', createDMChannel: { __typename?: 'CreateChannelResponse', ok: boolean, channel?: { __typename?: 'Channel', id: number, name: string, isPublic: boolean, isDm: boolean } | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type CreateMessageMutationVariables = Exact<{
  createMessageInput: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', text?: string | null | undefined, id: number } };

export type CreateTeamMutationVariables = Exact<{
  createTeamInput: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'CreateTeamResponse', ok: boolean, team?: { __typename?: 'Team', id: number, name: string, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, isDm: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> } | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', ok: boolean, token?: string | null | undefined, refreshToken?: string | null | undefined, errors?: Array<{ __typename?: 'ListError', msg: string, path: string }> | null | undefined } };

export type RegisterMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'CreateUserResponse', ok: boolean, errors?: Array<{ __typename?: 'ListError', path: string, msg: string }> | null | undefined } };

export type GetDirectModalQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetDirectModalQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: number, username: string } | null | undefined, me?: { __typename?: 'User', id: number, username: string, teams?: Array<{ __typename?: 'Team', id: number, name: string, admin: boolean, owner: { __typename?: 'User', username: string }, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, name: string, isDm: boolean }>, members: Array<{ __typename?: 'User', username: string, id: number }> }> | null | undefined } | null | undefined };

export type GetMessagesQueryVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: Array<{ __typename?: 'Message', id: number, text?: string | null | undefined, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string }, file?: { __typename?: 'File', id: number, filename: string, mimetype: string, url: string } | null | undefined }> | null | undefined };

export type GetTeamMembersQueryVariables = Exact<{
  teamId: Scalars['Float'];
}>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeam?: { __typename?: 'Team', members: Array<{ __typename?: 'User', username: string, id: number }> } | null | undefined };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', getTeams: Array<{ __typename?: 'Team', id: number, name: string, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, isDm: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, teams?: Array<{ __typename?: 'Team', id: number, name: string, admin: boolean, owner: { __typename?: 'User', username: string }, channels: Array<{ __typename?: 'Channel', id: number, isPublic: boolean, isDm: boolean, name: string }>, members: Array<{ __typename?: 'User', username: string, id: number }> }> | null | undefined } | null | undefined };

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, text?: string | null | undefined, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: number, username: string }, file?: { __typename?: 'File', id: number, filename: string, mimetype: string, url: string } | null | undefined } };


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
      isDm
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
export const CreateDmChannelDocument = gql`
    mutation createDMChannel($createChannelChannelInput: CreateChannelInput!) {
  createDMChannel(channelInput: $createChannelChannelInput) {
    ok
    channel {
      id
      name
      isPublic
      isDm
    }
    errors {
      msg
      path
    }
  }
}
    `;
export type CreateDmChannelMutationFn = Apollo.MutationFunction<CreateDmChannelMutation, CreateDmChannelMutationVariables>;

/**
 * __useCreateDmChannelMutation__
 *
 * To run a mutation, you first call `useCreateDmChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDmChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDmChannelMutation, { data, loading, error }] = useCreateDmChannelMutation({
 *   variables: {
 *      createChannelChannelInput: // value for 'createChannelChannelInput'
 *   },
 * });
 */
export function useCreateDmChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateDmChannelMutation, CreateDmChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDmChannelMutation, CreateDmChannelMutationVariables>(CreateDmChannelDocument, options);
      }
export type CreateDmChannelMutationHookResult = ReturnType<typeof useCreateDmChannelMutation>;
export type CreateDmChannelMutationResult = Apollo.MutationResult<CreateDmChannelMutation>;
export type CreateDmChannelMutationOptions = Apollo.BaseMutationOptions<CreateDmChannelMutation, CreateDmChannelMutationVariables>;
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
        isDm
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
export const GetDirectModalDocument = gql`
    query getDirectModal($userId: Float!) {
  getUser(userId: $userId) {
    id
    username
  }
  me {
    id
    username
    teams {
      id
      name
      admin
      owner {
        username
      }
      channels {
        id
        isPublic
        name
        isDm
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
 * __useGetDirectModalQuery__
 *
 * To run a query within a React component, call `useGetDirectModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDirectModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDirectModalQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetDirectModalQuery(baseOptions: Apollo.QueryHookOptions<GetDirectModalQuery, GetDirectModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDirectModalQuery, GetDirectModalQueryVariables>(GetDirectModalDocument, options);
      }
export function useGetDirectModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDirectModalQuery, GetDirectModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDirectModalQuery, GetDirectModalQueryVariables>(GetDirectModalDocument, options);
        }
export type GetDirectModalQueryHookResult = ReturnType<typeof useGetDirectModalQuery>;
export type GetDirectModalLazyQueryHookResult = ReturnType<typeof useGetDirectModalLazyQuery>;
export type GetDirectModalQueryResult = Apollo.QueryResult<GetDirectModalQuery, GetDirectModalQueryVariables>;
export const GetMessagesDocument = gql`
    query getMessages($channelId: Float!) {
  getMessages(channelId: $channelId) {
    id
    text
    user {
      id
      username
    }
    file {
      id
      filename
      mimetype
      url
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
      isDm
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
      owner {
        username
      }
      channels {
        id
        isPublic
        isDm
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
export const NewMessageDocument = gql`
    subscription newMessage($channelId: Float!) {
  newMessage(channelId: $channelId) {
    id
    text
    user {
      id
      username
    }
    file {
      id
      filename
      mimetype
      url
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