// Code generated by Prisma (prisma@1.34.6). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateAsset {
  count: Int!
}

type AggregateEntity {
  count: Int!
}

type AggregateExhibition {
  count: Int!
}

type AggregateRoom {
  count: Int!
}

type AggregateShow {
  count: Int!
}

type Asset {
  id: ID!
  uri: String!
  owner: Entity!
  rooms(where: RoomWhereInput, orderBy: RoomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Room!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type AssetConnection {
  pageInfo: PageInfo!
  edges: [AssetEdge]!
  aggregate: AggregateAsset!
}

input AssetCreateInput {
  id: ID
  uri: String!
  owner: EntityCreateOneWithoutOwnedAssetsInput!
  rooms: RoomCreateManyWithoutAssetInput
}

input AssetCreateManyWithoutOwnerInput {
  create: [AssetCreateWithoutOwnerInput!]
  connect: [AssetWhereUniqueInput!]
}

input AssetCreateOneWithoutRoomsInput {
  create: AssetCreateWithoutRoomsInput
  connect: AssetWhereUniqueInput
}

input AssetCreateWithoutOwnerInput {
  id: ID
  uri: String!
  rooms: RoomCreateManyWithoutAssetInput
}

input AssetCreateWithoutRoomsInput {
  id: ID
  uri: String!
  owner: EntityCreateOneWithoutOwnedAssetsInput!
}

type AssetEdge {
  node: Asset!
  cursor: String!
}

enum AssetOrderByInput {
  id_ASC
  id_DESC
  uri_ASC
  uri_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AssetPreviousValues {
  id: ID!
  uri: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input AssetScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  uri: String
  uri_not: String
  uri_in: [String!]
  uri_not_in: [String!]
  uri_lt: String
  uri_lte: String
  uri_gt: String
  uri_gte: String
  uri_contains: String
  uri_not_contains: String
  uri_starts_with: String
  uri_not_starts_with: String
  uri_ends_with: String
  uri_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [AssetScalarWhereInput!]
  OR: [AssetScalarWhereInput!]
  NOT: [AssetScalarWhereInput!]
}

type AssetSubscriptionPayload {
  mutation: MutationType!
  node: Asset
  updatedFields: [String!]
  previousValues: AssetPreviousValues
}

input AssetSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AssetWhereInput
  AND: [AssetSubscriptionWhereInput!]
  OR: [AssetSubscriptionWhereInput!]
  NOT: [AssetSubscriptionWhereInput!]
}

input AssetUpdateInput {
  uri: String
  owner: EntityUpdateOneRequiredWithoutOwnedAssetsInput
  rooms: RoomUpdateManyWithoutAssetInput
}

input AssetUpdateManyDataInput {
  uri: String
}

input AssetUpdateManyMutationInput {
  uri: String
}

input AssetUpdateManyWithoutOwnerInput {
  create: [AssetCreateWithoutOwnerInput!]
  delete: [AssetWhereUniqueInput!]
  connect: [AssetWhereUniqueInput!]
  set: [AssetWhereUniqueInput!]
  disconnect: [AssetWhereUniqueInput!]
  update: [AssetUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [AssetUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [AssetScalarWhereInput!]
  updateMany: [AssetUpdateManyWithWhereNestedInput!]
}

input AssetUpdateManyWithWhereNestedInput {
  where: AssetScalarWhereInput!
  data: AssetUpdateManyDataInput!
}

input AssetUpdateOneRequiredWithoutRoomsInput {
  create: AssetCreateWithoutRoomsInput
  update: AssetUpdateWithoutRoomsDataInput
  upsert: AssetUpsertWithoutRoomsInput
  connect: AssetWhereUniqueInput
}

input AssetUpdateWithoutOwnerDataInput {
  uri: String
  rooms: RoomUpdateManyWithoutAssetInput
}

input AssetUpdateWithoutRoomsDataInput {
  uri: String
  owner: EntityUpdateOneRequiredWithoutOwnedAssetsInput
}

input AssetUpdateWithWhereUniqueWithoutOwnerInput {
  where: AssetWhereUniqueInput!
  data: AssetUpdateWithoutOwnerDataInput!
}

input AssetUpsertWithoutRoomsInput {
  update: AssetUpdateWithoutRoomsDataInput!
  create: AssetCreateWithoutRoomsInput!
}

input AssetUpsertWithWhereUniqueWithoutOwnerInput {
  where: AssetWhereUniqueInput!
  update: AssetUpdateWithoutOwnerDataInput!
  create: AssetCreateWithoutOwnerInput!
}

input AssetWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  uri: String
  uri_not: String
  uri_in: [String!]
  uri_not_in: [String!]
  uri_lt: String
  uri_lte: String
  uri_gt: String
  uri_gte: String
  uri_contains: String
  uri_not_contains: String
  uri_starts_with: String
  uri_not_starts_with: String
  uri_ends_with: String
  uri_not_ends_with: String
  owner: EntityWhereInput
  rooms_every: RoomWhereInput
  rooms_some: RoomWhereInput
  rooms_none: RoomWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [AssetWhereInput!]
  OR: [AssetWhereInput!]
  NOT: [AssetWhereInput!]
}

input AssetWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Entity {
  id: ID!
  handle: String
  ownedAssets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EntityConnection {
  pageInfo: PageInfo!
  edges: [EntityEdge]!
  aggregate: AggregateEntity!
}

input EntityCreateInput {
  id: ID
  handle: String
  ownedAssets: AssetCreateManyWithoutOwnerInput
}

input EntityCreateOneWithoutOwnedAssetsInput {
  create: EntityCreateWithoutOwnedAssetsInput
  connect: EntityWhereUniqueInput
}

input EntityCreateWithoutOwnedAssetsInput {
  id: ID
  handle: String
}

type EntityEdge {
  node: Entity!
  cursor: String!
}

enum EntityOrderByInput {
  id_ASC
  id_DESC
  handle_ASC
  handle_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityPreviousValues {
  id: ID!
  handle: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EntitySubscriptionPayload {
  mutation: MutationType!
  node: Entity
  updatedFields: [String!]
  previousValues: EntityPreviousValues
}

input EntitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityWhereInput
  AND: [EntitySubscriptionWhereInput!]
  OR: [EntitySubscriptionWhereInput!]
  NOT: [EntitySubscriptionWhereInput!]
}

input EntityUpdateInput {
  handle: String
  ownedAssets: AssetUpdateManyWithoutOwnerInput
}

input EntityUpdateManyMutationInput {
  handle: String
}

input EntityUpdateOneRequiredWithoutOwnedAssetsInput {
  create: EntityCreateWithoutOwnedAssetsInput
  update: EntityUpdateWithoutOwnedAssetsDataInput
  upsert: EntityUpsertWithoutOwnedAssetsInput
  connect: EntityWhereUniqueInput
}

input EntityUpdateWithoutOwnedAssetsDataInput {
  handle: String
}

input EntityUpsertWithoutOwnedAssetsInput {
  update: EntityUpdateWithoutOwnedAssetsDataInput!
  create: EntityCreateWithoutOwnedAssetsInput!
}

input EntityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  handle: String
  handle_not: String
  handle_in: [String!]
  handle_not_in: [String!]
  handle_lt: String
  handle_lte: String
  handle_gt: String
  handle_gte: String
  handle_contains: String
  handle_not_contains: String
  handle_starts_with: String
  handle_not_starts_with: String
  handle_ends_with: String
  handle_not_ends_with: String
  ownedAssets_every: AssetWhereInput
  ownedAssets_some: AssetWhereInput
  ownedAssets_none: AssetWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [EntityWhereInput!]
  OR: [EntityWhereInput!]
  NOT: [EntityWhereInput!]
}

input EntityWhereUniqueInput {
  id: ID
  handle: String
}

type Exhibition {
  id: ID!
  title: String!
  number: Int!
  theme: Json
  extent: Int!
  shows(where: ShowWhereInput, orderBy: ShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Show!]
  rooms(where: RoomWhereInput, orderBy: RoomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Room!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ExhibitionConnection {
  pageInfo: PageInfo!
  edges: [ExhibitionEdge]!
  aggregate: AggregateExhibition!
}

input ExhibitionCreateInput {
  id: ID
  title: String!
  number: Int!
  theme: Json
  extent: Int
  shows: ShowCreateManyWithoutExhibitionInput
  rooms: RoomCreateManyWithoutExhibitionInput
}

input ExhibitionCreateOneWithoutRoomsInput {
  create: ExhibitionCreateWithoutRoomsInput
  connect: ExhibitionWhereUniqueInput
}

input ExhibitionCreateOneWithoutShowsInput {
  create: ExhibitionCreateWithoutShowsInput
  connect: ExhibitionWhereUniqueInput
}

input ExhibitionCreateWithoutRoomsInput {
  id: ID
  title: String!
  number: Int!
  theme: Json
  extent: Int
  shows: ShowCreateManyWithoutExhibitionInput
}

input ExhibitionCreateWithoutShowsInput {
  id: ID
  title: String!
  number: Int!
  theme: Json
  extent: Int
  rooms: RoomCreateManyWithoutExhibitionInput
}

type ExhibitionEdge {
  node: Exhibition!
  cursor: String!
}

enum ExhibitionOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  number_ASC
  number_DESC
  theme_ASC
  theme_DESC
  extent_ASC
  extent_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ExhibitionPreviousValues {
  id: ID!
  title: String!
  number: Int!
  theme: Json
  extent: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ExhibitionSubscriptionPayload {
  mutation: MutationType!
  node: Exhibition
  updatedFields: [String!]
  previousValues: ExhibitionPreviousValues
}

input ExhibitionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ExhibitionWhereInput
  AND: [ExhibitionSubscriptionWhereInput!]
  OR: [ExhibitionSubscriptionWhereInput!]
  NOT: [ExhibitionSubscriptionWhereInput!]
}

input ExhibitionUpdateInput {
  title: String
  number: Int
  theme: Json
  extent: Int
  shows: ShowUpdateManyWithoutExhibitionInput
  rooms: RoomUpdateManyWithoutExhibitionInput
}

input ExhibitionUpdateManyMutationInput {
  title: String
  number: Int
  theme: Json
  extent: Int
}

input ExhibitionUpdateOneRequiredWithoutRoomsInput {
  create: ExhibitionCreateWithoutRoomsInput
  update: ExhibitionUpdateWithoutRoomsDataInput
  upsert: ExhibitionUpsertWithoutRoomsInput
  connect: ExhibitionWhereUniqueInput
}

input ExhibitionUpdateOneRequiredWithoutShowsInput {
  create: ExhibitionCreateWithoutShowsInput
  update: ExhibitionUpdateWithoutShowsDataInput
  upsert: ExhibitionUpsertWithoutShowsInput
  connect: ExhibitionWhereUniqueInput
}

input ExhibitionUpdateWithoutRoomsDataInput {
  title: String
  number: Int
  theme: Json
  extent: Int
  shows: ShowUpdateManyWithoutExhibitionInput
}

input ExhibitionUpdateWithoutShowsDataInput {
  title: String
  number: Int
  theme: Json
  extent: Int
  rooms: RoomUpdateManyWithoutExhibitionInput
}

input ExhibitionUpsertWithoutRoomsInput {
  update: ExhibitionUpdateWithoutRoomsDataInput!
  create: ExhibitionCreateWithoutRoomsInput!
}

input ExhibitionUpsertWithoutShowsInput {
  update: ExhibitionUpdateWithoutShowsDataInput!
  create: ExhibitionCreateWithoutShowsInput!
}

input ExhibitionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
  extent: Int
  extent_not: Int
  extent_in: [Int!]
  extent_not_in: [Int!]
  extent_lt: Int
  extent_lte: Int
  extent_gt: Int
  extent_gte: Int
  shows_every: ShowWhereInput
  shows_some: ShowWhereInput
  shows_none: ShowWhereInput
  rooms_every: RoomWhereInput
  rooms_some: RoomWhereInput
  rooms_none: RoomWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ExhibitionWhereInput!]
  OR: [ExhibitionWhereInput!]
  NOT: [ExhibitionWhereInput!]
}

input ExhibitionWhereUniqueInput {
  id: ID
  number: Int
}

scalar Json

scalar Long

type Mutation {
  createAsset(data: AssetCreateInput!): Asset!
  updateAsset(data: AssetUpdateInput!, where: AssetWhereUniqueInput!): Asset
  updateManyAssets(data: AssetUpdateManyMutationInput!, where: AssetWhereInput): BatchPayload!
  upsertAsset(where: AssetWhereUniqueInput!, create: AssetCreateInput!, update: AssetUpdateInput!): Asset!
  deleteAsset(where: AssetWhereUniqueInput!): Asset
  deleteManyAssets(where: AssetWhereInput): BatchPayload!
  createEntity(data: EntityCreateInput!): Entity!
  updateEntity(data: EntityUpdateInput!, where: EntityWhereUniqueInput!): Entity
  updateManyEntities(data: EntityUpdateManyMutationInput!, where: EntityWhereInput): BatchPayload!
  upsertEntity(where: EntityWhereUniqueInput!, create: EntityCreateInput!, update: EntityUpdateInput!): Entity!
  deleteEntity(where: EntityWhereUniqueInput!): Entity
  deleteManyEntities(where: EntityWhereInput): BatchPayload!
  createExhibition(data: ExhibitionCreateInput!): Exhibition!
  updateExhibition(data: ExhibitionUpdateInput!, where: ExhibitionWhereUniqueInput!): Exhibition
  updateManyExhibitions(data: ExhibitionUpdateManyMutationInput!, where: ExhibitionWhereInput): BatchPayload!
  upsertExhibition(where: ExhibitionWhereUniqueInput!, create: ExhibitionCreateInput!, update: ExhibitionUpdateInput!): Exhibition!
  deleteExhibition(where: ExhibitionWhereUniqueInput!): Exhibition
  deleteManyExhibitions(where: ExhibitionWhereInput): BatchPayload!
  createRoom(data: RoomCreateInput!): Room!
  updateRoom(data: RoomUpdateInput!, where: RoomWhereUniqueInput!): Room
  updateManyRooms(data: RoomUpdateManyMutationInput!, where: RoomWhereInput): BatchPayload!
  upsertRoom(where: RoomWhereUniqueInput!, create: RoomCreateInput!, update: RoomUpdateInput!): Room!
  deleteRoom(where: RoomWhereUniqueInput!): Room
  deleteManyRooms(where: RoomWhereInput): BatchPayload!
  createShow(data: ShowCreateInput!): Show!
  updateShow(data: ShowUpdateInput!, where: ShowWhereUniqueInput!): Show
  updateManyShows(data: ShowUpdateManyMutationInput!, where: ShowWhereInput): BatchPayload!
  upsertShow(where: ShowWhereUniqueInput!, create: ShowCreateInput!, update: ShowUpdateInput!): Show!
  deleteShow(where: ShowWhereUniqueInput!): Show
  deleteManyShows(where: ShowWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  asset(where: AssetWhereUniqueInput!): Asset
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset]!
  assetsConnection(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssetConnection!
  entity(where: EntityWhereUniqueInput!): Entity
  entities(where: EntityWhereInput, orderBy: EntityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Entity]!
  entitiesConnection(where: EntityWhereInput, orderBy: EntityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityConnection!
  exhibition(where: ExhibitionWhereUniqueInput!): Exhibition
  exhibitions(where: ExhibitionWhereInput, orderBy: ExhibitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Exhibition]!
  exhibitionsConnection(where: ExhibitionWhereInput, orderBy: ExhibitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExhibitionConnection!
  room(where: RoomWhereUniqueInput!): Room
  rooms(where: RoomWhereInput, orderBy: RoomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Room]!
  roomsConnection(where: RoomWhereInput, orderBy: RoomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoomConnection!
  show(where: ShowWhereUniqueInput!): Show
  shows(where: ShowWhereInput, orderBy: ShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Show]!
  showsConnection(where: ShowWhereInput, orderBy: ShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ShowConnection!
  node(id: ID!): Node
}

type Room {
  id: ID!
  entryId: ID!
  x: Int!
  y: Int!
  exhibition: Exhibition!
  asset: Asset!
}

type RoomConnection {
  pageInfo: PageInfo!
  edges: [RoomEdge]!
  aggregate: AggregateRoom!
}

input RoomCreateInput {
  id: ID
  entryId: ID!
  x: Int!
  y: Int!
  exhibition: ExhibitionCreateOneWithoutRoomsInput!
  asset: AssetCreateOneWithoutRoomsInput!
}

input RoomCreateManyWithoutAssetInput {
  create: [RoomCreateWithoutAssetInput!]
  connect: [RoomWhereUniqueInput!]
}

input RoomCreateManyWithoutExhibitionInput {
  create: [RoomCreateWithoutExhibitionInput!]
  connect: [RoomWhereUniqueInput!]
}

input RoomCreateWithoutAssetInput {
  id: ID
  entryId: ID!
  x: Int!
  y: Int!
  exhibition: ExhibitionCreateOneWithoutRoomsInput!
}

input RoomCreateWithoutExhibitionInput {
  id: ID
  entryId: ID!
  x: Int!
  y: Int!
  asset: AssetCreateOneWithoutRoomsInput!
}

type RoomEdge {
  node: Room!
  cursor: String!
}

enum RoomOrderByInput {
  id_ASC
  id_DESC
  entryId_ASC
  entryId_DESC
  x_ASC
  x_DESC
  y_ASC
  y_DESC
}

type RoomPreviousValues {
  id: ID!
  entryId: ID!
  x: Int!
  y: Int!
}

input RoomScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  entryId: ID
  entryId_not: ID
  entryId_in: [ID!]
  entryId_not_in: [ID!]
  entryId_lt: ID
  entryId_lte: ID
  entryId_gt: ID
  entryId_gte: ID
  entryId_contains: ID
  entryId_not_contains: ID
  entryId_starts_with: ID
  entryId_not_starts_with: ID
  entryId_ends_with: ID
  entryId_not_ends_with: ID
  x: Int
  x_not: Int
  x_in: [Int!]
  x_not_in: [Int!]
  x_lt: Int
  x_lte: Int
  x_gt: Int
  x_gte: Int
  y: Int
  y_not: Int
  y_in: [Int!]
  y_not_in: [Int!]
  y_lt: Int
  y_lte: Int
  y_gt: Int
  y_gte: Int
  AND: [RoomScalarWhereInput!]
  OR: [RoomScalarWhereInput!]
  NOT: [RoomScalarWhereInput!]
}

type RoomSubscriptionPayload {
  mutation: MutationType!
  node: Room
  updatedFields: [String!]
  previousValues: RoomPreviousValues
}

input RoomSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RoomWhereInput
  AND: [RoomSubscriptionWhereInput!]
  OR: [RoomSubscriptionWhereInput!]
  NOT: [RoomSubscriptionWhereInput!]
}

input RoomUpdateInput {
  entryId: ID
  x: Int
  y: Int
  exhibition: ExhibitionUpdateOneRequiredWithoutRoomsInput
  asset: AssetUpdateOneRequiredWithoutRoomsInput
}

input RoomUpdateManyDataInput {
  entryId: ID
  x: Int
  y: Int
}

input RoomUpdateManyMutationInput {
  entryId: ID
  x: Int
  y: Int
}

input RoomUpdateManyWithoutAssetInput {
  create: [RoomCreateWithoutAssetInput!]
  delete: [RoomWhereUniqueInput!]
  connect: [RoomWhereUniqueInput!]
  set: [RoomWhereUniqueInput!]
  disconnect: [RoomWhereUniqueInput!]
  update: [RoomUpdateWithWhereUniqueWithoutAssetInput!]
  upsert: [RoomUpsertWithWhereUniqueWithoutAssetInput!]
  deleteMany: [RoomScalarWhereInput!]
  updateMany: [RoomUpdateManyWithWhereNestedInput!]
}

input RoomUpdateManyWithoutExhibitionInput {
  create: [RoomCreateWithoutExhibitionInput!]
  delete: [RoomWhereUniqueInput!]
  connect: [RoomWhereUniqueInput!]
  set: [RoomWhereUniqueInput!]
  disconnect: [RoomWhereUniqueInput!]
  update: [RoomUpdateWithWhereUniqueWithoutExhibitionInput!]
  upsert: [RoomUpsertWithWhereUniqueWithoutExhibitionInput!]
  deleteMany: [RoomScalarWhereInput!]
  updateMany: [RoomUpdateManyWithWhereNestedInput!]
}

input RoomUpdateManyWithWhereNestedInput {
  where: RoomScalarWhereInput!
  data: RoomUpdateManyDataInput!
}

input RoomUpdateWithoutAssetDataInput {
  entryId: ID
  x: Int
  y: Int
  exhibition: ExhibitionUpdateOneRequiredWithoutRoomsInput
}

input RoomUpdateWithoutExhibitionDataInput {
  entryId: ID
  x: Int
  y: Int
  asset: AssetUpdateOneRequiredWithoutRoomsInput
}

input RoomUpdateWithWhereUniqueWithoutAssetInput {
  where: RoomWhereUniqueInput!
  data: RoomUpdateWithoutAssetDataInput!
}

input RoomUpdateWithWhereUniqueWithoutExhibitionInput {
  where: RoomWhereUniqueInput!
  data: RoomUpdateWithoutExhibitionDataInput!
}

input RoomUpsertWithWhereUniqueWithoutAssetInput {
  where: RoomWhereUniqueInput!
  update: RoomUpdateWithoutAssetDataInput!
  create: RoomCreateWithoutAssetInput!
}

input RoomUpsertWithWhereUniqueWithoutExhibitionInput {
  where: RoomWhereUniqueInput!
  update: RoomUpdateWithoutExhibitionDataInput!
  create: RoomCreateWithoutExhibitionInput!
}

input RoomWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  entryId: ID
  entryId_not: ID
  entryId_in: [ID!]
  entryId_not_in: [ID!]
  entryId_lt: ID
  entryId_lte: ID
  entryId_gt: ID
  entryId_gte: ID
  entryId_contains: ID
  entryId_not_contains: ID
  entryId_starts_with: ID
  entryId_not_starts_with: ID
  entryId_ends_with: ID
  entryId_not_ends_with: ID
  x: Int
  x_not: Int
  x_in: [Int!]
  x_not_in: [Int!]
  x_lt: Int
  x_lte: Int
  x_gt: Int
  x_gte: Int
  y: Int
  y_not: Int
  y_in: [Int!]
  y_not_in: [Int!]
  y_lt: Int
  y_lte: Int
  y_gt: Int
  y_gte: Int
  exhibition: ExhibitionWhereInput
  asset: AssetWhereInput
  AND: [RoomWhereInput!]
  OR: [RoomWhereInput!]
  NOT: [RoomWhereInput!]
}

input RoomWhereUniqueInput {
  id: ID
  entryId: ID
}

type Show {
  id: ID!
  number: Int!
  opensAt: DateTime!
  closesAt: DateTime!
  exhibition: Exhibition!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ShowConnection {
  pageInfo: PageInfo!
  edges: [ShowEdge]!
  aggregate: AggregateShow!
}

input ShowCreateInput {
  id: ID
  number: Int!
  opensAt: DateTime!
  closesAt: DateTime!
  exhibition: ExhibitionCreateOneWithoutShowsInput!
}

input ShowCreateManyWithoutExhibitionInput {
  create: [ShowCreateWithoutExhibitionInput!]
  connect: [ShowWhereUniqueInput!]
}

input ShowCreateWithoutExhibitionInput {
  id: ID
  number: Int!
  opensAt: DateTime!
  closesAt: DateTime!
}

type ShowEdge {
  node: Show!
  cursor: String!
}

enum ShowOrderByInput {
  id_ASC
  id_DESC
  number_ASC
  number_DESC
  opensAt_ASC
  opensAt_DESC
  closesAt_ASC
  closesAt_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ShowPreviousValues {
  id: ID!
  number: Int!
  opensAt: DateTime!
  closesAt: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input ShowScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
  opensAt: DateTime
  opensAt_not: DateTime
  opensAt_in: [DateTime!]
  opensAt_not_in: [DateTime!]
  opensAt_lt: DateTime
  opensAt_lte: DateTime
  opensAt_gt: DateTime
  opensAt_gte: DateTime
  closesAt: DateTime
  closesAt_not: DateTime
  closesAt_in: [DateTime!]
  closesAt_not_in: [DateTime!]
  closesAt_lt: DateTime
  closesAt_lte: DateTime
  closesAt_gt: DateTime
  closesAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ShowScalarWhereInput!]
  OR: [ShowScalarWhereInput!]
  NOT: [ShowScalarWhereInput!]
}

type ShowSubscriptionPayload {
  mutation: MutationType!
  node: Show
  updatedFields: [String!]
  previousValues: ShowPreviousValues
}

input ShowSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ShowWhereInput
  AND: [ShowSubscriptionWhereInput!]
  OR: [ShowSubscriptionWhereInput!]
  NOT: [ShowSubscriptionWhereInput!]
}

input ShowUpdateInput {
  number: Int
  opensAt: DateTime
  closesAt: DateTime
  exhibition: ExhibitionUpdateOneRequiredWithoutShowsInput
}

input ShowUpdateManyDataInput {
  number: Int
  opensAt: DateTime
  closesAt: DateTime
}

input ShowUpdateManyMutationInput {
  number: Int
  opensAt: DateTime
  closesAt: DateTime
}

input ShowUpdateManyWithoutExhibitionInput {
  create: [ShowCreateWithoutExhibitionInput!]
  delete: [ShowWhereUniqueInput!]
  connect: [ShowWhereUniqueInput!]
  set: [ShowWhereUniqueInput!]
  disconnect: [ShowWhereUniqueInput!]
  update: [ShowUpdateWithWhereUniqueWithoutExhibitionInput!]
  upsert: [ShowUpsertWithWhereUniqueWithoutExhibitionInput!]
  deleteMany: [ShowScalarWhereInput!]
  updateMany: [ShowUpdateManyWithWhereNestedInput!]
}

input ShowUpdateManyWithWhereNestedInput {
  where: ShowScalarWhereInput!
  data: ShowUpdateManyDataInput!
}

input ShowUpdateWithoutExhibitionDataInput {
  number: Int
  opensAt: DateTime
  closesAt: DateTime
}

input ShowUpdateWithWhereUniqueWithoutExhibitionInput {
  where: ShowWhereUniqueInput!
  data: ShowUpdateWithoutExhibitionDataInput!
}

input ShowUpsertWithWhereUniqueWithoutExhibitionInput {
  where: ShowWhereUniqueInput!
  update: ShowUpdateWithoutExhibitionDataInput!
  create: ShowCreateWithoutExhibitionInput!
}

input ShowWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
  opensAt: DateTime
  opensAt_not: DateTime
  opensAt_in: [DateTime!]
  opensAt_not_in: [DateTime!]
  opensAt_lt: DateTime
  opensAt_lte: DateTime
  opensAt_gt: DateTime
  opensAt_gte: DateTime
  closesAt: DateTime
  closesAt_not: DateTime
  closesAt_in: [DateTime!]
  closesAt_not_in: [DateTime!]
  closesAt_lt: DateTime
  closesAt_lte: DateTime
  closesAt_gt: DateTime
  closesAt_gte: DateTime
  exhibition: ExhibitionWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ShowWhereInput!]
  OR: [ShowWhereInput!]
  NOT: [ShowWhereInput!]
}

input ShowWhereUniqueInput {
  id: ID
}

type Subscription {
  asset(where: AssetSubscriptionWhereInput): AssetSubscriptionPayload
  entity(where: EntitySubscriptionWhereInput): EntitySubscriptionPayload
  exhibition(where: ExhibitionSubscriptionWhereInput): ExhibitionSubscriptionPayload
  room(where: RoomSubscriptionWhereInput): RoomSubscriptionPayload
  show(where: ShowSubscriptionWhereInput): ShowSubscriptionPayload
}
`