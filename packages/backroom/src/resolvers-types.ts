import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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


export type Entity = {
  __typename?: 'Entity',
  id: Scalars['ID'],
  handle?: Maybe<Scalars['String']>,
  ownedAssets?: Maybe<Array<Asset>>,
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
};


export type Mutation = {
  __typename?: 'Mutation',
  createEntity: Entity,
  createAsset: Asset,
};


export type MutationCreateAssetArgs = {
  ownerId: Scalars['ID'],
  uri: Scalars['String']
};

export type Query = {
  __typename?: 'Query',
  entity: Entity,
  currentExhibition?: Maybe<Exhibition>,
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
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Entity: ResolverTypeWrapper<Entity>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Asset: ResolverTypeWrapper<Asset>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Exhibition: ResolverTypeWrapper<Exhibition>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Json: ResolverTypeWrapper<Scalars['Json']>,
  Show: ResolverTypeWrapper<Show>,
  Room: ResolverTypeWrapper<Room>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Entity: Entity,
  String: Scalars['String'],
  Asset: Asset,
  DateTime: Scalars['DateTime'],
  Exhibition: Exhibition,
  Int: Scalars['Int'],
  Json: Scalars['Json'],
  Show: Show,
  Room: Room,
  Mutation: {},
  Boolean: Scalars['Boolean'],
};

export type AssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type EntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ownedAssets?: Resolver<Maybe<Array<ResolversTypes['Asset']>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type ExhibitionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exhibition'] = ResolversParentTypes['Exhibition']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  theme?: Resolver<Maybe<ResolversTypes['Json']>, ParentType, ContextType>,
  extent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  shows?: Resolver<Maybe<Array<ResolversTypes['Show']>>, ParentType, ContextType>,
  rooms?: Resolver<Maybe<Array<ResolversTypes['Room']>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Json'], any> {
  name: 'Json'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEntity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>,
  createAsset?: Resolver<ResolversTypes['Asset'], ParentType, ContextType, RequireFields<MutationCreateAssetArgs, 'ownerId' | 'uri'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType, RequireFields<QueryEntityArgs, 'id'>>,
  currentExhibition?: Resolver<Maybe<ResolversTypes['Exhibition']>, ParentType, ContextType>,
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  entryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  x?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  y?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  exhibition?: Resolver<ResolversTypes['Exhibition'], ParentType, ContextType>,
};

export type ShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['Show'] = ResolversParentTypes['Show']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  opensAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  closesAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  exhibition?: Resolver<ResolversTypes['Exhibition'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Asset?: AssetResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Entity?: EntityResolvers<ContextType>,
  Exhibition?: ExhibitionResolvers<ContextType>,
  Json?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  Show?: ShowResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
