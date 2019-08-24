import { format } from "lib/exhibitionSlug";
import ExhibitionTimes from "components/ExhibitionTimesComponent";
import LoginComponent from "../components/LoginComponent";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import React from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import WithContentTransition from "components/WithContentTransition";
import contentful from "client/contentful";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import usePromise from "react-use-promise";
import useRouter from "context/useRouter";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const ABOUT_ID = "3myaHf3JO0keiFVJvbvgL4";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExhibitionTitle = styled.h1`
  font-size: 3rem;
`;

export default function Home() {
  useSuggestedPanelState(true);
  const { exhibition, loading, error } = useCurrentExhibition();
  const [result, , state] = usePromise(() => contentful.getEntry<any>(ABOUT_ID), [contentful]);
  const { history } = useRouter();

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

    return (
      <>
        <ExhibitionTitle>
          {format(exhibition.number)}: {exhibition.title}
        </ExhibitionTitle>

        {exhibition.shows.map(show => (
          <div key={show.number}>
            <ExhibitionTimes
              onClick={() => history.push(`/${format(exhibition.number, show.number)}`)}
              opensAt={show.opensAt}
              closesAt={show.closesAt}
            ></ExhibitionTimes>
          </div>
        ))}
      </>
    );
  };

  return (
    <Container>
      {renderExhibitionInfo()}
      <PanelAction.Source>About&nbsp;&nbsp;</PanelAction.Source>
      <PanelContent.Source>
        <WithContentTransition>
          {state === "resolved" && <RichText richText={result.fields.body} />}
          {state === "rejected" && (
            <>
              <h1>dot.gallery</h1>
            </>
          )}
        </WithContentTransition>
      </PanelContent.Source>
      <LoginComponent ticketPrice="200" remainingTicketCount="45" />
      {/*<AudioComponent />*/}
    </Container>
  );
}
