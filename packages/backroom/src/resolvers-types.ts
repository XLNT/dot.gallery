import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { BackroomContext } from './types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Json: any,
};

export type Asset = {
  __typename?: 'Asset',
  id: Scalars['ID'],
  uri: Scalars['String'],
  owner: Entity,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type CounterfactualToken = {
  __typename?: 'CounterfactualToken',
  id: Scalars['ID'],
  tokenURI: Scalars['String'],
  owner: Entity,
  placement: Placement,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type Entity = {
  __typename?: 'Entity',
  id: Scalars['ID'],
  handle?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  assets: Array<Asset>,
  counterfactualTokens: Array<CounterfactualToken>,
  placements: Array<Placement>,
  tickets: Array<Ticket>,
  availableTicket?: Maybe<Ticket>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Exhibition = {
  __typename?: 'Exhibition',
  id: Scalars['ID'],
  title: Scalars['String'],
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent: Scalars['Int'],
  shows?: Maybe<Array<Show>>,
  rooms?: Maybe<Array<Room>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  ticketsAvailable: Scalars['Int'],
  currentTicketPrice: Scalars['Int'],
};


export type Mutation = {
  __typename?: 'Mutation',
  loginAs: Scalars['String'],
  placeAsset?: Maybe<Placement>,
  createEntity: Entity,
  createAsset: Asset,
  redeemTicket: Ticket,
  modIssueTicket?: Maybe<Ticket>,
};


export type MutationLoginAsArgs = {
  accessToken: Scalars['String']
};


export type MutationPlaceAssetArgs = {
  assetId: Scalars['ID'],
  roomId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int']
};


export type MutationCreateAssetArgs = {
  ownerId: Scalars['ID'],
  uri: Scalars['String']
};


export type MutationModIssueTicketArgs = {
  exhibitionId: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};

export type Placement = {
  __typename?: 'Placement',
  id: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  entity: Entity,
  room: Room,
  counterfactualToken: CounterfactualToken,
  createdAt: Scalars['DateTime'],
};

export type Query = {
  __typename?: 'Query',
  currentEntity: Entity,
  currentExhibition?: Maybe<Exhibition>,
  entity: Entity,
};


export type QueryEntityArgs = {
  id: Scalars['ID']
};

export type Room = {
  __typename?: 'Room',
  id: Scalars['ID'],
  entryId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  exhibition: Exhibition,
  placements: Array<Placement>,
};

export type Show = {
  __typename?: 'Show',
  id: Scalars['ID'],
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  exhibition: Exhibition,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Ticket = {
  __typename?: 'Ticket',
  id: Scalars['ID'],
  redeemed: Scalars['Boolean'],
  exhibition: Exhibition,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
) => Maybe<TTypes>;

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
  Query: ResolverTypeWrapper<{}>,
  Entity: ResolverTypeWrapper<Partial<Entity>>,
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Asset: ResolverTypeWrapper<Partial<Asset>>,
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']>>,
  CounterfactualToken: ResolverTypeWrapper<Partial<CounterfactualToken>>,
  Placement: ResolverTypeWrapper<Partial<Placement>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  Room: ResolverTypeWrapper<Partial<Room>>,
  Exhibition: ResolverTypeWrapper<Partial<Exhibition>>,
  Json: ResolverTypeWrapper<Partial<Scalars['Json']>>,
  Show: ResolverTypeWrapper<Partial<Show>>,
  Ticket: ResolverTypeWrapper<Partial<Ticket>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Entity: Partial<Entity>,
  ID: Partial<Scalars['ID']>,
  String: Partial<Scalars['String']>,
  Asset: Partial<Asset>,
  DateTime: Partial<Scalars['DateTime']>,
  CounterfactualToken: Partial<CounterfactualToken>,
  Placement: Partial<Placement>,
  Int: Partial<Scalars['Int']>,
  Room: Partial<Room>,
  Exhibition: Partial<Exhibition>,
  Json: Partial<Scalars['Json']>,
  Show: Partial<Show>,
  Ticket: Partial<Ticket>,
  Boolean: Partial<Scalars['Boolean']>,
  Mutation: {},
};

export type AssetResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type CounterfactualTokenResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['CounterfactualToken'] = ResolversParentTypes['CounterfactualToken']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  tokenURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  placement?: Resolver<ResolversTypes['Placement'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type EntityResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  assets?: Resolver<Array<ResolversTypes['Asset']>, ParentType, ContextType>,
  counterfactualTokens?: Resolver<Array<ResolversTypes['CounterfactualToken']>, ParentType, ContextType>,
  placements?: Resolver<Array<ResolversTypes['Placement']>, ParentType, ContextType>,
  tickets?: Resolver<Array<ResolversTypes['Ticket']>, ParentType, ContextType>,
  availableTicket?: Resolver<Maybe<ResolversTypes['Ticket']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type ExhibitionResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Exhibition'] = ResolversParentTypes['Exhibition']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  theme?: Resolver<Maybe<ResolversTypes['Json']>, ParentType, ContextType>,
  extent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  shows?: Resolver<Maybe<Array<ResolversTypes['Show']>>, ParentType, ContextType>,
  rooms?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  ticketsAvailable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  currentTicketPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Json'], any> {
  name: 'Json'
}

export type MutationResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  loginAs?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginAsArgs, 'accessToken'>>,
  placeAsset?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType, RequireFields<MutationPlaceAssetArgs, 'assetId' | 'roomId' | 'x' | 'y'>>,
  createEntity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  createAsset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType, RequireFields<MutationCreateAssetArgs, 'ownerId' | 'uri'>>,
  redeemTicket?: Resolver<ResolversTypes['Ticket'], ParentType, ContextType>,
  modIssueTicket?: Resolver<Maybe<ResolversTypes['Ticket']>, ParentType, ContextType, RequireFields<MutationModIssueTicketArgs, 'exhibitionId'>>,
};

export type PlacementResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Placement'] = ResolversParentTypes['Placement']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  x?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  y?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>,
  counterfactualToken?: Resolver<ResolversTypes['CounterfactualToken'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentEntity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  currentExhibition?: Resolver<Maybe<ResolversTypes['Exhibition']>, ParentType, ContextType>,
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType, RequireFields<QueryEntityArgs, 'id'>>,
};

export type RoomResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  entryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  x?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  y?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  exhibition?: Resolver<ResolversTypes['Exhibition'], ParentType, ContextType>,
  placements?: Resolver<Array<ResolversTypes['Placement']>, ParentType, ContextType>,
};

export type ShowResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Show'] = ResolversParentTypes['Show']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  opensAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  closesAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  exhibition?: Resolver<ResolversTypes['Exhibition'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type TicketResolvers<ContextType = BackroomContext, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  redeemed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  exhibition?: Resolver<ResolversTypes['Exhibition'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type Resolvers<ContextType = BackroomContext> = {
  Asset?: AssetResolvers<ContextType>,
  CounterfactualToken?: CounterfactualTokenResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Entity?: EntityResolvers<ContextType>,
  Exhibition?: ExhibitionResolvers<ContextType>,
  Json?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Placement?: PlacementResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  Show?: ShowResolvers<ContextType>,
  Ticket?: TicketResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = BackroomContext> = Resolvers<ContextType>;
