import { DateTime } from "luxon";
import { ShowState, getShowState } from "lib/shows";
import { Wallet } from "ethers";
import { format } from "lib/exhibitionSlug";
import { useCreateEntityMutation } from "graphql";
import EntityId from "context/EntityId";
import ExhibitionTimes from "components/ExhibitionTimes";
import GalleryRichText from "components/GalleryRichText";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import PrivateKey from "context/PrivateKey";
import React, { useEffect } from "react";
import WithContentTransition from "components/WithContentTransition";
import contentful from "client/contentful";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import usePromise from "react-use-promise";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const ABOUT_ID = "3myaHf3JO0keiFVJvbvgL4";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  // firefox
  scrollbar-width: none;

  // edge
  -ms-overflow-style: none;

  // webkit
  ::-webkit-scrollbar {
    height: 0 !important;
  }
`;

const ExhibitionTitle = styled.h1`
  margin: 4rem 2rem;
  font-size: 3rem;
`;

const ShowTimes = styled.div`
  margin: 0 auto;
`;

export default function Home() {
  useEnforcePanelVisibility(true);
  useSuggestedPanelState(true);
  const { exhibition, loading, error } = useCurrentExhibition();
  const [result, , state] = usePromise(() => contentful.getEntry<any>(ABOUT_ID), [contentful]);
  const [entityId, setEntityId, entityIdHydrated] = EntityId.useContainer();
  const [privateKey, setPrivateKey, privateKeyHydrated] = PrivateKey.useContainer();
  const [mutate] = useCreateEntityMutation();

  useEffect(() => {
    if (entityIdHydrated && !entityId) {
      mutate().then(({ data: { createEntity: { id } } }) => setEntityId(id));
    }
  }, [entityId, entityIdHydrated, mutate, setEntityId, setPrivateKey]);

  useEffect(() => {
    if (privateKeyHydrated && !privateKey) {
      setPrivateKey(Wallet.createRandom().privateKey);
    }
  }, [privateKey, privateKeyHydrated, setPrivateKey]);

  if (!entityId) {
    return null;
  }

  const renderExhibitionInfo = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <code>{JSON.stringify(error)}</code>;
    }

    if (!exhibition) {
      return <div>No current exhibition found.</div>;
    }

    const shows = exhibition.shows.filter(
      show => getShowState(show.opensAt, show.closesAt) !== ShowState.Past,
    );

    return (
      <>
        <ExhibitionTitle>
          {format(exhibition.number)}: {exhibition.title}
        </ExhibitionTitle>

        <ShowTimes>
          {shows.map((show, i) => {
            const realOpensAt =
              i === 0
                ? DateTime.local()
                    .toUTC()
                    .minus({ hour: 1 })
                    .toString()
                : show.opensAt;
            return (
              <ExhibitionTimes key={show.number} opensAt={realOpensAt} closesAt={show.closesAt} />
            );
          })}
        </ShowTimes>
      </>
    );
  };

  return (
    <Container>
      {renderExhibitionInfo()}
      <PanelAction.Source>About&nbsp;&nbsp;</PanelAction.Source>
      <PanelContent.Source>
        <WithContentTransition>
          {state === "resolved" && <GalleryRichText richText={result.fields.body} />}
          {state === "rejected" && (
            <>
              <h1>dot.gallery</h1>
            </>
          )}
        </WithContentTransition>
      </PanelContent.Source>
    </Container>
  );
}
