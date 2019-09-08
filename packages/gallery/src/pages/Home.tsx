import { DateTime } from "luxon";
import { get } from "lodash";
import React, { useCallback } from "react";
import styled from "styled-components";

import { ShowState, getShowState } from "lib/shows";
import { format } from "lib/exhibitionSlug";
import { useCurrentEntityQuery } from "operations";
import AnimatedPanelContent from "components/AnimatedPanelContent";
import ExhibitionTimes from "components/ExhibitionTimes";
import GalleryRichText from "components/GalleryRichText";
import HaveTicketModal from "pages/HaveTicketModal";
import ModalView from "components/ModalView";
import PanelAction from "context/PanelAction";
import RequestTicketModal from "./RequestTicketModal";
import Timezone from "context/Timezone";
import WantTicketModal from "pages/WantTicketModal";
import fromTheme from "theme/fromTheme";
import timezones from "lib/timezones";
import useContentful from "hook/useContentful";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useIsLoggedIn from "hook/useIsLoggedIn";
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

const EmphasizeTitle = styled.span`
  font-style: italic;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 90%;
  padding-bottom: 5rem;
`;

const ErrorBox = styled.pre`
  padding: 0.5rem;
  border: 4px solid ${fromTheme("primary")};
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const TimezoneSelect = styled.select`
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 10rem;
  margin-left: 1rem;
  margin-bottom: 1rem;

  border: 4px solid ${fromTheme("primary")};
  background-color: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};
  font-weight: bold;

  padding: 0.5rem 0.75rem;

  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
`;

export default function Home() {
  useEnforcePanelVisibility(true);
  useSuggestedPanelState(true);
  const { exhibition, loading, error } = useCurrentExhibition();
  const [result, , state] = useContentful(ABOUT_ID);
  const { history } = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [timezone, setTimezone] = Timezone.useContainer();
  const { data } = useCurrentEntityQuery();
  const availableTicket = get(data, ["currentEntity", "availableTicket"], null);
  const hasAvailableTicket = !!availableTicket;

  const goHome = useCallback(() => history.push("/"), [history]);

  const onExhibitionClick = useCallback(
    show => {
      if (isLoggedIn) {
        if (hasAvailableTicket) {
          history.push("/have-ticket");
        } else {
          history.push("/want-ticket");
        }
      } else {
        history.push("/request");
      }
    },
    [hasAvailableTicket, history, isLoggedIn],
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
          <EmphasizeTitle>{exhibition.title}</EmphasizeTitle>
        </ExhibitionTitle>

        <InnerContainer>
          {shows.map((show, i) => {
            if (i === 0 && process.env.NODE_ENV === "development") {
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
      <Container>
        {renderExhibitionInfo()}
        <TimezoneSelect
          onChange={e => setTimezone(e.target.value)}
          value={timezone}
        >
          {timezones.map(tz => (
            <option key={tz} value={tz}>
              {tz === "local" ? DateTime.local().zoneName : tz}
            </option>
          ))}
        </TimezoneSelect>
      </Container>
      <PanelAction.Source>&nbsp;&nbsp;About</PanelAction.Source>
      <AnimatedPanelContent>
        {state === "pending" && (
          <>
            <h1>Loading...</h1>
          </>
        )}
        {state === "rejected" && (
          <>
            <h1>dot.gallery</h1>
            <h3>Unable to load info. ¯\_(ツ)_/¯</h3>
          </>
        )}
        {state === "resolved" && (
          <GalleryRichText richText={result.fields.body} />
        )}
      </AnimatedPanelContent>

      <ModalView
        onDismiss={goHome}
        routes={{
          "/request": RequestTicketModal,
          "/login": RequestTicketModal,
          "/have-ticket": HaveTicketModal,
          "/want-ticket": WantTicketModal,
        }}
      />
    </>
  );
}
