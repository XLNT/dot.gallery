import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Json: any,
  Long: any,
};

export type AggregateAsset = {
  __typename?: 'AggregateAsset',
  count: Scalars['Int'],
};

export type AggregateEntity = {
  __typename?: 'AggregateEntity',
  count: Scalars['Int'],
};

export type AggregateExhibition = {
  __typename?: 'AggregateExhibition',
  count: Scalars['Int'],
};

export type AggregateIssue = {
  __typename?: 'AggregateIssue',
  count: Scalars['Int'],
};

export type AggregateRoom = {
  __typename?: 'AggregateRoom',
  count: Scalars['Int'],
};

export type AggregateShow = {
  __typename?: 'AggregateShow',
  count: Scalars['Int'],
};

export type Asset = {
  __typename?: 'Asset',
  id: Scalars['ID'],
  isCounterfactual: Scalars['Boolean'],
  owner: Entity,
  issue: Issue,
  printer: Entity,
  rooms?: Maybe<Array<Room>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type AssetRoomsArgs = {
  where?: Maybe<RoomWhereInput>,
  orderBy?: Maybe<RoomOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type AssetConnection = {
  __typename?: 'AssetConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<AssetEdge>>,
  aggregate: AggregateAsset,
};

export type AssetCreateInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: EntityCreateOneWithoutOwnedAssetsInput,
  issue: IssueCreateOneWithoutAssetsInput,
  printer: EntityCreateOneWithoutPrintedAssetsInput,
  rooms?: Maybe<RoomCreateManyWithoutAssetsInput>,
};

export type AssetCreateManyWithoutIssueInput = {
  create?: Maybe<Array<AssetCreateWithoutIssueInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
};

export type AssetCreateManyWithoutOwnerInput = {
  create?: Maybe<Array<AssetCreateWithoutOwnerInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
};

export type AssetCreateManyWithoutPrinterInput = {
  create?: Maybe<Array<AssetCreateWithoutPrinterInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
};

export type AssetCreateManyWithoutRoomsInput = {
  create?: Maybe<Array<AssetCreateWithoutRoomsInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
};

export type AssetCreateWithoutIssueInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: EntityCreateOneWithoutOwnedAssetsInput,
  printer: EntityCreateOneWithoutPrintedAssetsInput,
  rooms?: Maybe<RoomCreateManyWithoutAssetsInput>,
};

export type AssetCreateWithoutOwnerInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  issue: IssueCreateOneWithoutAssetsInput,
  printer: EntityCreateOneWithoutPrintedAssetsInput,
  rooms?: Maybe<RoomCreateManyWithoutAssetsInput>,
};

export type AssetCreateWithoutPrinterInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: EntityCreateOneWithoutOwnedAssetsInput,
  issue: IssueCreateOneWithoutAssetsInput,
  rooms?: Maybe<RoomCreateManyWithoutAssetsInput>,
};

export type AssetCreateWithoutRoomsInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: EntityCreateOneWithoutOwnedAssetsInput,
  issue: IssueCreateOneWithoutAssetsInput,
  printer: EntityCreateOneWithoutPrintedAssetsInput,
};

export type AssetEdge = {
  __typename?: 'AssetEdge',
  node: Asset,
  cursor: Scalars['String'],
};

export enum AssetOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsCounterfactualAsc = 'isCounterfactual_ASC',
  IsCounterfactualDesc = 'isCounterfactual_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AssetPreviousValues = {
  __typename?: 'AssetPreviousValues',
  id: Scalars['ID'],
  isCounterfactual: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type AssetScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  isCounterfactual_not?: Maybe<Scalars['Boolean']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<AssetScalarWhereInput>>,
  OR?: Maybe<Array<AssetScalarWhereInput>>,
  NOT?: Maybe<Array<AssetScalarWhereInput>>,
};

export type AssetSubscriptionPayload = {
  __typename?: 'AssetSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Asset>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<AssetPreviousValues>,
};

export type AssetSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<AssetWhereInput>,
  AND?: Maybe<Array<AssetSubscriptionWhereInput>>,
  OR?: Maybe<Array<AssetSubscriptionWhereInput>>,
  NOT?: Maybe<Array<AssetSubscriptionWhereInput>>,
};

export type AssetUpdateInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<EntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  issue?: Maybe<IssueUpdateOneRequiredWithoutAssetsInput>,
  printer?: Maybe<EntityUpdateOneRequiredWithoutPrintedAssetsInput>,
  rooms?: Maybe<RoomUpdateManyWithoutAssetsInput>,
};

export type AssetUpdateManyDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
};

export type AssetUpdateManyMutationInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
};

export type AssetUpdateManyWithoutIssueInput = {
  create?: Maybe<Array<AssetCreateWithoutIssueInput>>,
  delete?: Maybe<Array<AssetWhereUniqueInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
  set?: Maybe<Array<AssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<AssetWhereUniqueInput>>,
  update?: Maybe<Array<AssetUpdateWithWhereUniqueWithoutIssueInput>>,
  upsert?: Maybe<Array<AssetUpsertWithWhereUniqueWithoutIssueInput>>,
  deleteMany?: Maybe<Array<AssetScalarWhereInput>>,
  updateMany?: Maybe<Array<AssetUpdateManyWithWhereNestedInput>>,
};

export type AssetUpdateManyWithoutOwnerInput = {
  create?: Maybe<Array<AssetCreateWithoutOwnerInput>>,
  delete?: Maybe<Array<AssetWhereUniqueInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
  set?: Maybe<Array<AssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<AssetWhereUniqueInput>>,
  update?: Maybe<Array<AssetUpdateWithWhereUniqueWithoutOwnerInput>>,
  upsert?: Maybe<Array<AssetUpsertWithWhereUniqueWithoutOwnerInput>>,
  deleteMany?: Maybe<Array<AssetScalarWhereInput>>,
  updateMany?: Maybe<Array<AssetUpdateManyWithWhereNestedInput>>,
};

export type AssetUpdateManyWithoutPrinterInput = {
  create?: Maybe<Array<AssetCreateWithoutPrinterInput>>,
  delete?: Maybe<Array<AssetWhereUniqueInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
  set?: Maybe<Array<AssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<AssetWhereUniqueInput>>,
  update?: Maybe<Array<AssetUpdateWithWhereUniqueWithoutPrinterInput>>,
  upsert?: Maybe<Array<AssetUpsertWithWhereUniqueWithoutPrinterInput>>,
  deleteMany?: Maybe<Array<AssetScalarWhereInput>>,
  updateMany?: Maybe<Array<AssetUpdateManyWithWhereNestedInput>>,
};

export type AssetUpdateManyWithoutRoomsInput = {
  create?: Maybe<Array<AssetCreateWithoutRoomsInput>>,
  delete?: Maybe<Array<AssetWhereUniqueInput>>,
  connect?: Maybe<Array<AssetWhereUniqueInput>>,
  set?: Maybe<Array<AssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<AssetWhereUniqueInput>>,
  update?: Maybe<Array<AssetUpdateWithWhereUniqueWithoutRoomsInput>>,
  upsert?: Maybe<Array<AssetUpsertWithWhereUniqueWithoutRoomsInput>>,
  deleteMany?: Maybe<Array<AssetScalarWhereInput>>,
  updateMany?: Maybe<Array<AssetUpdateManyWithWhereNestedInput>>,
};

export type AssetUpdateManyWithWhereNestedInput = {
  where: AssetScalarWhereInput,
  data: AssetUpdateManyDataInput,
};

export type AssetUpdateWithoutIssueDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<EntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  printer?: Maybe<EntityUpdateOneRequiredWithoutPrintedAssetsInput>,
  rooms?: Maybe<RoomUpdateManyWithoutAssetsInput>,
};

export type AssetUpdateWithoutOwnerDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  issue?: Maybe<IssueUpdateOneRequiredWithoutAssetsInput>,
  printer?: Maybe<EntityUpdateOneRequiredWithoutPrintedAssetsInput>,
  rooms?: Maybe<RoomUpdateManyWithoutAssetsInput>,
};

export type AssetUpdateWithoutPrinterDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<EntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  issue?: Maybe<IssueUpdateOneRequiredWithoutAssetsInput>,
  rooms?: Maybe<RoomUpdateManyWithoutAssetsInput>,
};

export type AssetUpdateWithoutRoomsDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<EntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  issue?: Maybe<IssueUpdateOneRequiredWithoutAssetsInput>,
  printer?: Maybe<EntityUpdateOneRequiredWithoutPrintedAssetsInput>,
};

export type AssetUpdateWithWhereUniqueWithoutIssueInput = {
  where: AssetWhereUniqueInput,
  data: AssetUpdateWithoutIssueDataInput,
};

export type AssetUpdateWithWhereUniqueWithoutOwnerInput = {
  where: AssetWhereUniqueInput,
  data: AssetUpdateWithoutOwnerDataInput,
};

export type AssetUpdateWithWhereUniqueWithoutPrinterInput = {
  where: AssetWhereUniqueInput,
  data: AssetUpdateWithoutPrinterDataInput,
};

export type AssetUpdateWithWhereUniqueWithoutRoomsInput = {
  where: AssetWhereUniqueInput,
  data: AssetUpdateWithoutRoomsDataInput,
};

export type AssetUpsertWithWhereUniqueWithoutIssueInput = {
  where: AssetWhereUniqueInput,
  update: AssetUpdateWithoutIssueDataInput,
  create: AssetCreateWithoutIssueInput,
};

export type AssetUpsertWithWhereUniqueWithoutOwnerInput = {
  where: AssetWhereUniqueInput,
  update: AssetUpdateWithoutOwnerDataInput,
  create: AssetCreateWithoutOwnerInput,
};

export type AssetUpsertWithWhereUniqueWithoutPrinterInput = {
  where: AssetWhereUniqueInput,
  update: AssetUpdateWithoutPrinterDataInput,
  create: AssetCreateWithoutPrinterInput,
};

export type AssetUpsertWithWhereUniqueWithoutRoomsInput = {
  where: AssetWhereUniqueInput,
  update: AssetUpdateWithoutRoomsDataInput,
  create: AssetCreateWithoutRoomsInput,
};

export type AssetWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  isCounterfactual_not?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<EntityWhereInput>,
  issue?: Maybe<IssueWhereInput>,
  printer?: Maybe<EntityWhereInput>,
  rooms_every?: Maybe<RoomWhereInput>,
  rooms_some?: Maybe<RoomWhereInput>,
  rooms_none?: Maybe<RoomWhereInput>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<AssetWhereInput>>,
  OR?: Maybe<Array<AssetWhereInput>>,
  NOT?: Maybe<Array<AssetWhereInput>>,
};

export type AssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type BatchPayload = {
  __typename?: 'BatchPayload',
  count: Scalars['Long'],
};


export type Entity = {
  __typename?: 'Entity',
  id: Scalars['ID'],
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<Array<Issue>>,
  ownedAssets?: Maybe<Array<Asset>>,
  printedAssets?: Maybe<Array<Asset>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type EntityCreatedIssuesArgs = {
  where?: Maybe<IssueWhereInput>,
  orderBy?: Maybe<IssueOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type EntityOwnedAssetsArgs = {
  where?: Maybe<AssetWhereInput>,
  orderBy?: Maybe<AssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type EntityPrintedAssetsArgs = {
  where?: Maybe<AssetWhereInput>,
  orderBy?: Maybe<AssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type EntityConnection = {
  __typename?: 'EntityConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<EntityEdge>>,
  aggregate: AggregateEntity,
};

export type EntityCreateInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<IssueCreateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<AssetCreateManyWithoutOwnerInput>,
  printedAssets?: Maybe<AssetCreateManyWithoutPrinterInput>,
};

export type EntityCreateOneWithoutCreatedIssuesInput = {
  create?: Maybe<EntityCreateWithoutCreatedIssuesInput>,
  connect?: Maybe<EntityWhereUniqueInput>,
};

export type EntityCreateOneWithoutOwnedAssetsInput = {
  create?: Maybe<EntityCreateWithoutOwnedAssetsInput>,
  connect?: Maybe<EntityWhereUniqueInput>,
};

export type EntityCreateOneWithoutPrintedAssetsInput = {
  create?: Maybe<EntityCreateWithoutPrintedAssetsInput>,
  connect?: Maybe<EntityWhereUniqueInput>,
};

export type EntityCreateWithoutCreatedIssuesInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  ownedAssets?: Maybe<AssetCreateManyWithoutOwnerInput>,
  printedAssets?: Maybe<AssetCreateManyWithoutPrinterInput>,
};

export type EntityCreateWithoutOwnedAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<IssueCreateManyWithoutCreatorInput>,
  printedAssets?: Maybe<AssetCreateManyWithoutPrinterInput>,
};

export type EntityCreateWithoutPrintedAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<IssueCreateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<AssetCreateManyWithoutOwnerInput>,
};

export type EntityEdge = {
  __typename?: 'EntityEdge',
  node: Entity,
  cursor: Scalars['String'],
};

export enum EntityOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type EntityPreviousValues = {
  __typename?: 'EntityPreviousValues',
  id: Scalars['ID'],
  handle: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type EntitySubscriptionPayload = {
  __typename?: 'EntitySubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Entity>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<EntityPreviousValues>,
};

export type EntitySubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<EntityWhereInput>,
  AND?: Maybe<Array<EntitySubscriptionWhereInput>>,
  OR?: Maybe<Array<EntitySubscriptionWhereInput>>,
  NOT?: Maybe<Array<EntitySubscriptionWhereInput>>,
};

export type EntityUpdateInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdIssues?: Maybe<IssueUpdateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<AssetUpdateManyWithoutOwnerInput>,
  printedAssets?: Maybe<AssetUpdateManyWithoutPrinterInput>,
};

export type EntityUpdateManyMutationInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type EntityUpdateOneRequiredWithoutCreatedIssuesInput = {
  create?: Maybe<EntityCreateWithoutCreatedIssuesInput>,
  update?: Maybe<EntityUpdateWithoutCreatedIssuesDataInput>,
  upsert?: Maybe<EntityUpsertWithoutCreatedIssuesInput>,
  connect?: Maybe<EntityWhereUniqueInput>,
};

export type EntityUpdateOneRequiredWithoutOwnedAssetsInput = {
  create?: Maybe<EntityCreateWithoutOwnedAssetsInput>,
  update?: Maybe<EntityUpdateWithoutOwnedAssetsDataInput>,
  upsert?: Maybe<EntityUpsertWithoutOwnedAssetsInput>,
  connect?: Maybe<EntityWhereUniqueInput>,
};

export type EntityUpdateOneRequiredWithoutPrintedAssetsInput = {
  create?: Maybe<EntityCreateWithoutPrintedAssetsInput>,
  update?: Maybe<EntityUpdateWithoutPrintedAssetsDataInput>,
  upsert?: Maybe<EntityUpsertWithoutPrintedAssetsInput>,
  connect?: Maybe<EntityWhereUniqueInput>,
};

export type EntityUpdateWithoutCreatedIssuesDataInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  ownedAssets?: Maybe<AssetUpdateManyWithoutOwnerInput>,
  printedAssets?: Maybe<AssetUpdateManyWithoutPrinterInput>,
};

export type EntityUpdateWithoutOwnedAssetsDataInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdIssues?: Maybe<IssueUpdateManyWithoutCreatorInput>,
  printedAssets?: Maybe<AssetUpdateManyWithoutPrinterInput>,
};

export type EntityUpdateWithoutPrintedAssetsDataInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdIssues?: Maybe<IssueUpdateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<AssetUpdateManyWithoutOwnerInput>,
};

export type EntityUpsertWithoutCreatedIssuesInput = {
  update: EntityUpdateWithoutCreatedIssuesDataInput,
  create: EntityCreateWithoutCreatedIssuesInput,
};

export type EntityUpsertWithoutOwnedAssetsInput = {
  update: EntityUpdateWithoutOwnedAssetsDataInput,
  create: EntityCreateWithoutOwnedAssetsInput,
};

export type EntityUpsertWithoutPrintedAssetsInput = {
  update: EntityUpdateWithoutPrintedAssetsDataInput,
  create: EntityCreateWithoutPrintedAssetsInput,
};

export type EntityWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  handle?: Maybe<Scalars['String']>,
  handle_not?: Maybe<Scalars['String']>,
  handle_in?: Maybe<Array<Scalars['String']>>,
  handle_not_in?: Maybe<Array<Scalars['String']>>,
  handle_lt?: Maybe<Scalars['String']>,
  handle_lte?: Maybe<Scalars['String']>,
  handle_gt?: Maybe<Scalars['String']>,
  handle_gte?: Maybe<Scalars['String']>,
  handle_contains?: Maybe<Scalars['String']>,
  handle_not_contains?: Maybe<Scalars['String']>,
  handle_starts_with?: Maybe<Scalars['String']>,
  handle_not_starts_with?: Maybe<Scalars['String']>,
  handle_ends_with?: Maybe<Scalars['String']>,
  handle_not_ends_with?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  email_not?: Maybe<Scalars['String']>,
  email_in?: Maybe<Array<Scalars['String']>>,
  email_not_in?: Maybe<Array<Scalars['String']>>,
  email_lt?: Maybe<Scalars['String']>,
  email_lte?: Maybe<Scalars['String']>,
  email_gt?: Maybe<Scalars['String']>,
  email_gte?: Maybe<Scalars['String']>,
  email_contains?: Maybe<Scalars['String']>,
  email_not_contains?: Maybe<Scalars['String']>,
  email_starts_with?: Maybe<Scalars['String']>,
  email_not_starts_with?: Maybe<Scalars['String']>,
  email_ends_with?: Maybe<Scalars['String']>,
  email_not_ends_with?: Maybe<Scalars['String']>,
  createdIssues_every?: Maybe<IssueWhereInput>,
  createdIssues_some?: Maybe<IssueWhereInput>,
  createdIssues_none?: Maybe<IssueWhereInput>,
  ownedAssets_every?: Maybe<AssetWhereInput>,
  ownedAssets_some?: Maybe<AssetWhereInput>,
  ownedAssets_none?: Maybe<AssetWhereInput>,
  printedAssets_every?: Maybe<AssetWhereInput>,
  printedAssets_some?: Maybe<AssetWhereInput>,
  printedAssets_none?: Maybe<AssetWhereInput>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<EntityWhereInput>>,
  OR?: Maybe<Array<EntityWhereInput>>,
  NOT?: Maybe<Array<EntityWhereInput>>,
};

export type EntityWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type Exhibition = {
  __typename?: 'Exhibition',
  id: Scalars['ID'],
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  shows?: Maybe<Array<Show>>,
  rooms?: Maybe<Array<Room>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type ExhibitionShowsArgs = {
  where?: Maybe<ShowWhereInput>,
  orderBy?: Maybe<ShowOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type ExhibitionRoomsArgs = {
  where?: Maybe<RoomWhereInput>,
  orderBy?: Maybe<RoomOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type ExhibitionConnection = {
  __typename?: 'ExhibitionConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<ExhibitionEdge>>,
  aggregate: AggregateExhibition,
};

export type ExhibitionCreateInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  shows?: Maybe<ShowCreateManyWithoutExhibitionInput>,
  rooms?: Maybe<RoomCreateManyWithoutExhibitionInput>,
};

export type ExhibitionCreateOneWithoutRoomsInput = {
  create?: Maybe<ExhibitionCreateWithoutRoomsInput>,
  connect?: Maybe<ExhibitionWhereUniqueInput>,
};

export type ExhibitionCreateOneWithoutShowsInput = {
  create?: Maybe<ExhibitionCreateWithoutShowsInput>,
  connect?: Maybe<ExhibitionWhereUniqueInput>,
};

export type ExhibitionCreateWithoutRoomsInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  shows?: Maybe<ShowCreateManyWithoutExhibitionInput>,
};

export type ExhibitionCreateWithoutShowsInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  rooms?: Maybe<RoomCreateManyWithoutExhibitionInput>,
};

export type ExhibitionEdge = {
  __typename?: 'ExhibitionEdge',
  node: Exhibition,
  cursor: Scalars['String'],
};

export enum ExhibitionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NumberAsc = 'number_ASC',
  NumberDesc = 'number_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  ExtentAsc = 'extent_ASC',
  ExtentDesc = 'extent_DESC',
  OpensAtAsc = 'opensAt_ASC',
  OpensAtDesc = 'opensAt_DESC',
  ClosesAtAsc = 'closesAt_ASC',
  ClosesAtDesc = 'closesAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ExhibitionPreviousValues = {
  __typename?: 'ExhibitionPreviousValues',
  id: Scalars['ID'],
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type ExhibitionSubscriptionPayload = {
  __typename?: 'ExhibitionSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Exhibition>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<ExhibitionPreviousValues>,
};

export type ExhibitionSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<ExhibitionWhereInput>,
  AND?: Maybe<Array<ExhibitionSubscriptionWhereInput>>,
  OR?: Maybe<Array<ExhibitionSubscriptionWhereInput>>,
  NOT?: Maybe<Array<ExhibitionSubscriptionWhereInput>>,
};

export type ExhibitionUpdateInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  shows?: Maybe<ShowUpdateManyWithoutExhibitionInput>,
  rooms?: Maybe<RoomUpdateManyWithoutExhibitionInput>,
};

export type ExhibitionUpdateManyMutationInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type ExhibitionUpdateOneRequiredWithoutRoomsInput = {
  create?: Maybe<ExhibitionCreateWithoutRoomsInput>,
  update?: Maybe<ExhibitionUpdateWithoutRoomsDataInput>,
  upsert?: Maybe<ExhibitionUpsertWithoutRoomsInput>,
  connect?: Maybe<ExhibitionWhereUniqueInput>,
};

export type ExhibitionUpdateOneRequiredWithoutShowsInput = {
  create?: Maybe<ExhibitionCreateWithoutShowsInput>,
  update?: Maybe<ExhibitionUpdateWithoutShowsDataInput>,
  upsert?: Maybe<ExhibitionUpsertWithoutShowsInput>,
  connect?: Maybe<ExhibitionWhereUniqueInput>,
};

export type ExhibitionUpdateWithoutRoomsDataInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  shows?: Maybe<ShowUpdateManyWithoutExhibitionInput>,
};

export type ExhibitionUpdateWithoutShowsDataInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  rooms?: Maybe<RoomUpdateManyWithoutExhibitionInput>,
};

export type ExhibitionUpsertWithoutRoomsInput = {
  update: ExhibitionUpdateWithoutRoomsDataInput,
  create: ExhibitionCreateWithoutRoomsInput,
};

export type ExhibitionUpsertWithoutShowsInput = {
  update: ExhibitionUpdateWithoutShowsDataInput,
  create: ExhibitionCreateWithoutShowsInput,
};

export type ExhibitionWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  number?: Maybe<Scalars['Int']>,
  number_not?: Maybe<Scalars['Int']>,
  number_in?: Maybe<Array<Scalars['Int']>>,
  number_not_in?: Maybe<Array<Scalars['Int']>>,
  number_lt?: Maybe<Scalars['Int']>,
  number_lte?: Maybe<Scalars['Int']>,
  number_gt?: Maybe<Scalars['Int']>,
  number_gte?: Maybe<Scalars['Int']>,
  extent?: Maybe<Scalars['Int']>,
  extent_not?: Maybe<Scalars['Int']>,
  extent_in?: Maybe<Array<Scalars['Int']>>,
  extent_not_in?: Maybe<Array<Scalars['Int']>>,
  extent_lt?: Maybe<Scalars['Int']>,
  extent_lte?: Maybe<Scalars['Int']>,
  extent_gt?: Maybe<Scalars['Int']>,
  extent_gte?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  opensAt_not?: Maybe<Scalars['DateTime']>,
  opensAt_in?: Maybe<Array<Scalars['DateTime']>>,
  opensAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  opensAt_lt?: Maybe<Scalars['DateTime']>,
  opensAt_lte?: Maybe<Scalars['DateTime']>,
  opensAt_gt?: Maybe<Scalars['DateTime']>,
  opensAt_gte?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  closesAt_not?: Maybe<Scalars['DateTime']>,
  closesAt_in?: Maybe<Array<Scalars['DateTime']>>,
  closesAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  closesAt_lt?: Maybe<Scalars['DateTime']>,
  closesAt_lte?: Maybe<Scalars['DateTime']>,
  closesAt_gt?: Maybe<Scalars['DateTime']>,
  closesAt_gte?: Maybe<Scalars['DateTime']>,
  shows_every?: Maybe<ShowWhereInput>,
  shows_some?: Maybe<ShowWhereInput>,
  shows_none?: Maybe<ShowWhereInput>,
  rooms_every?: Maybe<RoomWhereInput>,
  rooms_some?: Maybe<RoomWhereInput>,
  rooms_none?: Maybe<RoomWhereInput>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<ExhibitionWhereInput>>,
  OR?: Maybe<Array<ExhibitionWhereInput>>,
  NOT?: Maybe<Array<ExhibitionWhereInput>>,
};

export type ExhibitionWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  number?: Maybe<Scalars['Int']>,
};

export type Issue = {
  __typename?: 'Issue',
  id: Scalars['ID'],
  uri: Scalars['String'],
  rarity: Rarity,
  emojis: Array<Scalars['String']>,
  creator: Entity,
  assets?: Maybe<Array<Asset>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type IssueAssetsArgs = {
  where?: Maybe<AssetWhereInput>,
  orderBy?: Maybe<AssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type IssueConnection = {
  __typename?: 'IssueConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<IssueEdge>>,
  aggregate: AggregateIssue,
};

export type IssueCreateemojisInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type IssueCreateInput = {
  id?: Maybe<Scalars['ID']>,
  uri: Scalars['String'],
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueCreateemojisInput>,
  creator: EntityCreateOneWithoutCreatedIssuesInput,
  assets?: Maybe<AssetCreateManyWithoutIssueInput>,
};

export type IssueCreateManyWithoutCreatorInput = {
  create?: Maybe<Array<IssueCreateWithoutCreatorInput>>,
  connect?: Maybe<Array<IssueWhereUniqueInput>>,
};

export type IssueCreateOneWithoutAssetsInput = {
  create?: Maybe<IssueCreateWithoutAssetsInput>,
  connect?: Maybe<IssueWhereUniqueInput>,
};

export type IssueCreateWithoutAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  uri: Scalars['String'],
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueCreateemojisInput>,
  creator: EntityCreateOneWithoutCreatedIssuesInput,
};

export type IssueCreateWithoutCreatorInput = {
  id?: Maybe<Scalars['ID']>,
  uri: Scalars['String'],
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueCreateemojisInput>,
  assets?: Maybe<AssetCreateManyWithoutIssueInput>,
};

export type IssueEdge = {
  __typename?: 'IssueEdge',
  node: Issue,
  cursor: Scalars['String'],
};

export enum IssueOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UriAsc = 'uri_ASC',
  UriDesc = 'uri_DESC',
  RarityAsc = 'rarity_ASC',
  RarityDesc = 'rarity_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type IssuePreviousValues = {
  __typename?: 'IssuePreviousValues',
  id: Scalars['ID'],
  uri: Scalars['String'],
  rarity: Rarity,
  emojis: Array<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type IssueScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  uri?: Maybe<Scalars['String']>,
  uri_not?: Maybe<Scalars['String']>,
  uri_in?: Maybe<Array<Scalars['String']>>,
  uri_not_in?: Maybe<Array<Scalars['String']>>,
  uri_lt?: Maybe<Scalars['String']>,
  uri_lte?: Maybe<Scalars['String']>,
  uri_gt?: Maybe<Scalars['String']>,
  uri_gte?: Maybe<Scalars['String']>,
  uri_contains?: Maybe<Scalars['String']>,
  uri_not_contains?: Maybe<Scalars['String']>,
  uri_starts_with?: Maybe<Scalars['String']>,
  uri_not_starts_with?: Maybe<Scalars['String']>,
  uri_ends_with?: Maybe<Scalars['String']>,
  uri_not_ends_with?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  rarity_not?: Maybe<Rarity>,
  rarity_in?: Maybe<Array<Rarity>>,
  rarity_not_in?: Maybe<Array<Rarity>>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<IssueScalarWhereInput>>,
  OR?: Maybe<Array<IssueScalarWhereInput>>,
  NOT?: Maybe<Array<IssueScalarWhereInput>>,
};

export type IssueSubscriptionPayload = {
  __typename?: 'IssueSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Issue>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IssuePreviousValues>,
};

export type IssueSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IssueWhereInput>,
  AND?: Maybe<Array<IssueSubscriptionWhereInput>>,
  OR?: Maybe<Array<IssueSubscriptionWhereInput>>,
  NOT?: Maybe<Array<IssueSubscriptionWhereInput>>,
};

export type IssueUpdateemojisInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type IssueUpdateInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueUpdateemojisInput>,
  creator?: Maybe<EntityUpdateOneRequiredWithoutCreatedIssuesInput>,
  assets?: Maybe<AssetUpdateManyWithoutIssueInput>,
};

export type IssueUpdateManyDataInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueUpdateemojisInput>,
};

export type IssueUpdateManyMutationInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueUpdateemojisInput>,
};

export type IssueUpdateManyWithoutCreatorInput = {
  create?: Maybe<Array<IssueCreateWithoutCreatorInput>>,
  delete?: Maybe<Array<IssueWhereUniqueInput>>,
  connect?: Maybe<Array<IssueWhereUniqueInput>>,
  set?: Maybe<Array<IssueWhereUniqueInput>>,
  disconnect?: Maybe<Array<IssueWhereUniqueInput>>,
  update?: Maybe<Array<IssueUpdateWithWhereUniqueWithoutCreatorInput>>,
  upsert?: Maybe<Array<IssueUpsertWithWhereUniqueWithoutCreatorInput>>,
  deleteMany?: Maybe<Array<IssueScalarWhereInput>>,
  updateMany?: Maybe<Array<IssueUpdateManyWithWhereNestedInput>>,
};

export type IssueUpdateManyWithWhereNestedInput = {
  where: IssueScalarWhereInput,
  data: IssueUpdateManyDataInput,
};

export type IssueUpdateOneRequiredWithoutAssetsInput = {
  create?: Maybe<IssueCreateWithoutAssetsInput>,
  update?: Maybe<IssueUpdateWithoutAssetsDataInput>,
  upsert?: Maybe<IssueUpsertWithoutAssetsInput>,
  connect?: Maybe<IssueWhereUniqueInput>,
};

export type IssueUpdateWithoutAssetsDataInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueUpdateemojisInput>,
  creator?: Maybe<EntityUpdateOneRequiredWithoutCreatedIssuesInput>,
};

export type IssueUpdateWithoutCreatorDataInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  emojis?: Maybe<IssueUpdateemojisInput>,
  assets?: Maybe<AssetUpdateManyWithoutIssueInput>,
};

export type IssueUpdateWithWhereUniqueWithoutCreatorInput = {
  where: IssueWhereUniqueInput,
  data: IssueUpdateWithoutCreatorDataInput,
};

export type IssueUpsertWithoutAssetsInput = {
  update: IssueUpdateWithoutAssetsDataInput,
  create: IssueCreateWithoutAssetsInput,
};

export type IssueUpsertWithWhereUniqueWithoutCreatorInput = {
  where: IssueWhereUniqueInput,
  update: IssueUpdateWithoutCreatorDataInput,
  create: IssueCreateWithoutCreatorInput,
};

export type IssueWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  uri?: Maybe<Scalars['String']>,
  uri_not?: Maybe<Scalars['String']>,
  uri_in?: Maybe<Array<Scalars['String']>>,
  uri_not_in?: Maybe<Array<Scalars['String']>>,
  uri_lt?: Maybe<Scalars['String']>,
  uri_lte?: Maybe<Scalars['String']>,
  uri_gt?: Maybe<Scalars['String']>,
  uri_gte?: Maybe<Scalars['String']>,
  uri_contains?: Maybe<Scalars['String']>,
  uri_not_contains?: Maybe<Scalars['String']>,
  uri_starts_with?: Maybe<Scalars['String']>,
  uri_not_starts_with?: Maybe<Scalars['String']>,
  uri_ends_with?: Maybe<Scalars['String']>,
  uri_not_ends_with?: Maybe<Scalars['String']>,
  rarity?: Maybe<Rarity>,
  rarity_not?: Maybe<Rarity>,
  rarity_in?: Maybe<Array<Rarity>>,
  rarity_not_in?: Maybe<Array<Rarity>>,
  creator?: Maybe<EntityWhereInput>,
  assets_every?: Maybe<AssetWhereInput>,
  assets_some?: Maybe<AssetWhereInput>,
  assets_none?: Maybe<AssetWhereInput>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<IssueWhereInput>>,
  OR?: Maybe<Array<IssueWhereInput>>,
  NOT?: Maybe<Array<IssueWhereInput>>,
};

export type IssueWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};



export type Mutation = {
  __typename?: 'Mutation',
  createAsset: Asset,
  updateAsset?: Maybe<Asset>,
  updateManyAssets: BatchPayload,
  upsertAsset: Asset,
  deleteAsset?: Maybe<Asset>,
  deleteManyAssets: BatchPayload,
  createEntity: Entity,
  updateEntity?: Maybe<Entity>,
  updateManyEntities: BatchPayload,
  upsertEntity: Entity,
  deleteEntity?: Maybe<Entity>,
  deleteManyEntities: BatchPayload,
  createExhibition: Exhibition,
  updateExhibition?: Maybe<Exhibition>,
  updateManyExhibitions: BatchPayload,
  upsertExhibition: Exhibition,
  deleteExhibition?: Maybe<Exhibition>,
  deleteManyExhibitions: BatchPayload,
  createIssue: Issue,
  updateIssue?: Maybe<Issue>,
  updateManyIssues: BatchPayload,
  upsertIssue: Issue,
  deleteIssue?: Maybe<Issue>,
  deleteManyIssues: BatchPayload,
  createRoom: Room,
  updateRoom?: Maybe<Room>,
  updateManyRooms: BatchPayload,
  upsertRoom: Room,
  deleteRoom?: Maybe<Room>,
  deleteManyRooms: BatchPayload,
  createShow: Show,
  updateShow?: Maybe<Show>,
  updateManyShows: BatchPayload,
  upsertShow: Show,
  deleteShow?: Maybe<Show>,
  deleteManyShows: BatchPayload,
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput,
  where: AssetWhereUniqueInput
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyMutationInput,
  where?: Maybe<AssetWhereInput>
};


export type MutationUpsertAssetArgs = {
  where: AssetWhereUniqueInput,
  create: AssetCreateInput,
  update: AssetUpdateInput
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput
};


export type MutationDeleteManyAssetsArgs = {
  where?: Maybe<AssetWhereInput>
};


export type MutationCreateEntityArgs = {
  data: EntityCreateInput
};


export type MutationUpdateEntityArgs = {
  data: EntityUpdateInput,
  where: EntityWhereUniqueInput
};


export type MutationUpdateManyEntitiesArgs = {
  data: EntityUpdateManyMutationInput,
  where?: Maybe<EntityWhereInput>
};


export type MutationUpsertEntityArgs = {
  where: EntityWhereUniqueInput,
  create: EntityCreateInput,
  update: EntityUpdateInput
};


export type MutationDeleteEntityArgs = {
  where: EntityWhereUniqueInput
};


export type MutationDeleteManyEntitiesArgs = {
  where?: Maybe<EntityWhereInput>
};


export type MutationCreateExhibitionArgs = {
  data: ExhibitionCreateInput
};


export type MutationUpdateExhibitionArgs = {
  data: ExhibitionUpdateInput,
  where: ExhibitionWhereUniqueInput
};


export type MutationUpdateManyExhibitionsArgs = {
  data: ExhibitionUpdateManyMutationInput,
  where?: Maybe<ExhibitionWhereInput>
};


export type MutationUpsertExhibitionArgs = {
  where: ExhibitionWhereUniqueInput,
  create: ExhibitionCreateInput,
  update: ExhibitionUpdateInput
};


export type MutationDeleteExhibitionArgs = {
  where: ExhibitionWhereUniqueInput
};


export type MutationDeleteManyExhibitionsArgs = {
  where?: Maybe<ExhibitionWhereInput>
};


export type MutationCreateIssueArgs = {
  data: IssueCreateInput
};


export type MutationUpdateIssueArgs = {
  data: IssueUpdateInput,
  where: IssueWhereUniqueInput
};


export type MutationUpdateManyIssuesArgs = {
  data: IssueUpdateManyMutationInput,
  where?: Maybe<IssueWhereInput>
};


export type MutationUpsertIssueArgs = {
  where: IssueWhereUniqueInput,
  create: IssueCreateInput,
  update: IssueUpdateInput
};


export type MutationDeleteIssueArgs = {
  where: IssueWhereUniqueInput
};


export type MutationDeleteManyIssuesArgs = {
  where?: Maybe<IssueWhereInput>
};


export type MutationCreateRoomArgs = {
  data: RoomCreateInput
};


export type MutationUpdateRoomArgs = {
  data: RoomUpdateInput,
  where: RoomWhereUniqueInput
};


export type MutationUpdateManyRoomsArgs = {
  data: RoomUpdateManyMutationInput,
  where?: Maybe<RoomWhereInput>
};


export type MutationUpsertRoomArgs = {
  where: RoomWhereUniqueInput,
  create: RoomCreateInput,
  update: RoomUpdateInput
};


export type MutationDeleteRoomArgs = {
  where: RoomWhereUniqueInput
};


export type MutationDeleteManyRoomsArgs = {
  where?: Maybe<RoomWhereInput>
};


export type MutationCreateShowArgs = {
  data: ShowCreateInput
};


export type MutationUpdateShowArgs = {
  data: ShowUpdateInput,
  where: ShowWhereUniqueInput
};


export type MutationUpdateManyShowsArgs = {
  data: ShowUpdateManyMutationInput,
  where?: Maybe<ShowWhereInput>
};


export type MutationUpsertShowArgs = {
  where: ShowWhereUniqueInput,
  create: ShowCreateInput,
  update: ShowUpdateInput
};


export type MutationDeleteShowArgs = {
  where: ShowWhereUniqueInput
};


export type MutationDeleteManyShowsArgs = {
  where?: Maybe<ShowWhereInput>
};

export enum MutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type Node = {
  id: Scalars['ID'],
};

export type PageInfo = {
  __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type Query = {
  __typename?: 'Query',
  asset?: Maybe<Asset>,
  assets: Array<Maybe<Asset>>,
  assetsConnection: AssetConnection,
  entity?: Maybe<Entity>,
  entities: Array<Maybe<Entity>>,
  entitiesConnection: EntityConnection,
  exhibition?: Maybe<Exhibition>,
  exhibitions: Array<Maybe<Exhibition>>,
  exhibitionsConnection: ExhibitionConnection,
  issue?: Maybe<Issue>,
  issues: Array<Maybe<Issue>>,
  issuesConnection: IssueConnection,
  room?: Maybe<Room>,
  rooms: Array<Maybe<Room>>,
  roomsConnection: RoomConnection,
  show?: Maybe<Show>,
  shows: Array<Maybe<Show>>,
  showsConnection: ShowConnection,
  node?: Maybe<Node>,
};


export type QueryAssetArgs = {
  where: AssetWhereUniqueInput
};


export type QueryAssetsArgs = {
  where?: Maybe<AssetWhereInput>,
  orderBy?: Maybe<AssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryAssetsConnectionArgs = {
  where?: Maybe<AssetWhereInput>,
  orderBy?: Maybe<AssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryEntityArgs = {
  where: EntityWhereUniqueInput
};


export type QueryEntitiesArgs = {
  where?: Maybe<EntityWhereInput>,
  orderBy?: Maybe<EntityOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryEntitiesConnectionArgs = {
  where?: Maybe<EntityWhereInput>,
  orderBy?: Maybe<EntityOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryExhibitionArgs = {
  where: ExhibitionWhereUniqueInput
};


export type QueryExhibitionsArgs = {
  where?: Maybe<ExhibitionWhereInput>,
  orderBy?: Maybe<ExhibitionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryExhibitionsConnectionArgs = {
  where?: Maybe<ExhibitionWhereInput>,
  orderBy?: Maybe<ExhibitionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryIssueArgs = {
  where: IssueWhereUniqueInput
};


export type QueryIssuesArgs = {
  where?: Maybe<IssueWhereInput>,
  orderBy?: Maybe<IssueOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryIssuesConnectionArgs = {
  where?: Maybe<IssueWhereInput>,
  orderBy?: Maybe<IssueOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryRoomArgs = {
  where: RoomWhereUniqueInput
};


export type QueryRoomsArgs = {
  where?: Maybe<RoomWhereInput>,
  orderBy?: Maybe<RoomOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryRoomsConnectionArgs = {
  where?: Maybe<RoomWhereInput>,
  orderBy?: Maybe<RoomOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryShowArgs = {
  where: ShowWhereUniqueInput
};


export type QueryShowsArgs = {
  where?: Maybe<ShowWhereInput>,
  orderBy?: Maybe<ShowOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryShowsConnectionArgs = {
  where?: Maybe<ShowWhereInput>,
  orderBy?: Maybe<ShowOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryNodeArgs = {
  id: Scalars['ID']
};

export enum Rarity {
  Common = 'COMMON',
  Rare = 'RARE'
}

export type Room = {
  __typename?: 'Room',
  id: Scalars['ID'],
  entryId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  exhibition: Exhibition,
  assets?: Maybe<Array<Asset>>,
};


export type RoomAssetsArgs = {
  where?: Maybe<AssetWhereInput>,
  orderBy?: Maybe<AssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type RoomConnection = {
  __typename?: 'RoomConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<RoomEdge>>,
  aggregate: AggregateRoom,
};

export type RoomCreateInput = {
  id?: Maybe<Scalars['ID']>,
  entryId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  exhibition: ExhibitionCreateOneWithoutRoomsInput,
  assets?: Maybe<AssetCreateManyWithoutRoomsInput>,
};

export type RoomCreateManyWithoutAssetsInput = {
  create?: Maybe<Array<RoomCreateWithoutAssetsInput>>,
  connect?: Maybe<Array<RoomWhereUniqueInput>>,
};

export type RoomCreateManyWithoutExhibitionInput = {
  create?: Maybe<Array<RoomCreateWithoutExhibitionInput>>,
  connect?: Maybe<Array<RoomWhereUniqueInput>>,
};

export type RoomCreateWithoutAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  entryId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  exhibition: ExhibitionCreateOneWithoutRoomsInput,
};

export type RoomCreateWithoutExhibitionInput = {
  id?: Maybe<Scalars['ID']>,
  entryId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  assets?: Maybe<AssetCreateManyWithoutRoomsInput>,
};

export type RoomEdge = {
  __typename?: 'RoomEdge',
  node: Room,
  cursor: Scalars['String'],
};

export enum RoomOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  EntryIdAsc = 'entryId_ASC',
  EntryIdDesc = 'entryId_DESC',
  XAsc = 'x_ASC',
  XDesc = 'x_DESC',
  YAsc = 'y_ASC',
  YDesc = 'y_DESC'
}

export type RoomPreviousValues = {
  __typename?: 'RoomPreviousValues',
  id: Scalars['ID'],
  entryId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
};

export type RoomScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  entryId?: Maybe<Scalars['ID']>,
  entryId_not?: Maybe<Scalars['ID']>,
  entryId_in?: Maybe<Array<Scalars['ID']>>,
  entryId_not_in?: Maybe<Array<Scalars['ID']>>,
  entryId_lt?: Maybe<Scalars['ID']>,
  entryId_lte?: Maybe<Scalars['ID']>,
  entryId_gt?: Maybe<Scalars['ID']>,
  entryId_gte?: Maybe<Scalars['ID']>,
  entryId_contains?: Maybe<Scalars['ID']>,
  entryId_not_contains?: Maybe<Scalars['ID']>,
  entryId_starts_with?: Maybe<Scalars['ID']>,
  entryId_not_starts_with?: Maybe<Scalars['ID']>,
  entryId_ends_with?: Maybe<Scalars['ID']>,
  entryId_not_ends_with?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  x_not?: Maybe<Scalars['Int']>,
  x_in?: Maybe<Array<Scalars['Int']>>,
  x_not_in?: Maybe<Array<Scalars['Int']>>,
  x_lt?: Maybe<Scalars['Int']>,
  x_lte?: Maybe<Scalars['Int']>,
  x_gt?: Maybe<Scalars['Int']>,
  x_gte?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
  y_not?: Maybe<Scalars['Int']>,
  y_in?: Maybe<Array<Scalars['Int']>>,
  y_not_in?: Maybe<Array<Scalars['Int']>>,
  y_lt?: Maybe<Scalars['Int']>,
  y_lte?: Maybe<Scalars['Int']>,
  y_gt?: Maybe<Scalars['Int']>,
  y_gte?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<RoomScalarWhereInput>>,
  OR?: Maybe<Array<RoomScalarWhereInput>>,
  NOT?: Maybe<Array<RoomScalarWhereInput>>,
};

export type RoomSubscriptionPayload = {
  __typename?: 'RoomSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Room>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<RoomPreviousValues>,
};

export type RoomSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<RoomWhereInput>,
  AND?: Maybe<Array<RoomSubscriptionWhereInput>>,
  OR?: Maybe<Array<RoomSubscriptionWhereInput>>,
  NOT?: Maybe<Array<RoomSubscriptionWhereInput>>,
};

export type RoomUpdateInput = {
  entryId?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
  exhibition?: Maybe<ExhibitionUpdateOneRequiredWithoutRoomsInput>,
  assets?: Maybe<AssetUpdateManyWithoutRoomsInput>,
};

export type RoomUpdateManyDataInput = {
  entryId?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
};

export type RoomUpdateManyMutationInput = {
  entryId?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
};

export type RoomUpdateManyWithoutAssetsInput = {
  create?: Maybe<Array<RoomCreateWithoutAssetsInput>>,
  delete?: Maybe<Array<RoomWhereUniqueInput>>,
  connect?: Maybe<Array<RoomWhereUniqueInput>>,
  set?: Maybe<Array<RoomWhereUniqueInput>>,
  disconnect?: Maybe<Array<RoomWhereUniqueInput>>,
  update?: Maybe<Array<RoomUpdateWithWhereUniqueWithoutAssetsInput>>,
  upsert?: Maybe<Array<RoomUpsertWithWhereUniqueWithoutAssetsInput>>,
  deleteMany?: Maybe<Array<RoomScalarWhereInput>>,
  updateMany?: Maybe<Array<RoomUpdateManyWithWhereNestedInput>>,
};

export type RoomUpdateManyWithoutExhibitionInput = {
  create?: Maybe<Array<RoomCreateWithoutExhibitionInput>>,
  delete?: Maybe<Array<RoomWhereUniqueInput>>,
  connect?: Maybe<Array<RoomWhereUniqueInput>>,
  set?: Maybe<Array<RoomWhereUniqueInput>>,
  disconnect?: Maybe<Array<RoomWhereUniqueInput>>,
  update?: Maybe<Array<RoomUpdateWithWhereUniqueWithoutExhibitionInput>>,
  upsert?: Maybe<Array<RoomUpsertWithWhereUniqueWithoutExhibitionInput>>,
  deleteMany?: Maybe<Array<RoomScalarWhereInput>>,
  updateMany?: Maybe<Array<RoomUpdateManyWithWhereNestedInput>>,
};

export type RoomUpdateManyWithWhereNestedInput = {
  where: RoomScalarWhereInput,
  data: RoomUpdateManyDataInput,
};

export type RoomUpdateWithoutAssetsDataInput = {
  entryId?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
  exhibition?: Maybe<ExhibitionUpdateOneRequiredWithoutRoomsInput>,
};

export type RoomUpdateWithoutExhibitionDataInput = {
  entryId?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
  assets?: Maybe<AssetUpdateManyWithoutRoomsInput>,
};

export type RoomUpdateWithWhereUniqueWithoutAssetsInput = {
  where: RoomWhereUniqueInput,
  data: RoomUpdateWithoutAssetsDataInput,
};

export type RoomUpdateWithWhereUniqueWithoutExhibitionInput = {
  where: RoomWhereUniqueInput,
  data: RoomUpdateWithoutExhibitionDataInput,
};

export type RoomUpsertWithWhereUniqueWithoutAssetsInput = {
  where: RoomWhereUniqueInput,
  update: RoomUpdateWithoutAssetsDataInput,
  create: RoomCreateWithoutAssetsInput,
};

export type RoomUpsertWithWhereUniqueWithoutExhibitionInput = {
  where: RoomWhereUniqueInput,
  update: RoomUpdateWithoutExhibitionDataInput,
  create: RoomCreateWithoutExhibitionInput,
};

export type RoomWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  entryId?: Maybe<Scalars['ID']>,
  entryId_not?: Maybe<Scalars['ID']>,
  entryId_in?: Maybe<Array<Scalars['ID']>>,
  entryId_not_in?: Maybe<Array<Scalars['ID']>>,
  entryId_lt?: Maybe<Scalars['ID']>,
  entryId_lte?: Maybe<Scalars['ID']>,
  entryId_gt?: Maybe<Scalars['ID']>,
  entryId_gte?: Maybe<Scalars['ID']>,
  entryId_contains?: Maybe<Scalars['ID']>,
  entryId_not_contains?: Maybe<Scalars['ID']>,
  entryId_starts_with?: Maybe<Scalars['ID']>,
  entryId_not_starts_with?: Maybe<Scalars['ID']>,
  entryId_ends_with?: Maybe<Scalars['ID']>,
  entryId_not_ends_with?: Maybe<Scalars['ID']>,
  x?: Maybe<Scalars['Int']>,
  x_not?: Maybe<Scalars['Int']>,
  x_in?: Maybe<Array<Scalars['Int']>>,
  x_not_in?: Maybe<Array<Scalars['Int']>>,
  x_lt?: Maybe<Scalars['Int']>,
  x_lte?: Maybe<Scalars['Int']>,
  x_gt?: Maybe<Scalars['Int']>,
  x_gte?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
  y_not?: Maybe<Scalars['Int']>,
  y_in?: Maybe<Array<Scalars['Int']>>,
  y_not_in?: Maybe<Array<Scalars['Int']>>,
  y_lt?: Maybe<Scalars['Int']>,
  y_lte?: Maybe<Scalars['Int']>,
  y_gt?: Maybe<Scalars['Int']>,
  y_gte?: Maybe<Scalars['Int']>,
  exhibition?: Maybe<ExhibitionWhereInput>,
  assets_every?: Maybe<AssetWhereInput>,
  assets_some?: Maybe<AssetWhereInput>,
  assets_none?: Maybe<AssetWhereInput>,
  AND?: Maybe<Array<RoomWhereInput>>,
  OR?: Maybe<Array<RoomWhereInput>>,
  NOT?: Maybe<Array<RoomWhereInput>>,
};

export type RoomWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  entryId?: Maybe<Scalars['ID']>,
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

export type ShowConnection = {
  __typename?: 'ShowConnection',
  pageInfo: PageInfo,
  edges: Array<Maybe<ShowEdge>>,
  aggregate: AggregateShow,
};

export type ShowCreateInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  exhibition: ExhibitionCreateOneWithoutShowsInput,
};

export type ShowCreateManyWithoutExhibitionInput = {
  create?: Maybe<Array<ShowCreateWithoutExhibitionInput>>,
  connect?: Maybe<Array<ShowWhereUniqueInput>>,
};

export type ShowCreateWithoutExhibitionInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
};

export type ShowEdge = {
  __typename?: 'ShowEdge',
  node: Show,
  cursor: Scalars['String'],
};

export enum ShowOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NumberAsc = 'number_ASC',
  NumberDesc = 'number_DESC',
  OpensAtAsc = 'opensAt_ASC',
  OpensAtDesc = 'opensAt_DESC',
  ClosesAtAsc = 'closesAt_ASC',
  ClosesAtDesc = 'closesAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ShowPreviousValues = {
  __typename?: 'ShowPreviousValues',
  id: Scalars['ID'],
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type ShowScalarWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  number?: Maybe<Scalars['Int']>,
  number_not?: Maybe<Scalars['Int']>,
  number_in?: Maybe<Array<Scalars['Int']>>,
  number_not_in?: Maybe<Array<Scalars['Int']>>,
  number_lt?: Maybe<Scalars['Int']>,
  number_lte?: Maybe<Scalars['Int']>,
  number_gt?: Maybe<Scalars['Int']>,
  number_gte?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  opensAt_not?: Maybe<Scalars['DateTime']>,
  opensAt_in?: Maybe<Array<Scalars['DateTime']>>,
  opensAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  opensAt_lt?: Maybe<Scalars['DateTime']>,
  opensAt_lte?: Maybe<Scalars['DateTime']>,
  opensAt_gt?: Maybe<Scalars['DateTime']>,
  opensAt_gte?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  closesAt_not?: Maybe<Scalars['DateTime']>,
  closesAt_in?: Maybe<Array<Scalars['DateTime']>>,
  closesAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  closesAt_lt?: Maybe<Scalars['DateTime']>,
  closesAt_lte?: Maybe<Scalars['DateTime']>,
  closesAt_gt?: Maybe<Scalars['DateTime']>,
  closesAt_gte?: Maybe<Scalars['DateTime']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<ShowScalarWhereInput>>,
  OR?: Maybe<Array<ShowScalarWhereInput>>,
  NOT?: Maybe<Array<ShowScalarWhereInput>>,
};

export type ShowSubscriptionPayload = {
  __typename?: 'ShowSubscriptionPayload',
  mutation: MutationType,
  node?: Maybe<Show>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<ShowPreviousValues>,
};

export type ShowSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<MutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<ShowWhereInput>,
  AND?: Maybe<Array<ShowSubscriptionWhereInput>>,
  OR?: Maybe<Array<ShowSubscriptionWhereInput>>,
  NOT?: Maybe<Array<ShowSubscriptionWhereInput>>,
};

export type ShowUpdateInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  exhibition?: Maybe<ExhibitionUpdateOneRequiredWithoutShowsInput>,
};

export type ShowUpdateManyDataInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type ShowUpdateManyMutationInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type ShowUpdateManyWithoutExhibitionInput = {
  create?: Maybe<Array<ShowCreateWithoutExhibitionInput>>,
  delete?: Maybe<Array<ShowWhereUniqueInput>>,
  connect?: Maybe<Array<ShowWhereUniqueInput>>,
  set?: Maybe<Array<ShowWhereUniqueInput>>,
  disconnect?: Maybe<Array<ShowWhereUniqueInput>>,
  update?: Maybe<Array<ShowUpdateWithWhereUniqueWithoutExhibitionInput>>,
  upsert?: Maybe<Array<ShowUpsertWithWhereUniqueWithoutExhibitionInput>>,
  deleteMany?: Maybe<Array<ShowScalarWhereInput>>,
  updateMany?: Maybe<Array<ShowUpdateManyWithWhereNestedInput>>,
};

export type ShowUpdateManyWithWhereNestedInput = {
  where: ShowScalarWhereInput,
  data: ShowUpdateManyDataInput,
};

export type ShowUpdateWithoutExhibitionDataInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type ShowUpdateWithWhereUniqueWithoutExhibitionInput = {
  where: ShowWhereUniqueInput,
  data: ShowUpdateWithoutExhibitionDataInput,
};

export type ShowUpsertWithWhereUniqueWithoutExhibitionInput = {
  where: ShowWhereUniqueInput,
  update: ShowUpdateWithoutExhibitionDataInput,
  create: ShowCreateWithoutExhibitionInput,
};

export type ShowWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  number?: Maybe<Scalars['Int']>,
  number_not?: Maybe<Scalars['Int']>,
  number_in?: Maybe<Array<Scalars['Int']>>,
  number_not_in?: Maybe<Array<Scalars['Int']>>,
  number_lt?: Maybe<Scalars['Int']>,
  number_lte?: Maybe<Scalars['Int']>,
  number_gt?: Maybe<Scalars['Int']>,
  number_gte?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  opensAt_not?: Maybe<Scalars['DateTime']>,
  opensAt_in?: Maybe<Array<Scalars['DateTime']>>,
  opensAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  opensAt_lt?: Maybe<Scalars['DateTime']>,
  opensAt_lte?: Maybe<Scalars['DateTime']>,
  opensAt_gt?: Maybe<Scalars['DateTime']>,
  opensAt_gte?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  closesAt_not?: Maybe<Scalars['DateTime']>,
  closesAt_in?: Maybe<Array<Scalars['DateTime']>>,
  closesAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  closesAt_lt?: Maybe<Scalars['DateTime']>,
  closesAt_lte?: Maybe<Scalars['DateTime']>,
  closesAt_gt?: Maybe<Scalars['DateTime']>,
  closesAt_gte?: Maybe<Scalars['DateTime']>,
  exhibition?: Maybe<ExhibitionWhereInput>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  AND?: Maybe<Array<ShowWhereInput>>,
  OR?: Maybe<Array<ShowWhereInput>>,
  NOT?: Maybe<Array<ShowWhereInput>>,
};

export type ShowWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type Subscription = {
  __typename?: 'Subscription',
  asset?: Maybe<AssetSubscriptionPayload>,
  entity?: Maybe<EntitySubscriptionPayload>,
  exhibition?: Maybe<ExhibitionSubscriptionPayload>,
  issue?: Maybe<IssueSubscriptionPayload>,
  room?: Maybe<RoomSubscriptionPayload>,
  show?: Maybe<ShowSubscriptionPayload>,
};


export type SubscriptionAssetArgs = {
  where?: Maybe<AssetSubscriptionWhereInput>
};


export type SubscriptionEntityArgs = {
  where?: Maybe<EntitySubscriptionWhereInput>
};


export type SubscriptionExhibitionArgs = {
  where?: Maybe<ExhibitionSubscriptionWhereInput>
};


export type SubscriptionIssueArgs = {
  where?: Maybe<IssueSubscriptionWhereInput>
};


export type SubscriptionRoomArgs = {
  where?: Maybe<RoomSubscriptionWhereInput>
};


export type SubscriptionShowArgs = {
  where?: Maybe<ShowSubscriptionWhereInput>
};
export type CurrentExhibitionQueryVariables = {};


export type CurrentExhibitionQuery = (
  { __typename?: 'Query' }
  & { exhibitions: Array<Maybe<(
    { __typename?: 'Exhibition' }
    & Pick<Exhibition, 'id' | 'number' | 'extent' | 'theme' | 'opensAt' | 'closesAt'>
    & { shows: Maybe<Array<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'number' | 'opensAt' | 'closesAt'>
    )>>, rooms: Maybe<Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'entryId' | 'x' | 'y'>
    )>> }
  )>> }
);

export type TestSubscriptionVariables = {};


export type TestSubscription = (
  { __typename?: 'Subscription' }
  & { issue: Maybe<(
    { __typename?: 'IssueSubscriptionPayload' }
    & Pick<IssueSubscriptionPayload, 'updatedFields'>
  )> }
);

export const CurrentExhibitionDocument = gql`
    query CurrentExhibition {
  exhibitions(last: 1, orderBy: opensAt_DESC) {
    id
    number
    extent
    theme
    opensAt
    closesAt
    shows {
      id
      number
      opensAt
      closesAt
    }
    rooms {
      id
      entryId
      x
      y
    }
  }
}
    `;

    export function useCurrentExhibitionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentExhibitionQuery, CurrentExhibitionQueryVariables>) {
      return ApolloReactHooks.useQuery<CurrentExhibitionQuery, CurrentExhibitionQueryVariables>(CurrentExhibitionDocument, baseOptions);
    };
      export function useCurrentExhibitionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentExhibitionQuery, CurrentExhibitionQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<CurrentExhibitionQuery, CurrentExhibitionQueryVariables>(CurrentExhibitionDocument, baseOptions);
      };
      
export type CurrentExhibitionQueryHookResult = ReturnType<typeof useCurrentExhibitionQuery>;
export type CurrentExhibitionQueryResult = ApolloReactCommon.QueryResult<CurrentExhibitionQuery, CurrentExhibitionQueryVariables>;
export const TestDocument = gql`
    subscription Test {
  issue(where: {node: {id: "cjznzwhmf003m072105217so8"}, mutation_in: [UPDATED]}) {
    updatedFields
  }
}
    `;

    export function useTestSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TestSubscription, TestSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<TestSubscription, TestSubscriptionVariables>(TestDocument, baseOptions);
    };
export type TestSubscriptionHookResult = ReturnType<typeof useTestSubscription>;
export type TestSubscriptionResult = ApolloReactCommon.SubscriptionResult<TestSubscription>;