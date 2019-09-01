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
  Json: any,
  DateTime: any,
};

export type Asset = {
  __typename?: 'Asset',
  id: Scalars['ID'],
  domain: Scalars['String'],
  uri: Scalars['Json'],
  owner: Entity,
  placement?: Maybe<Placement>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type Entity = {
  __typename?: 'Entity',
  id: Scalars['ID'],
  handle?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  assets: Array<Asset>,
  tradableAssets: Array<Asset>,
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
  createPlacement?: Maybe<Placement>,
  redeemTicket: Ticket,
  modIssueTicket?: Maybe<Ticket>,
};


export type MutationLoginAsArgs = {
  accessToken: Scalars['String']
};


export type MutationCreatePlacementArgs = {
  assetId: Scalars['ID'],
  roomId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int']
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
  assets: Array<Asset>,
  createdAt: Scalars['DateTime'],
};

export type Query = {
  __typename?: 'Query',
  currentEntity: Entity,
  currentExhibition?: Maybe<Exhibition>,
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