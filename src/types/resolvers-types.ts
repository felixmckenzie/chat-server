import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  members: Array<User>;
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CreateChatInput = {
  name?: InputMaybe<Scalars['String']>;
  userIds: Array<Scalars['String']>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  id: Scalars['Int'];
  receiver: User;
  sender: User;
  status: FriendRequestStatus;
};

export enum FriendRequestStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  sender: User;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  createMessage: Message;
  createUser: User;
  removeUsersFromChat: Chat;
  respondToFriendRequest: User;
  sendFriendRequest: FriendRequest;
  setUserOnlineStatus: User;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['Int'];
  senderId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: UserRegisterInput;
};


export type MutationRemoveUsersFromChatArgs = {
  chatId: Scalars['Int'];
  userIds: Array<Scalars['Int']>;
};


export type MutationRespondToFriendRequestArgs = {
  requestId: Scalars['Int'];
  status: FriendRequestStatus;
};


export type MutationSendFriendRequestArgs = {
  clerkId: Scalars['String'];
  contactUserEmail: Scalars['String'];
};


export type MutationSetUserOnlineStatusArgs = {
  clerkId: Scalars['String'];
  isOnline: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  friendRequestsReceivedByUser?: Maybe<Array<Maybe<FriendRequest>>>;
  friendRequestsSentByUser?: Maybe<Array<Maybe<FriendRequest>>>;
  getAllUserChats: Array<Chat>;
  getChatBetweenUsers?: Maybe<Chat>;
  getChatById?: Maybe<Chat>;
  getUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
};


export type QueryFriendRequestsReceivedByUserArgs = {
  clerkId: Scalars['String'];
};


export type QueryFriendRequestsSentByUserArgs = {
  clerkId: Scalars['String'];
};


export type QueryGetAllUserChatsArgs = {
  clerkId: Scalars['String'];
};


export type QueryGetChatBetweenUsersArgs = {
  userIds: Array<Scalars['String']>;
};


export type QueryGetChatByIdArgs = {
  chatId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  clerkId: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Regular = 'REGULAR'
}

export type Subscription = {
  __typename?: 'Subscription';
  messageSent: Message;
  userOnlineStatusChanged: User;
};


export type SubscriptionMessageSentArgs = {
  chatId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  clerkId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  friendOf?: Maybe<Array<Maybe<User>>>;
  friends?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isOnline?: Maybe<Scalars['Boolean']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  receivedRequests?: Maybe<Array<Maybe<FriendRequest>>>;
  sentRequests?: Maybe<Array<Maybe<FriendRequest>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UserRegisterInput = {
  avatar?: InputMaybe<Scalars['String']>;
  clerkId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Chat: ResolverTypeWrapper<Chat>;
  CreateChatInput: CreateChatInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  FriendRequest: ResolverTypeWrapper<FriendRequest>;
  FriendRequestStatus: FriendRequestStatus;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserRegisterInput: UserRegisterInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Chat: Chat;
  CreateChatInput: CreateChatInput;
  DateTime: Scalars['DateTime'];
  FriendRequest: FriendRequest;
  Int: Scalars['Int'];
  Message: Message;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  User: User;
  UserRegisterInput: UserRegisterInput;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FriendRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['FriendRequest'] = ResolversParentTypes['FriendRequest']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  receiver?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FriendRequestStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'chatId' | 'senderId' | 'text'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  removeUsersFromChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationRemoveUsersFromChatArgs, 'chatId' | 'userIds'>>;
  respondToFriendRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRespondToFriendRequestArgs, 'requestId' | 'status'>>;
  sendFriendRequest?: Resolver<ResolversTypes['FriendRequest'], ParentType, ContextType, RequireFields<MutationSendFriendRequestArgs, 'clerkId' | 'contactUserEmail'>>;
  setUserOnlineStatus?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSetUserOnlineStatusArgs, 'clerkId' | 'isOnline'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  friendRequestsReceivedByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>, ParentType, ContextType, RequireFields<QueryFriendRequestsReceivedByUserArgs, 'clerkId'>>;
  friendRequestsSentByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>, ParentType, ContextType, RequireFields<QueryFriendRequestsSentByUserArgs, 'clerkId'>>;
  getAllUserChats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryGetAllUserChatsArgs, 'clerkId'>>;
  getChatBetweenUsers?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryGetChatBetweenUsersArgs, 'userIds'>>;
  getChatById?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryGetChatByIdArgs, 'chatId'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'clerkId'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageSent?: SubscriptionResolver<ResolversTypes['Message'], "messageSent", ParentType, ContextType, RequireFields<SubscriptionMessageSentArgs, 'chatId'>>;
  userOnlineStatusChanged?: SubscriptionResolver<ResolversTypes['User'], "userOnlineStatusChanged", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType>;
  clerkId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friendOf?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isOnline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  receivedRequests?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>, ParentType, ContextType>;
  sentRequests?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Chat?: ChatResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  FriendRequest?: FriendRequestResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

