import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ShowState, getShowState } from "lib/shows";
import { format } from "lib/exhibitionSlug";
import { useRedeemTicketMutation } from "operations";
import AnimatedPanelContent from "components/AnimatedPanelContent";
import ExhibitionTimes from "components/ExhibitionTimes";
import GalleryRichText from "components/GalleryRichText";
import HaveTicketModal from "./HaveTicketModal";
import ModalView from "components/ModalView";
import PanelAction from "context/PanelAction";
import React, { useCallback } from "react";
import RequestTicketModal from "./RequestTicketModal";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useContentful from "hook/useContentful";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useRouter from "context/useRouter";
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

const Underlined = styled.span`
  text-decoration: underline;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 90%;
`;

const ErrorBox = styled.pre`
  padding: 0.5rem;
  border: 4px solid ${fromTheme("primary")};
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export default function Home() {
  useEnforcePanelVisibility(true);
  useSuggestedPanelState(true);
  const { exhibition, loading, error } = useCurrentExhibition();
  const [result, , state] = useContentful(ABOUT_ID);
  const { history } = useRouter();

  const [redeemTicket] = useRedeemTicketMutation({
    refetchQueries: ["CurrentEntity"],
    awaitRefetchQueries: true,
  });

  const goHome = useCallback(() => history.push("/"), [history]);

  // const goExhibition = useCallback(async () => {
  //   await redeemTicket();
  //   history.push(`/${format(exhibition.number, number)}`);
  // }, [exhibition.number, history, redeemTicket]);

  const onExhibitionClick = useCallback(
    show => {
      history.push("/request");
    },
    [history],
  );

  // TODO: use react-spring to animate this transition between states
  const renderExhibitionInfo = () => {
    if (loading) {
      return (
        <>
          <ExhibitionTitle>Loading the dot.gallery...</ExhibitionTitle>
        </>
      );
    }

    if (error) {
      return (
        <>
          <ExhibitionTitle>An Error Ocurred.</ExhibitionTitle>

          <InnerContainer>
            <p>{error.message}</p>
            <ErrorBox>
              <code>{JSON.stringify(error)}</code>
            </ErrorBox>
          </InnerContainer>
        </>
      );
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
          {format(exhibition.number)}:{" "}
          <Underlined>{exhibition.title}</Underlined>
        </ExhibitionTitle>

        <InnerContainer>
          {shows.map((show, i) => {
            if (i === 0) {
              show.opensAt = DateTime.local()
                .minus({ minute: 1 })
                .toISO();
            }
            return (
              <ExhibitionTimes
                key={show.number}
                show={show}
                onClick={onExhibitionClick}
              />
            );
          })}
        </InnerContainer>
      </>
    );
  };

  return (
    <>
      <Container>{renderExhibitionInfo()}</Container>
      <PanelAction.Source>About&nbsp;&nbsp;</PanelAction.Source>
      <AnimatedPanelContent>
        {state === "resolved" && (
          <GalleryRichText richText={result.fields.body} />
        )}
        {state === "rejected" && (
          <>
            <h1>dot.gallery</h1>
          </>
        )}
      </AnimatedPanelContent>

      <ModalView
        onDismiss={goHome}
        routes={{
          "/request": RequestTicketModal,
          "/login": RequestTicketModal,
          "/have-ticket": HaveTicketModal,
          "/want-ticket": HaveTicketModal,
        }}
      />
    </>
  );
}
