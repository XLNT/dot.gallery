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
  loginAs: Entity,
  createEntity: Entity,
  createAsset: Asset,
};


export type MutationLoginAsArgs = {
  accessToken: Scalars['String'],
  privateKey: Scalars['String']
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
export type CreateAssetMutationVariables = {
  ownerId: Scalars['ID'],
  uri: Scalars['String']
};


export type CreateAssetMutation = (
  { __typename?: 'Mutation' }
  & { createAsset: (
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'uri'>
    & { owner: (
      { __typename?: 'Entity' }
      & Pick<Entity, 'id'>
    ) }
  ) }
);

export type CreateEntityMutationVariables = {};


export type CreateEntityMutation = (
  { __typename?: 'Mutation' }
  & { createEntity: (
    { __typename?: 'Entity' }
    & Pick<Entity, 'id'>
  ) }
);

export type CurrentExhibitionQueryVariables = {};


export type CurrentExhibitionQuery = (
  { __typename?: 'Query' }
  & { currentExhibition: Maybe<(
    { __typename?: 'Exhibition' }
    & Pick<Exhibition, 'id' | 'title' | 'number' | 'extent' | 'theme'>
    & { shows: Maybe<Array<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'number' | 'opensAt' | 'closesAt'>
    )>>, rooms: Maybe<Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'entryId' | 'x' | 'y'>
    )>> }
  )> }
);

export type EntityQueryVariables = {
  id: Scalars['ID']
};


export type EntityQuery = (
  { __typename?: 'Query' }
  & { entity: (
    { __typename?: 'Entity' }
    & Pick<Entity, 'id' | 'handle'>
    & { ownedAssets: Maybe<Array<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'id' | 'uri'>
    )>> }
  ) }
);

export const CreateAssetDocument = gql`
    mutation CreateAsset($ownerId: ID!, $uri: String!) {
  createAsset(ownerId: $ownerId, uri: $uri) {
    id
    uri
    owner {
      id
    }
  }
}
    `;
export type CreateAssetMutationFn = ApolloReactCommon.MutationFunction<CreateAssetMutation, CreateAssetMutationVariables>;

    export function useCreateAssetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAssetMutation, CreateAssetMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, baseOptions);
    };
export type CreateAssetMutationHookResult = ReturnType<typeof useCreateAssetMutation>;
export type CreateAssetMutationResult = ApolloReactCommon.MutationResult<CreateAssetMutation>;
export type CreateAssetMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>;
export const CreateEntityDocument = gql`
    mutation CreateEntity {
  createEntity {
    id
  }
}
    `;
export type CreateEntityMutationFn = ApolloReactCommon.MutationFunction<CreateEntityMutation, CreateEntityMutationVariables>;

    export function useCreateEntityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEntityMutation, CreateEntityMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateEntityMutation, CreateEntityMutationVariables>(CreateEntityDocument, baseOptions);
    };
export type CreateEntityMutationHookResult = ReturnType<typeof useCreateEntityMutation>;
export type CreateEntityMutationResult = ApolloReactCommon.MutationResult<CreateEntityMutation>;
export type CreateEntityMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEntityMutation, CreateEntityMutationVariables>;
export const CurrentExhibitionDocument = gql`
    query CurrentExhibition {
  currentExhibition {
    id
    title
    number
    extent
    theme
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
export const EntityDocument = gql`
    query Entity($id: ID!) {
  entity(id: $id) {
    id
    handle
    ownedAssets {
      id
      uri
    }
  }
}
    `;

    export function useEntityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EntityQuery, EntityQueryVariables>) {
      return ApolloReactHooks.useQuery<EntityQuery, EntityQueryVariables>(EntityDocument, baseOptions);
    };
      export function useEntityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EntityQuery, EntityQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<EntityQuery, EntityQueryVariables>(EntityDocument, baseOptions);
      };
      
export type EntityQueryHookResult = ReturnType<typeof useEntityQuery>;
export type EntityQueryResult = ApolloReactCommon.QueryResult<EntityQuery, EntityQueryVariables>;