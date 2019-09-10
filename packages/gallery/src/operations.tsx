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

export type CouponRedemption = {
  __typename?: 'CouponRedemption',
  id: Scalars['ID'],
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
  capacity: Scalars['Int'],
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
  createSession: Scalars['String'],
  createPlacement?: Maybe<Placement>,
  redeemTicket: Ticket,
  awardWalk: Asset,
  redeemCoupon: CouponRedemption,
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


export type MutationAwardWalkArgs = {
  image: Scalars['String']
};


export type MutationRedeemCouponArgs = {
  code: Scalars['String']
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
export type AwardWalkMutationVariables = {
  image: Scalars['String']
};


export type AwardWalkMutation = (
  { __typename?: 'Mutation' }
  & { awardWalk: (
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'domain' | 'uri'>
  ) }
);

export type CreatePlacementMutationVariables = {
  assetId: Scalars['ID'],
  roomId: Scalars['ID'],
  x: Scalars['Int'],
  y: Scalars['Int']
};


export type CreatePlacementMutation = (
  { __typename?: 'Mutation' }
  & { createPlacement: Maybe<(
    { __typename?: 'Placement' }
    & Pick<Placement, 'id'>
    & { assets: Array<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'id' | 'domain' | 'uri'>
    )> }
  )> }
);

export type CreateSessionMutationVariables = {};


export type CreateSessionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSession'>
);

export type CurrentEntityQueryVariables = {};


export type CurrentEntityQuery = (
  { __typename?: 'Query' }
  & { currentEntity: (
    { __typename?: 'Entity' }
    & Pick<Entity, 'id' | 'handle'>
    & { availableTicket: Maybe<(
      { __typename?: 'Ticket' }
      & Pick<Ticket, 'id'>
    )>, assets: Array<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'id' | 'domain' | 'uri'>
    )>, tradableAssets: Array<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'id' | 'domain' | 'uri'>
    )> }
  ) }
);

export type CurrentExhibitionQueryVariables = {};


export type CurrentExhibitionQuery = (
  { __typename?: 'Query' }
  & { currentExhibition: Maybe<(
    { __typename?: 'Exhibition' }
    & Pick<Exhibition, 'id' | 'title' | 'number' | 'extent' | 'theme' | 'ticketsAvailable' | 'currentTicketPrice' | 'capacity'>
    & { shows: Maybe<Array<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'number' | 'opensAt' | 'closesAt'>
    )>>, rooms: Maybe<Array<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'entryId' | 'x' | 'y'>
    )>> }
  )> }
);

export type LoginAsMutationVariables = {
  accessToken: Scalars['String']
};


export type LoginAsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginAs'>
);

export type RedeemCouponMutationVariables = {
  code: Scalars['String']
};


export type RedeemCouponMutation = (
  { __typename?: 'Mutation' }
  & { redeemCoupon: (
    { __typename?: 'CouponRedemption' }
    & Pick<CouponRedemption, 'id'>
  ) }
);

export type RedeemTicketMutationVariables = {};


export type RedeemTicketMutation = (
  { __typename?: 'Mutation' }
  & { redeemTicket: (
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'redeemed'>
  ) }
);

export const AwardWalkDocument = gql`
    mutation AwardWalk($image: String!) {
  awardWalk(image: $image) {
    id
    domain
    uri
  }
}
    `;
export type AwardWalkMutationFn = ApolloReactCommon.MutationFunction<AwardWalkMutation, AwardWalkMutationVariables>;

    export function useAwardWalkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AwardWalkMutation, AwardWalkMutationVariables>) {
      return ApolloReactHooks.useMutation<AwardWalkMutation, AwardWalkMutationVariables>(AwardWalkDocument, baseOptions);
    };
export type AwardWalkMutationHookResult = ReturnType<typeof useAwardWalkMutation>;
export type AwardWalkMutationResult = ApolloReactCommon.MutationResult<AwardWalkMutation>;
export type AwardWalkMutationOptions = ApolloReactCommon.BaseMutationOptions<AwardWalkMutation, AwardWalkMutationVariables>;
export const CreatePlacementDocument = gql`
    mutation CreatePlacement($assetId: ID!, $roomId: ID!, $x: Int!, $y: Int!) {
  createPlacement(assetId: $assetId, roomId: $roomId, x: $x, y: $y) {
    id
    assets {
      id
      domain
      uri
    }
  }
}
    `;
export type CreatePlacementMutationFn = ApolloReactCommon.MutationFunction<CreatePlacementMutation, CreatePlacementMutationVariables>;

    export function useCreatePlacementMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlacementMutation, CreatePlacementMutationVariables>) {
      return ApolloReactHooks.useMutation<CreatePlacementMutation, CreatePlacementMutationVariables>(CreatePlacementDocument, baseOptions);
    };
export type CreatePlacementMutationHookResult = ReturnType<typeof useCreatePlacementMutation>;
export type CreatePlacementMutationResult = ApolloReactCommon.MutationResult<CreatePlacementMutation>;
export type CreatePlacementMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePlacementMutation, CreatePlacementMutationVariables>;
export const CreateSessionDocument = gql`
    mutation CreateSession {
  createSession
}
    `;
export type CreateSessionMutationFn = ApolloReactCommon.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

    export function useCreateSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, baseOptions);
    };
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = ApolloReactCommon.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const CurrentEntityDocument = gql`
    query CurrentEntity {
  currentEntity {
    id
    handle
    availableTicket {
      id
    }
    assets {
      id
      domain
      uri
    }
    tradableAssets {
      id
      domain
      uri
    }
  }
}
    `;

    export function useCurrentEntityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentEntityQuery, CurrentEntityQueryVariables>) {
      return ApolloReactHooks.useQuery<CurrentEntityQuery, CurrentEntityQueryVariables>(CurrentEntityDocument, baseOptions);
    };
      export function useCurrentEntityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentEntityQuery, CurrentEntityQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<CurrentEntityQuery, CurrentEntityQueryVariables>(CurrentEntityDocument, baseOptions);
      };
      
export type CurrentEntityQueryHookResult = ReturnType<typeof useCurrentEntityQuery>;
export type CurrentEntityQueryResult = ApolloReactCommon.QueryResult<CurrentEntityQuery, CurrentEntityQueryVariables>;
export const CurrentExhibitionDocument = gql`
    query CurrentExhibition {
  currentExhibition {
    id
    title
    number
    extent
    theme
    ticketsAvailable
    currentTicketPrice
    capacity
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
export const LoginAsDocument = gql`
    mutation LoginAs($accessToken: String!) {
  loginAs(accessToken: $accessToken)
}
    `;
export type LoginAsMutationFn = ApolloReactCommon.MutationFunction<LoginAsMutation, LoginAsMutationVariables>;

    export function useLoginAsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginAsMutation, LoginAsMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginAsMutation, LoginAsMutationVariables>(LoginAsDocument, baseOptions);
    };
export type LoginAsMutationHookResult = ReturnType<typeof useLoginAsMutation>;
export type LoginAsMutationResult = ApolloReactCommon.MutationResult<LoginAsMutation>;
export type LoginAsMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginAsMutation, LoginAsMutationVariables>;
export const RedeemCouponDocument = gql`
    mutation RedeemCoupon($code: String!) {
  redeemCoupon(code: $code) {
    id
  }
}
    `;
export type RedeemCouponMutationFn = ApolloReactCommon.MutationFunction<RedeemCouponMutation, RedeemCouponMutationVariables>;

    export function useRedeemCouponMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RedeemCouponMutation, RedeemCouponMutationVariables>) {
      return ApolloReactHooks.useMutation<RedeemCouponMutation, RedeemCouponMutationVariables>(RedeemCouponDocument, baseOptions);
    };
export type RedeemCouponMutationHookResult = ReturnType<typeof useRedeemCouponMutation>;
export type RedeemCouponMutationResult = ApolloReactCommon.MutationResult<RedeemCouponMutation>;
export type RedeemCouponMutationOptions = ApolloReactCommon.BaseMutationOptions<RedeemCouponMutation, RedeemCouponMutationVariables>;
export const RedeemTicketDocument = gql`
    mutation RedeemTicket {
  redeemTicket {
    id
    redeemed
  }
}
    `;
export type RedeemTicketMutationFn = ApolloReactCommon.MutationFunction<RedeemTicketMutation, RedeemTicketMutationVariables>;

    export function useRedeemTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RedeemTicketMutation, RedeemTicketMutationVariables>) {
      return ApolloReactHooks.useMutation<RedeemTicketMutation, RedeemTicketMutationVariables>(RedeemTicketDocument, baseOptions);
    };
export type RedeemTicketMutationHookResult = ReturnType<typeof useRedeemTicketMutation>;
export type RedeemTicketMutationResult = ApolloReactCommon.MutationResult<RedeemTicketMutation>;
export type RedeemTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<RedeemTicketMutation, RedeemTicketMutationVariables>;