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

export type IAggregateAsset = {
  __typename?: 'AggregateAsset',
  count: Scalars['Int'],
};

export type IAggregateEntity = {
  __typename?: 'AggregateEntity',
  count: Scalars['Int'],
};

export type IAggregateExhibition = {
  __typename?: 'AggregateExhibition',
  count: Scalars['Int'],
};

export type IAggregateIssue = {
  __typename?: 'AggregateIssue',
  count: Scalars['Int'],
};

export type IAggregateShow = {
  __typename?: 'AggregateShow',
  count: Scalars['Int'],
};

export type IAggregateWork = {
  __typename?: 'AggregateWork',
  count: Scalars['Int'],
};

export type IAsset = {
  __typename?: 'Asset',
  id: Scalars['ID'],
  isCounterfactual: Scalars['Boolean'],
  owner: IEntity,
  issue: IIssue,
  printer: IEntity,
  works?: Maybe<Array<IWork>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type IAssetWorksArgs = {
  where?: Maybe<IWorkWhereInput>,
  orderBy?: Maybe<IWorkOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type IAssetConnection = {
  __typename?: 'AssetConnection',
  pageInfo: IPageInfo,
  edges: Array<Maybe<IAssetEdge>>,
  aggregate: IAggregateAsset,
};

export type IAssetCreateInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: IEntityCreateOneWithoutOwnedAssetsInput,
  issue: IIssueCreateOneWithoutAssetsInput,
  printer: IEntityCreateOneWithoutPrintedAssetsInput,
  works?: Maybe<IWorkCreateManyWithoutAssetsInput>,
};

export type IAssetCreateManyWithoutIssueInput = {
  create?: Maybe<Array<IAssetCreateWithoutIssueInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
};

export type IAssetCreateManyWithoutOwnerInput = {
  create?: Maybe<Array<IAssetCreateWithoutOwnerInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
};

export type IAssetCreateManyWithoutPrinterInput = {
  create?: Maybe<Array<IAssetCreateWithoutPrinterInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
};

export type IAssetCreateManyWithoutWorksInput = {
  create?: Maybe<Array<IAssetCreateWithoutWorksInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
};

export type IAssetCreateWithoutIssueInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: IEntityCreateOneWithoutOwnedAssetsInput,
  printer: IEntityCreateOneWithoutPrintedAssetsInput,
  works?: Maybe<IWorkCreateManyWithoutAssetsInput>,
};

export type IAssetCreateWithoutOwnerInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  issue: IIssueCreateOneWithoutAssetsInput,
  printer: IEntityCreateOneWithoutPrintedAssetsInput,
  works?: Maybe<IWorkCreateManyWithoutAssetsInput>,
};

export type IAssetCreateWithoutPrinterInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: IEntityCreateOneWithoutOwnedAssetsInput,
  issue: IIssueCreateOneWithoutAssetsInput,
  works?: Maybe<IWorkCreateManyWithoutAssetsInput>,
};

export type IAssetCreateWithoutWorksInput = {
  id?: Maybe<Scalars['ID']>,
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner: IEntityCreateOneWithoutOwnedAssetsInput,
  issue: IIssueCreateOneWithoutAssetsInput,
  printer: IEntityCreateOneWithoutPrintedAssetsInput,
};

export type IAssetEdge = {
  __typename?: 'AssetEdge',
  node: IAsset,
  cursor: Scalars['String'],
};

export enum IAssetOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsCounterfactualAsc = 'isCounterfactual_ASC',
  IsCounterfactualDesc = 'isCounterfactual_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type IAssetPreviousValues = {
  __typename?: 'AssetPreviousValues',
  id: Scalars['ID'],
  isCounterfactual: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type IAssetScalarWhereInput = {
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
  AND?: Maybe<Array<IAssetScalarWhereInput>>,
  OR?: Maybe<Array<IAssetScalarWhereInput>>,
  NOT?: Maybe<Array<IAssetScalarWhereInput>>,
};

export type IAssetSubscriptionPayload = {
  __typename?: 'AssetSubscriptionPayload',
  mutation: IMutationType,
  node?: Maybe<IAsset>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IAssetPreviousValues>,
};

export type IAssetSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<IMutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IAssetWhereInput>,
  AND?: Maybe<Array<IAssetSubscriptionWhereInput>>,
  OR?: Maybe<Array<IAssetSubscriptionWhereInput>>,
  NOT?: Maybe<Array<IAssetSubscriptionWhereInput>>,
};

export type IAssetUpdateInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<IEntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  issue?: Maybe<IIssueUpdateOneRequiredWithoutAssetsInput>,
  printer?: Maybe<IEntityUpdateOneRequiredWithoutPrintedAssetsInput>,
  works?: Maybe<IWorkUpdateManyWithoutAssetsInput>,
};

export type IAssetUpdateManyDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
};

export type IAssetUpdateManyMutationInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
};

export type IAssetUpdateManyWithoutIssueInput = {
  create?: Maybe<Array<IAssetCreateWithoutIssueInput>>,
  delete?: Maybe<Array<IAssetWhereUniqueInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
  set?: Maybe<Array<IAssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<IAssetWhereUniqueInput>>,
  update?: Maybe<Array<IAssetUpdateWithWhereUniqueWithoutIssueInput>>,
  upsert?: Maybe<Array<IAssetUpsertWithWhereUniqueWithoutIssueInput>>,
  deleteMany?: Maybe<Array<IAssetScalarWhereInput>>,
  updateMany?: Maybe<Array<IAssetUpdateManyWithWhereNestedInput>>,
};

export type IAssetUpdateManyWithoutOwnerInput = {
  create?: Maybe<Array<IAssetCreateWithoutOwnerInput>>,
  delete?: Maybe<Array<IAssetWhereUniqueInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
  set?: Maybe<Array<IAssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<IAssetWhereUniqueInput>>,
  update?: Maybe<Array<IAssetUpdateWithWhereUniqueWithoutOwnerInput>>,
  upsert?: Maybe<Array<IAssetUpsertWithWhereUniqueWithoutOwnerInput>>,
  deleteMany?: Maybe<Array<IAssetScalarWhereInput>>,
  updateMany?: Maybe<Array<IAssetUpdateManyWithWhereNestedInput>>,
};

export type IAssetUpdateManyWithoutPrinterInput = {
  create?: Maybe<Array<IAssetCreateWithoutPrinterInput>>,
  delete?: Maybe<Array<IAssetWhereUniqueInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
  set?: Maybe<Array<IAssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<IAssetWhereUniqueInput>>,
  update?: Maybe<Array<IAssetUpdateWithWhereUniqueWithoutPrinterInput>>,
  upsert?: Maybe<Array<IAssetUpsertWithWhereUniqueWithoutPrinterInput>>,
  deleteMany?: Maybe<Array<IAssetScalarWhereInput>>,
  updateMany?: Maybe<Array<IAssetUpdateManyWithWhereNestedInput>>,
};

export type IAssetUpdateManyWithoutWorksInput = {
  create?: Maybe<Array<IAssetCreateWithoutWorksInput>>,
  delete?: Maybe<Array<IAssetWhereUniqueInput>>,
  connect?: Maybe<Array<IAssetWhereUniqueInput>>,
  set?: Maybe<Array<IAssetWhereUniqueInput>>,
  disconnect?: Maybe<Array<IAssetWhereUniqueInput>>,
  update?: Maybe<Array<IAssetUpdateWithWhereUniqueWithoutWorksInput>>,
  upsert?: Maybe<Array<IAssetUpsertWithWhereUniqueWithoutWorksInput>>,
  deleteMany?: Maybe<Array<IAssetScalarWhereInput>>,
  updateMany?: Maybe<Array<IAssetUpdateManyWithWhereNestedInput>>,
};

export type IAssetUpdateManyWithWhereNestedInput = {
  where: IAssetScalarWhereInput,
  data: IAssetUpdateManyDataInput,
};

export type IAssetUpdateWithoutIssueDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<IEntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  printer?: Maybe<IEntityUpdateOneRequiredWithoutPrintedAssetsInput>,
  works?: Maybe<IWorkUpdateManyWithoutAssetsInput>,
};

export type IAssetUpdateWithoutOwnerDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  issue?: Maybe<IIssueUpdateOneRequiredWithoutAssetsInput>,
  printer?: Maybe<IEntityUpdateOneRequiredWithoutPrintedAssetsInput>,
  works?: Maybe<IWorkUpdateManyWithoutAssetsInput>,
};

export type IAssetUpdateWithoutPrinterDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<IEntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  issue?: Maybe<IIssueUpdateOneRequiredWithoutAssetsInput>,
  works?: Maybe<IWorkUpdateManyWithoutAssetsInput>,
};

export type IAssetUpdateWithoutWorksDataInput = {
  isCounterfactual?: Maybe<Scalars['Boolean']>,
  owner?: Maybe<IEntityUpdateOneRequiredWithoutOwnedAssetsInput>,
  issue?: Maybe<IIssueUpdateOneRequiredWithoutAssetsInput>,
  printer?: Maybe<IEntityUpdateOneRequiredWithoutPrintedAssetsInput>,
};

export type IAssetUpdateWithWhereUniqueWithoutIssueInput = {
  where: IAssetWhereUniqueInput,
  data: IAssetUpdateWithoutIssueDataInput,
};

export type IAssetUpdateWithWhereUniqueWithoutOwnerInput = {
  where: IAssetWhereUniqueInput,
  data: IAssetUpdateWithoutOwnerDataInput,
};

export type IAssetUpdateWithWhereUniqueWithoutPrinterInput = {
  where: IAssetWhereUniqueInput,
  data: IAssetUpdateWithoutPrinterDataInput,
};

export type IAssetUpdateWithWhereUniqueWithoutWorksInput = {
  where: IAssetWhereUniqueInput,
  data: IAssetUpdateWithoutWorksDataInput,
};

export type IAssetUpsertWithWhereUniqueWithoutIssueInput = {
  where: IAssetWhereUniqueInput,
  update: IAssetUpdateWithoutIssueDataInput,
  create: IAssetCreateWithoutIssueInput,
};

export type IAssetUpsertWithWhereUniqueWithoutOwnerInput = {
  where: IAssetWhereUniqueInput,
  update: IAssetUpdateWithoutOwnerDataInput,
  create: IAssetCreateWithoutOwnerInput,
};

export type IAssetUpsertWithWhereUniqueWithoutPrinterInput = {
  where: IAssetWhereUniqueInput,
  update: IAssetUpdateWithoutPrinterDataInput,
  create: IAssetCreateWithoutPrinterInput,
};

export type IAssetUpsertWithWhereUniqueWithoutWorksInput = {
  where: IAssetWhereUniqueInput,
  update: IAssetUpdateWithoutWorksDataInput,
  create: IAssetCreateWithoutWorksInput,
};

export type IAssetWhereInput = {
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
  owner?: Maybe<IEntityWhereInput>,
  issue?: Maybe<IIssueWhereInput>,
  printer?: Maybe<IEntityWhereInput>,
  works_every?: Maybe<IWorkWhereInput>,
  works_some?: Maybe<IWorkWhereInput>,
  works_none?: Maybe<IWorkWhereInput>,
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
  AND?: Maybe<Array<IAssetWhereInput>>,
  OR?: Maybe<Array<IAssetWhereInput>>,
  NOT?: Maybe<Array<IAssetWhereInput>>,
};

export type IAssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type IBatchPayload = {
  __typename?: 'BatchPayload',
  count: Scalars['Long'],
};


export type IEntity = {
  __typename?: 'Entity',
  id: Scalars['ID'],
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<Array<IIssue>>,
  ownedAssets?: Maybe<Array<IAsset>>,
  printedAssets?: Maybe<Array<IAsset>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type IEntityCreatedIssuesArgs = {
  where?: Maybe<IIssueWhereInput>,
  orderBy?: Maybe<IIssueOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IEntityOwnedAssetsArgs = {
  where?: Maybe<IAssetWhereInput>,
  orderBy?: Maybe<IAssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IEntityPrintedAssetsArgs = {
  where?: Maybe<IAssetWhereInput>,
  orderBy?: Maybe<IAssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type IEntityConnection = {
  __typename?: 'EntityConnection',
  pageInfo: IPageInfo,
  edges: Array<Maybe<IEntityEdge>>,
  aggregate: IAggregateEntity,
};

export type IEntityCreateInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<IIssueCreateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<IAssetCreateManyWithoutOwnerInput>,
  printedAssets?: Maybe<IAssetCreateManyWithoutPrinterInput>,
};

export type IEntityCreateOneWithoutCreatedIssuesInput = {
  create?: Maybe<IEntityCreateWithoutCreatedIssuesInput>,
  connect?: Maybe<IEntityWhereUniqueInput>,
};

export type IEntityCreateOneWithoutOwnedAssetsInput = {
  create?: Maybe<IEntityCreateWithoutOwnedAssetsInput>,
  connect?: Maybe<IEntityWhereUniqueInput>,
};

export type IEntityCreateOneWithoutPrintedAssetsInput = {
  create?: Maybe<IEntityCreateWithoutPrintedAssetsInput>,
  connect?: Maybe<IEntityWhereUniqueInput>,
};

export type IEntityCreateWithoutCreatedIssuesInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  ownedAssets?: Maybe<IAssetCreateManyWithoutOwnerInput>,
  printedAssets?: Maybe<IAssetCreateManyWithoutPrinterInput>,
};

export type IEntityCreateWithoutOwnedAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<IIssueCreateManyWithoutCreatorInput>,
  printedAssets?: Maybe<IAssetCreateManyWithoutPrinterInput>,
};

export type IEntityCreateWithoutPrintedAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  handle: Scalars['String'],
  email: Scalars['String'],
  createdIssues?: Maybe<IIssueCreateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<IAssetCreateManyWithoutOwnerInput>,
};

export type IEntityEdge = {
  __typename?: 'EntityEdge',
  node: IEntity,
  cursor: Scalars['String'],
};

export enum IEntityOrderByInput {
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

export type IEntityPreviousValues = {
  __typename?: 'EntityPreviousValues',
  id: Scalars['ID'],
  handle: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type IEntitySubscriptionPayload = {
  __typename?: 'EntitySubscriptionPayload',
  mutation: IMutationType,
  node?: Maybe<IEntity>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IEntityPreviousValues>,
};

export type IEntitySubscriptionWhereInput = {
  mutation_in?: Maybe<Array<IMutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IEntityWhereInput>,
  AND?: Maybe<Array<IEntitySubscriptionWhereInput>>,
  OR?: Maybe<Array<IEntitySubscriptionWhereInput>>,
  NOT?: Maybe<Array<IEntitySubscriptionWhereInput>>,
};

export type IEntityUpdateInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdIssues?: Maybe<IIssueUpdateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<IAssetUpdateManyWithoutOwnerInput>,
  printedAssets?: Maybe<IAssetUpdateManyWithoutPrinterInput>,
};

export type IEntityUpdateManyMutationInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type IEntityUpdateOneRequiredWithoutCreatedIssuesInput = {
  create?: Maybe<IEntityCreateWithoutCreatedIssuesInput>,
  update?: Maybe<IEntityUpdateWithoutCreatedIssuesDataInput>,
  upsert?: Maybe<IEntityUpsertWithoutCreatedIssuesInput>,
  connect?: Maybe<IEntityWhereUniqueInput>,
};

export type IEntityUpdateOneRequiredWithoutOwnedAssetsInput = {
  create?: Maybe<IEntityCreateWithoutOwnedAssetsInput>,
  update?: Maybe<IEntityUpdateWithoutOwnedAssetsDataInput>,
  upsert?: Maybe<IEntityUpsertWithoutOwnedAssetsInput>,
  connect?: Maybe<IEntityWhereUniqueInput>,
};

export type IEntityUpdateOneRequiredWithoutPrintedAssetsInput = {
  create?: Maybe<IEntityCreateWithoutPrintedAssetsInput>,
  update?: Maybe<IEntityUpdateWithoutPrintedAssetsDataInput>,
  upsert?: Maybe<IEntityUpsertWithoutPrintedAssetsInput>,
  connect?: Maybe<IEntityWhereUniqueInput>,
};

export type IEntityUpdateWithoutCreatedIssuesDataInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  ownedAssets?: Maybe<IAssetUpdateManyWithoutOwnerInput>,
  printedAssets?: Maybe<IAssetUpdateManyWithoutPrinterInput>,
};

export type IEntityUpdateWithoutOwnedAssetsDataInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdIssues?: Maybe<IIssueUpdateManyWithoutCreatorInput>,
  printedAssets?: Maybe<IAssetUpdateManyWithoutPrinterInput>,
};

export type IEntityUpdateWithoutPrintedAssetsDataInput = {
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdIssues?: Maybe<IIssueUpdateManyWithoutCreatorInput>,
  ownedAssets?: Maybe<IAssetUpdateManyWithoutOwnerInput>,
};

export type IEntityUpsertWithoutCreatedIssuesInput = {
  update: IEntityUpdateWithoutCreatedIssuesDataInput,
  create: IEntityCreateWithoutCreatedIssuesInput,
};

export type IEntityUpsertWithoutOwnedAssetsInput = {
  update: IEntityUpdateWithoutOwnedAssetsDataInput,
  create: IEntityCreateWithoutOwnedAssetsInput,
};

export type IEntityUpsertWithoutPrintedAssetsInput = {
  update: IEntityUpdateWithoutPrintedAssetsDataInput,
  create: IEntityCreateWithoutPrintedAssetsInput,
};

export type IEntityWhereInput = {
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
  createdIssues_every?: Maybe<IIssueWhereInput>,
  createdIssues_some?: Maybe<IIssueWhereInput>,
  createdIssues_none?: Maybe<IIssueWhereInput>,
  ownedAssets_every?: Maybe<IAssetWhereInput>,
  ownedAssets_some?: Maybe<IAssetWhereInput>,
  ownedAssets_none?: Maybe<IAssetWhereInput>,
  printedAssets_every?: Maybe<IAssetWhereInput>,
  printedAssets_some?: Maybe<IAssetWhereInput>,
  printedAssets_none?: Maybe<IAssetWhereInput>,
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
  AND?: Maybe<Array<IEntityWhereInput>>,
  OR?: Maybe<Array<IEntityWhereInput>>,
  NOT?: Maybe<Array<IEntityWhereInput>>,
};

export type IEntityWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  handle?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type IExhibition = {
  __typename?: 'Exhibition',
  id: Scalars['ID'],
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  shows?: Maybe<Array<IShow>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type IExhibitionShowsArgs = {
  where?: Maybe<IShowWhereInput>,
  orderBy?: Maybe<IShowOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type IExhibitionConnection = {
  __typename?: 'ExhibitionConnection',
  pageInfo: IPageInfo,
  edges: Array<Maybe<IExhibitionEdge>>,
  aggregate: IAggregateExhibition,
};

export type IExhibitionCreateInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  shows?: Maybe<IShowCreateManyWithoutExhibitionInput>,
};

export type IExhibitionCreateOneWithoutShowsInput = {
  create?: Maybe<IExhibitionCreateWithoutShowsInput>,
  connect?: Maybe<IExhibitionWhereUniqueInput>,
};

export type IExhibitionCreateWithoutShowsInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
};

export type IExhibitionEdge = {
  __typename?: 'ExhibitionEdge',
  node: IExhibition,
  cursor: Scalars['String'],
};

export enum IExhibitionOrderByInput {
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

export type IExhibitionPreviousValues = {
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

export type IExhibitionSubscriptionPayload = {
  __typename?: 'ExhibitionSubscriptionPayload',
  mutation: IMutationType,
  node?: Maybe<IExhibition>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IExhibitionPreviousValues>,
};

export type IExhibitionSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<IMutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IExhibitionWhereInput>,
  AND?: Maybe<Array<IExhibitionSubscriptionWhereInput>>,
  OR?: Maybe<Array<IExhibitionSubscriptionWhereInput>>,
  NOT?: Maybe<Array<IExhibitionSubscriptionWhereInput>>,
};

export type IExhibitionUpdateInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  shows?: Maybe<IShowUpdateManyWithoutExhibitionInput>,
};

export type IExhibitionUpdateManyMutationInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type IExhibitionUpdateOneRequiredWithoutShowsInput = {
  create?: Maybe<IExhibitionCreateWithoutShowsInput>,
  update?: Maybe<IExhibitionUpdateWithoutShowsDataInput>,
  upsert?: Maybe<IExhibitionUpsertWithoutShowsInput>,
  connect?: Maybe<IExhibitionWhereUniqueInput>,
};

export type IExhibitionUpdateWithoutShowsDataInput = {
  number?: Maybe<Scalars['Int']>,
  theme?: Maybe<Scalars['Json']>,
  extent?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type IExhibitionUpsertWithoutShowsInput = {
  update: IExhibitionUpdateWithoutShowsDataInput,
  create: IExhibitionCreateWithoutShowsInput,
};

export type IExhibitionWhereInput = {
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
  shows_every?: Maybe<IShowWhereInput>,
  shows_some?: Maybe<IShowWhereInput>,
  shows_none?: Maybe<IShowWhereInput>,
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
  AND?: Maybe<Array<IExhibitionWhereInput>>,
  OR?: Maybe<Array<IExhibitionWhereInput>>,
  NOT?: Maybe<Array<IExhibitionWhereInput>>,
};

export type IExhibitionWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
  number?: Maybe<Scalars['Int']>,
};

export type IIssue = {
  __typename?: 'Issue',
  id: Scalars['ID'],
  uri: Scalars['String'],
  rarity: IRarity,
  emojis: Array<Scalars['String']>,
  creator: IEntity,
  assets?: Maybe<Array<IAsset>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type IIssueAssetsArgs = {
  where?: Maybe<IAssetWhereInput>,
  orderBy?: Maybe<IAssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type IIssueConnection = {
  __typename?: 'IssueConnection',
  pageInfo: IPageInfo,
  edges: Array<Maybe<IIssueEdge>>,
  aggregate: IAggregateIssue,
};

export type IIssueCreateemojisInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type IIssueCreateInput = {
  id?: Maybe<Scalars['ID']>,
  uri: Scalars['String'],
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueCreateemojisInput>,
  creator: IEntityCreateOneWithoutCreatedIssuesInput,
  assets?: Maybe<IAssetCreateManyWithoutIssueInput>,
};

export type IIssueCreateManyWithoutCreatorInput = {
  create?: Maybe<Array<IIssueCreateWithoutCreatorInput>>,
  connect?: Maybe<Array<IIssueWhereUniqueInput>>,
};

export type IIssueCreateOneWithoutAssetsInput = {
  create?: Maybe<IIssueCreateWithoutAssetsInput>,
  connect?: Maybe<IIssueWhereUniqueInput>,
};

export type IIssueCreateWithoutAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  uri: Scalars['String'],
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueCreateemojisInput>,
  creator: IEntityCreateOneWithoutCreatedIssuesInput,
};

export type IIssueCreateWithoutCreatorInput = {
  id?: Maybe<Scalars['ID']>,
  uri: Scalars['String'],
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueCreateemojisInput>,
  assets?: Maybe<IAssetCreateManyWithoutIssueInput>,
};

export type IIssueEdge = {
  __typename?: 'IssueEdge',
  node: IIssue,
  cursor: Scalars['String'],
};

export enum IIssueOrderByInput {
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

export type IIssuePreviousValues = {
  __typename?: 'IssuePreviousValues',
  id: Scalars['ID'],
  uri: Scalars['String'],
  rarity: IRarity,
  emojis: Array<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type IIssueScalarWhereInput = {
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
  rarity?: Maybe<IRarity>,
  rarity_not?: Maybe<IRarity>,
  rarity_in?: Maybe<Array<IRarity>>,
  rarity_not_in?: Maybe<Array<IRarity>>,
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
  AND?: Maybe<Array<IIssueScalarWhereInput>>,
  OR?: Maybe<Array<IIssueScalarWhereInput>>,
  NOT?: Maybe<Array<IIssueScalarWhereInput>>,
};

export type IIssueSubscriptionPayload = {
  __typename?: 'IssueSubscriptionPayload',
  mutation: IMutationType,
  node?: Maybe<IIssue>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IIssuePreviousValues>,
};

export type IIssueSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<IMutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IIssueWhereInput>,
  AND?: Maybe<Array<IIssueSubscriptionWhereInput>>,
  OR?: Maybe<Array<IIssueSubscriptionWhereInput>>,
  NOT?: Maybe<Array<IIssueSubscriptionWhereInput>>,
};

export type IIssueUpdateemojisInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type IIssueUpdateInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueUpdateemojisInput>,
  creator?: Maybe<IEntityUpdateOneRequiredWithoutCreatedIssuesInput>,
  assets?: Maybe<IAssetUpdateManyWithoutIssueInput>,
};

export type IIssueUpdateManyDataInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueUpdateemojisInput>,
};

export type IIssueUpdateManyMutationInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueUpdateemojisInput>,
};

export type IIssueUpdateManyWithoutCreatorInput = {
  create?: Maybe<Array<IIssueCreateWithoutCreatorInput>>,
  delete?: Maybe<Array<IIssueWhereUniqueInput>>,
  connect?: Maybe<Array<IIssueWhereUniqueInput>>,
  set?: Maybe<Array<IIssueWhereUniqueInput>>,
  disconnect?: Maybe<Array<IIssueWhereUniqueInput>>,
  update?: Maybe<Array<IIssueUpdateWithWhereUniqueWithoutCreatorInput>>,
  upsert?: Maybe<Array<IIssueUpsertWithWhereUniqueWithoutCreatorInput>>,
  deleteMany?: Maybe<Array<IIssueScalarWhereInput>>,
  updateMany?: Maybe<Array<IIssueUpdateManyWithWhereNestedInput>>,
};

export type IIssueUpdateManyWithWhereNestedInput = {
  where: IIssueScalarWhereInput,
  data: IIssueUpdateManyDataInput,
};

export type IIssueUpdateOneRequiredWithoutAssetsInput = {
  create?: Maybe<IIssueCreateWithoutAssetsInput>,
  update?: Maybe<IIssueUpdateWithoutAssetsDataInput>,
  upsert?: Maybe<IIssueUpsertWithoutAssetsInput>,
  connect?: Maybe<IIssueWhereUniqueInput>,
};

export type IIssueUpdateWithoutAssetsDataInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueUpdateemojisInput>,
  creator?: Maybe<IEntityUpdateOneRequiredWithoutCreatedIssuesInput>,
};

export type IIssueUpdateWithoutCreatorDataInput = {
  uri?: Maybe<Scalars['String']>,
  rarity?: Maybe<IRarity>,
  emojis?: Maybe<IIssueUpdateemojisInput>,
  assets?: Maybe<IAssetUpdateManyWithoutIssueInput>,
};

export type IIssueUpdateWithWhereUniqueWithoutCreatorInput = {
  where: IIssueWhereUniqueInput,
  data: IIssueUpdateWithoutCreatorDataInput,
};

export type IIssueUpsertWithoutAssetsInput = {
  update: IIssueUpdateWithoutAssetsDataInput,
  create: IIssueCreateWithoutAssetsInput,
};

export type IIssueUpsertWithWhereUniqueWithoutCreatorInput = {
  where: IIssueWhereUniqueInput,
  update: IIssueUpdateWithoutCreatorDataInput,
  create: IIssueCreateWithoutCreatorInput,
};

export type IIssueWhereInput = {
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
  rarity?: Maybe<IRarity>,
  rarity_not?: Maybe<IRarity>,
  rarity_in?: Maybe<Array<IRarity>>,
  rarity_not_in?: Maybe<Array<IRarity>>,
  creator?: Maybe<IEntityWhereInput>,
  assets_every?: Maybe<IAssetWhereInput>,
  assets_some?: Maybe<IAssetWhereInput>,
  assets_none?: Maybe<IAssetWhereInput>,
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
  AND?: Maybe<Array<IIssueWhereInput>>,
  OR?: Maybe<Array<IIssueWhereInput>>,
  NOT?: Maybe<Array<IIssueWhereInput>>,
};

export type IIssueWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};



export type IMutation = {
  __typename?: 'Mutation',
  createAsset: IAsset,
  updateAsset?: Maybe<IAsset>,
  updateManyAssets: IBatchPayload,
  upsertAsset: IAsset,
  deleteAsset?: Maybe<IAsset>,
  deleteManyAssets: IBatchPayload,
  createEntity: IEntity,
  updateEntity?: Maybe<IEntity>,
  updateManyEntities: IBatchPayload,
  upsertEntity: IEntity,
  deleteEntity?: Maybe<IEntity>,
  deleteManyEntities: IBatchPayload,
  createExhibition: IExhibition,
  updateExhibition?: Maybe<IExhibition>,
  updateManyExhibitions: IBatchPayload,
  upsertExhibition: IExhibition,
  deleteExhibition?: Maybe<IExhibition>,
  deleteManyExhibitions: IBatchPayload,
  createIssue: IIssue,
  updateIssue?: Maybe<IIssue>,
  updateManyIssues: IBatchPayload,
  upsertIssue: IIssue,
  deleteIssue?: Maybe<IIssue>,
  deleteManyIssues: IBatchPayload,
  createShow: IShow,
  updateShow?: Maybe<IShow>,
  updateManyShows: IBatchPayload,
  upsertShow: IShow,
  deleteShow?: Maybe<IShow>,
  deleteManyShows: IBatchPayload,
  createWork: IWork,
  updateWork?: Maybe<IWork>,
  updateManyWorks: IBatchPayload,
  upsertWork: IWork,
  deleteWork?: Maybe<IWork>,
  deleteManyWorks: IBatchPayload,
};


export type IMutationCreateAssetArgs = {
  data: IAssetCreateInput
};


export type IMutationUpdateAssetArgs = {
  data: IAssetUpdateInput,
  where: IAssetWhereUniqueInput
};


export type IMutationUpdateManyAssetsArgs = {
  data: IAssetUpdateManyMutationInput,
  where?: Maybe<IAssetWhereInput>
};


export type IMutationUpsertAssetArgs = {
  where: IAssetWhereUniqueInput,
  create: IAssetCreateInput,
  update: IAssetUpdateInput
};


export type IMutationDeleteAssetArgs = {
  where: IAssetWhereUniqueInput
};


export type IMutationDeleteManyAssetsArgs = {
  where?: Maybe<IAssetWhereInput>
};


export type IMutationCreateEntityArgs = {
  data: IEntityCreateInput
};


export type IMutationUpdateEntityArgs = {
  data: IEntityUpdateInput,
  where: IEntityWhereUniqueInput
};


export type IMutationUpdateManyEntitiesArgs = {
  data: IEntityUpdateManyMutationInput,
  where?: Maybe<IEntityWhereInput>
};


export type IMutationUpsertEntityArgs = {
  where: IEntityWhereUniqueInput,
  create: IEntityCreateInput,
  update: IEntityUpdateInput
};


export type IMutationDeleteEntityArgs = {
  where: IEntityWhereUniqueInput
};


export type IMutationDeleteManyEntitiesArgs = {
  where?: Maybe<IEntityWhereInput>
};


export type IMutationCreateExhibitionArgs = {
  data: IExhibitionCreateInput
};


export type IMutationUpdateExhibitionArgs = {
  data: IExhibitionUpdateInput,
  where: IExhibitionWhereUniqueInput
};


export type IMutationUpdateManyExhibitionsArgs = {
  data: IExhibitionUpdateManyMutationInput,
  where?: Maybe<IExhibitionWhereInput>
};


export type IMutationUpsertExhibitionArgs = {
  where: IExhibitionWhereUniqueInput,
  create: IExhibitionCreateInput,
  update: IExhibitionUpdateInput
};


export type IMutationDeleteExhibitionArgs = {
  where: IExhibitionWhereUniqueInput
};


export type IMutationDeleteManyExhibitionsArgs = {
  where?: Maybe<IExhibitionWhereInput>
};


export type IMutationCreateIssueArgs = {
  data: IIssueCreateInput
};


export type IMutationUpdateIssueArgs = {
  data: IIssueUpdateInput,
  where: IIssueWhereUniqueInput
};


export type IMutationUpdateManyIssuesArgs = {
  data: IIssueUpdateManyMutationInput,
  where?: Maybe<IIssueWhereInput>
};


export type IMutationUpsertIssueArgs = {
  where: IIssueWhereUniqueInput,
  create: IIssueCreateInput,
  update: IIssueUpdateInput
};


export type IMutationDeleteIssueArgs = {
  where: IIssueWhereUniqueInput
};


export type IMutationDeleteManyIssuesArgs = {
  where?: Maybe<IIssueWhereInput>
};


export type IMutationCreateShowArgs = {
  data: IShowCreateInput
};


export type IMutationUpdateShowArgs = {
  data: IShowUpdateInput,
  where: IShowWhereUniqueInput
};


export type IMutationUpdateManyShowsArgs = {
  data: IShowUpdateManyMutationInput,
  where?: Maybe<IShowWhereInput>
};


export type IMutationUpsertShowArgs = {
  where: IShowWhereUniqueInput,
  create: IShowCreateInput,
  update: IShowUpdateInput
};


export type IMutationDeleteShowArgs = {
  where: IShowWhereUniqueInput
};


export type IMutationDeleteManyShowsArgs = {
  where?: Maybe<IShowWhereInput>
};


export type IMutationCreateWorkArgs = {
  data: IWorkCreateInput
};


export type IMutationUpdateWorkArgs = {
  data: IWorkUpdateInput,
  where: IWorkWhereUniqueInput
};


export type IMutationUpdateManyWorksArgs = {
  data: IWorkUpdateManyMutationInput,
  where?: Maybe<IWorkWhereInput>
};


export type IMutationUpsertWorkArgs = {
  where: IWorkWhereUniqueInput,
  create: IWorkCreateInput,
  update: IWorkUpdateInput
};


export type IMutationDeleteWorkArgs = {
  where: IWorkWhereUniqueInput
};


export type IMutationDeleteManyWorksArgs = {
  where?: Maybe<IWorkWhereInput>
};

export enum IMutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type INode = {
  id: Scalars['ID'],
};

export type IPageInfo = {
  __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type IQuery = {
  __typename?: 'Query',
  asset?: Maybe<IAsset>,
  assets: Array<Maybe<IAsset>>,
  assetsConnection: IAssetConnection,
  entity?: Maybe<IEntity>,
  entities: Array<Maybe<IEntity>>,
  entitiesConnection: IEntityConnection,
  exhibition?: Maybe<IExhibition>,
  exhibitions: Array<Maybe<IExhibition>>,
  exhibitionsConnection: IExhibitionConnection,
  issue?: Maybe<IIssue>,
  issues: Array<Maybe<IIssue>>,
  issuesConnection: IIssueConnection,
  show?: Maybe<IShow>,
  shows: Array<Maybe<IShow>>,
  showsConnection: IShowConnection,
  work?: Maybe<IWork>,
  works: Array<Maybe<IWork>>,
  worksConnection: IWorkConnection,
  node?: Maybe<INode>,
};


export type IQueryAssetArgs = {
  where: IAssetWhereUniqueInput
};


export type IQueryAssetsArgs = {
  where?: Maybe<IAssetWhereInput>,
  orderBy?: Maybe<IAssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryAssetsConnectionArgs = {
  where?: Maybe<IAssetWhereInput>,
  orderBy?: Maybe<IAssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryEntityArgs = {
  where: IEntityWhereUniqueInput
};


export type IQueryEntitiesArgs = {
  where?: Maybe<IEntityWhereInput>,
  orderBy?: Maybe<IEntityOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryEntitiesConnectionArgs = {
  where?: Maybe<IEntityWhereInput>,
  orderBy?: Maybe<IEntityOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryExhibitionArgs = {
  where: IExhibitionWhereUniqueInput
};


export type IQueryExhibitionsArgs = {
  where?: Maybe<IExhibitionWhereInput>,
  orderBy?: Maybe<IExhibitionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryExhibitionsConnectionArgs = {
  where?: Maybe<IExhibitionWhereInput>,
  orderBy?: Maybe<IExhibitionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryIssueArgs = {
  where: IIssueWhereUniqueInput
};


export type IQueryIssuesArgs = {
  where?: Maybe<IIssueWhereInput>,
  orderBy?: Maybe<IIssueOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryIssuesConnectionArgs = {
  where?: Maybe<IIssueWhereInput>,
  orderBy?: Maybe<IIssueOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryShowArgs = {
  where: IShowWhereUniqueInput
};


export type IQueryShowsArgs = {
  where?: Maybe<IShowWhereInput>,
  orderBy?: Maybe<IShowOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryShowsConnectionArgs = {
  where?: Maybe<IShowWhereInput>,
  orderBy?: Maybe<IShowOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryWorkArgs = {
  where: IWorkWhereUniqueInput
};


export type IQueryWorksArgs = {
  where?: Maybe<IWorkWhereInput>,
  orderBy?: Maybe<IWorkOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryWorksConnectionArgs = {
  where?: Maybe<IWorkWhereInput>,
  orderBy?: Maybe<IWorkOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type IQueryNodeArgs = {
  id: Scalars['ID']
};

export enum IRarity {
  Common = 'COMMON',
  Rare = 'RARE'
}

export type IShow = {
  __typename?: 'Show',
  id: Scalars['ID'],
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  exhibition: IExhibition,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type IShowConnection = {
  __typename?: 'ShowConnection',
  pageInfo: IPageInfo,
  edges: Array<Maybe<IShowEdge>>,
  aggregate: IAggregateShow,
};

export type IShowCreateInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  exhibition: IExhibitionCreateOneWithoutShowsInput,
};

export type IShowCreateManyWithoutExhibitionInput = {
  create?: Maybe<Array<IShowCreateWithoutExhibitionInput>>,
  connect?: Maybe<Array<IShowWhereUniqueInput>>,
};

export type IShowCreateWithoutExhibitionInput = {
  id?: Maybe<Scalars['ID']>,
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
};

export type IShowEdge = {
  __typename?: 'ShowEdge',
  node: IShow,
  cursor: Scalars['String'],
};

export enum IShowOrderByInput {
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

export type IShowPreviousValues = {
  __typename?: 'ShowPreviousValues',
  id: Scalars['ID'],
  number: Scalars['Int'],
  opensAt: Scalars['DateTime'],
  closesAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type IShowScalarWhereInput = {
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
  AND?: Maybe<Array<IShowScalarWhereInput>>,
  OR?: Maybe<Array<IShowScalarWhereInput>>,
  NOT?: Maybe<Array<IShowScalarWhereInput>>,
};

export type IShowSubscriptionPayload = {
  __typename?: 'ShowSubscriptionPayload',
  mutation: IMutationType,
  node?: Maybe<IShow>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IShowPreviousValues>,
};

export type IShowSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<IMutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IShowWhereInput>,
  AND?: Maybe<Array<IShowSubscriptionWhereInput>>,
  OR?: Maybe<Array<IShowSubscriptionWhereInput>>,
  NOT?: Maybe<Array<IShowSubscriptionWhereInput>>,
};

export type IShowUpdateInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
  exhibition?: Maybe<IExhibitionUpdateOneRequiredWithoutShowsInput>,
};

export type IShowUpdateManyDataInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type IShowUpdateManyMutationInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type IShowUpdateManyWithoutExhibitionInput = {
  create?: Maybe<Array<IShowCreateWithoutExhibitionInput>>,
  delete?: Maybe<Array<IShowWhereUniqueInput>>,
  connect?: Maybe<Array<IShowWhereUniqueInput>>,
  set?: Maybe<Array<IShowWhereUniqueInput>>,
  disconnect?: Maybe<Array<IShowWhereUniqueInput>>,
  update?: Maybe<Array<IShowUpdateWithWhereUniqueWithoutExhibitionInput>>,
  upsert?: Maybe<Array<IShowUpsertWithWhereUniqueWithoutExhibitionInput>>,
  deleteMany?: Maybe<Array<IShowScalarWhereInput>>,
  updateMany?: Maybe<Array<IShowUpdateManyWithWhereNestedInput>>,
};

export type IShowUpdateManyWithWhereNestedInput = {
  where: IShowScalarWhereInput,
  data: IShowUpdateManyDataInput,
};

export type IShowUpdateWithoutExhibitionDataInput = {
  number?: Maybe<Scalars['Int']>,
  opensAt?: Maybe<Scalars['DateTime']>,
  closesAt?: Maybe<Scalars['DateTime']>,
};

export type IShowUpdateWithWhereUniqueWithoutExhibitionInput = {
  where: IShowWhereUniqueInput,
  data: IShowUpdateWithoutExhibitionDataInput,
};

export type IShowUpsertWithWhereUniqueWithoutExhibitionInput = {
  where: IShowWhereUniqueInput,
  update: IShowUpdateWithoutExhibitionDataInput,
  create: IShowCreateWithoutExhibitionInput,
};

export type IShowWhereInput = {
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
  exhibition?: Maybe<IExhibitionWhereInput>,
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
  AND?: Maybe<Array<IShowWhereInput>>,
  OR?: Maybe<Array<IShowWhereInput>>,
  NOT?: Maybe<Array<IShowWhereInput>>,
};

export type IShowWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type ISubscription = {
  __typename?: 'Subscription',
  asset?: Maybe<IAssetSubscriptionPayload>,
  entity?: Maybe<IEntitySubscriptionPayload>,
  exhibition?: Maybe<IExhibitionSubscriptionPayload>,
  issue?: Maybe<IIssueSubscriptionPayload>,
  show?: Maybe<IShowSubscriptionPayload>,
  work?: Maybe<IWorkSubscriptionPayload>,
};


export type ISubscriptionAssetArgs = {
  where?: Maybe<IAssetSubscriptionWhereInput>
};


export type ISubscriptionEntityArgs = {
  where?: Maybe<IEntitySubscriptionWhereInput>
};


export type ISubscriptionExhibitionArgs = {
  where?: Maybe<IExhibitionSubscriptionWhereInput>
};


export type ISubscriptionIssueArgs = {
  where?: Maybe<IIssueSubscriptionWhereInput>
};


export type ISubscriptionShowArgs = {
  where?: Maybe<IShowSubscriptionWhereInput>
};


export type ISubscriptionWorkArgs = {
  where?: Maybe<IWorkSubscriptionWhereInput>
};

export type IWork = {
  __typename?: 'Work',
  id: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
  assets?: Maybe<Array<IAsset>>,
};


export type IWorkAssetsArgs = {
  where?: Maybe<IAssetWhereInput>,
  orderBy?: Maybe<IAssetOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type IWorkConnection = {
  __typename?: 'WorkConnection',
  pageInfo: IPageInfo,
  edges: Array<Maybe<IWorkEdge>>,
  aggregate: IAggregateWork,
};

export type IWorkCreateInput = {
  id?: Maybe<Scalars['ID']>,
  x: Scalars['Int'],
  y: Scalars['Int'],
  assets?: Maybe<IAssetCreateManyWithoutWorksInput>,
};

export type IWorkCreateManyWithoutAssetsInput = {
  create?: Maybe<Array<IWorkCreateWithoutAssetsInput>>,
  connect?: Maybe<Array<IWorkWhereUniqueInput>>,
};

export type IWorkCreateWithoutAssetsInput = {
  id?: Maybe<Scalars['ID']>,
  x: Scalars['Int'],
  y: Scalars['Int'],
};

export type IWorkEdge = {
  __typename?: 'WorkEdge',
  node: IWork,
  cursor: Scalars['String'],
};

export enum IWorkOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  XAsc = 'x_ASC',
  XDesc = 'x_DESC',
  YAsc = 'y_ASC',
  YDesc = 'y_DESC'
}

export type IWorkPreviousValues = {
  __typename?: 'WorkPreviousValues',
  id: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int'],
};

export type IWorkScalarWhereInput = {
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
  AND?: Maybe<Array<IWorkScalarWhereInput>>,
  OR?: Maybe<Array<IWorkScalarWhereInput>>,
  NOT?: Maybe<Array<IWorkScalarWhereInput>>,
};

export type IWorkSubscriptionPayload = {
  __typename?: 'WorkSubscriptionPayload',
  mutation: IMutationType,
  node?: Maybe<IWork>,
  updatedFields?: Maybe<Array<Scalars['String']>>,
  previousValues?: Maybe<IWorkPreviousValues>,
};

export type IWorkSubscriptionWhereInput = {
  mutation_in?: Maybe<Array<IMutationType>>,
  updatedFields_contains?: Maybe<Scalars['String']>,
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>,
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>,
  node?: Maybe<IWorkWhereInput>,
  AND?: Maybe<Array<IWorkSubscriptionWhereInput>>,
  OR?: Maybe<Array<IWorkSubscriptionWhereInput>>,
  NOT?: Maybe<Array<IWorkSubscriptionWhereInput>>,
};

export type IWorkUpdateInput = {
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
  assets?: Maybe<IAssetUpdateManyWithoutWorksInput>,
};

export type IWorkUpdateManyDataInput = {
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
};

export type IWorkUpdateManyMutationInput = {
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
};

export type IWorkUpdateManyWithoutAssetsInput = {
  create?: Maybe<Array<IWorkCreateWithoutAssetsInput>>,
  delete?: Maybe<Array<IWorkWhereUniqueInput>>,
  connect?: Maybe<Array<IWorkWhereUniqueInput>>,
  set?: Maybe<Array<IWorkWhereUniqueInput>>,
  disconnect?: Maybe<Array<IWorkWhereUniqueInput>>,
  update?: Maybe<Array<IWorkUpdateWithWhereUniqueWithoutAssetsInput>>,
  upsert?: Maybe<Array<IWorkUpsertWithWhereUniqueWithoutAssetsInput>>,
  deleteMany?: Maybe<Array<IWorkScalarWhereInput>>,
  updateMany?: Maybe<Array<IWorkUpdateManyWithWhereNestedInput>>,
};

export type IWorkUpdateManyWithWhereNestedInput = {
  where: IWorkScalarWhereInput,
  data: IWorkUpdateManyDataInput,
};

export type IWorkUpdateWithoutAssetsDataInput = {
  x?: Maybe<Scalars['Int']>,
  y?: Maybe<Scalars['Int']>,
};

export type IWorkUpdateWithWhereUniqueWithoutAssetsInput = {
  where: IWorkWhereUniqueInput,
  data: IWorkUpdateWithoutAssetsDataInput,
};

export type IWorkUpsertWithWhereUniqueWithoutAssetsInput = {
  where: IWorkWhereUniqueInput,
  update: IWorkUpdateWithoutAssetsDataInput,
  create: IWorkCreateWithoutAssetsInput,
};

export type IWorkWhereInput = {
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
  assets_every?: Maybe<IAssetWhereInput>,
  assets_some?: Maybe<IAssetWhereInput>,
  assets_none?: Maybe<IAssetWhereInput>,
  AND?: Maybe<Array<IWorkWhereInput>>,
  OR?: Maybe<Array<IWorkWhereInput>>,
  NOT?: Maybe<Array<IWorkWhereInput>>,
};

export type IWorkWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};
export type ICurrentExhibitionQueryVariables = {};


export type ICurrentExhibitionQuery = (
  { __typename?: 'Query' }
  & { exhibitions: Array<Maybe<(
    { __typename?: 'Exhibition' }
    & Pick<IExhibition, 'id' | 'number' | 'extent' | 'theme' | 'opensAt' | 'closesAt'>
    & { shows: Maybe<Array<(
      { __typename?: 'Show' }
      & Pick<IShow, 'id' | 'number' | 'opensAt' | 'closesAt'>
    )>> }
  )>> }
);

export type ITestSubscriptionVariables = {};


export type ITestSubscription = (
  { __typename?: 'Subscription' }
  & { issue: Maybe<(
    { __typename?: 'IssueSubscriptionPayload' }
    & Pick<IIssueSubscriptionPayload, 'updatedFields'>
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
  }
}
    `;

    export function useCurrentExhibitionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ICurrentExhibitionQuery, ICurrentExhibitionQueryVariables>) {
      return ApolloReactHooks.useQuery<ICurrentExhibitionQuery, ICurrentExhibitionQueryVariables>(CurrentExhibitionDocument, baseOptions);
    };
      export function useCurrentExhibitionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ICurrentExhibitionQuery, ICurrentExhibitionQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ICurrentExhibitionQuery, ICurrentExhibitionQueryVariables>(CurrentExhibitionDocument, baseOptions);
      };
      
export type CurrentExhibitionQueryHookResult = ReturnType<typeof useCurrentExhibitionQuery>;
export type CurrentExhibitionQueryResult = ApolloReactCommon.QueryResult<ICurrentExhibitionQuery, ICurrentExhibitionQueryVariables>;
export const TestDocument = gql`
    subscription Test {
  issue(where: {node: {id: "cjznzwhmf003m072105217so8"}, mutation_in: [UPDATED]}) {
    updatedFields
  }
}
    `;

    export function useTestSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ITestSubscription, ITestSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<ITestSubscription, ITestSubscriptionVariables>(TestDocument, baseOptions);
    };
export type TestSubscriptionHookResult = ReturnType<typeof useTestSubscription>;
export type TestSubscriptionResult = ApolloReactCommon.SubscriptionResult<ITestSubscription>;