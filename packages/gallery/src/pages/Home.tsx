import { DateTime } from "luxon";
import { first, get, last } from "lodash-es";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import { ShowState, getShowState } from "lib/shows";
import { format } from "lib/exhibitionSlug";
import { useCurrentEntityQuery } from "operations";
import AnimatedPanelContent from "components/AnimatedPanelContent";
import CouponModal from "./CouponModal";
import ExhibitionTimes from "components/ExhibitionTimes";
import GalleryRichText, { Heading1, P } from "components/GalleryRichText";
import HaveTicketModal from "pages/HaveTicketModal";
import LoginModal from "./LoginModal";
import ModalView from "components/ModalView";
import NoticeModal from "./NoticeModal";
import PanelAction from "context/PanelAction";
import RequestTicketModal from "./RequestTicketModal";
import Timezone from "context/Timezone";
import WantTicketModal from "pages/WantTicketModal";
import fromTheme from "theme/fromTheme";
import timezones from "lib/timezones";
import useContentfulEntry from "hook/useContentfulEntry";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useIsLoggedIn from "hook/useIsLoggedIn";
import usePanelAction from "hook/usePanelAction";
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
  font-weight: bold;
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
  max-width: 17rem;
  margin-left: 1rem;
  margin-bottom: 1rem;

  border: 4px solid ${fromTheme("primary")};
  border-radius: 0;
  background-color: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};
  font-weight: bold;

  padding: 0.5rem 0.75rem;

  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
`;

const ExhibitionDetails = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ExhibitionText = styled(P)`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

const RichTextContainer = styled.div`
  padding-bottom: 8rem;
`;

export default function Home() {
  useEnforcePanelVisibility(true);
  useSuggestedPanelState(false);
  usePanelAction("About");
  const { exhibition, loading, error } = useCurrentExhibition();
  const [result, , state] = useContentfulEntry(ABOUT_ID);
  const { history } = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [timezone, setTimezone] = Timezone.useContainer();
  const { data } = useCurrentEntityQuery();
  const availableTicket = get(data, ["currentEntity", "availableTicket"], null);
  const hasAvailableTicket = !!availableTicket;

  const goHome = useCallback(() => history.push("/"), [history]);

  const onExhibitionClick = useCallback(() => {
    if (isLoggedIn) {
      if (hasAvailableTicket) {
        history.push("/have-ticket");
      } else {
        history.push("/want-ticket");
      }
    } else {
      history.push("/request");
    }
  }, [hasAvailableTicket, history, isLoggedIn]);

  const opensAt: string = get(first(get(exhibition, "shows")), "opensAt");
  const closesAt: string = get(last(get(exhibition, "shows")), "closesAt");
  const exhibitionOpen = useMemo(
    () =>
      opensAt &&
      DateTime.fromISO(opensAt)
        .setZone(timezone)
        .toLocaleString({
          day: "numeric",
          month: "long",
        }),
    [opensAt, timezone],
  );
  const exhibitionClose = useMemo(
    () =>
      closesAt &&
      DateTime.fromISO(closesAt)
        .setZone(timezone)
        .toLocaleString(DateTime.DATE_FULL),
    [closesAt, timezone],
  );

  // TODO: use react-spring to animate this transition between states
  const renderExhibitionInfo = () => {
    if (loading) {
      return (
        <>
          <ExhibitionTitle>Loading dot.gallery...</ExhibitionTitle>
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
      return (
        <>
          <ExhibitionTitle>dot.gallery is currently closed</ExhibitionTitle>
          <InnerContainer>
            <a href="https://twitter.com/dotdotgallery">
              Follow us on Twitter to hear about the next exhibition.
            </a>
          </InnerContainer>
        </>
      );
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
          {shows.length === 0 && (
            <>
              <div>dot.gallery is currently closed.</div>
              <a href="https://twitter.com/dotdotgallery">
                Follow us on Twitter to hear about the next exhibition.
              </a>
            </>
          )}
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
              {tz === "local" ? `Local (${DateTime.local().zoneName})` : tz}
            </option>
          ))}
        </TimezoneSelect>
      </Container>
      <AnimatedPanelContent>
        <>
          {state === "pending" && <h1>Loading...</h1>}
          {state === "rejected" && (
            <>
              <Heading1>About</Heading1>
              <h3>
                Unable to load info. Check your internet connection? ¯\_(ツ)_/¯
              </h3>
            </>
          )}
          {state === "resolved" && (
            <GalleryRichText richText={result.fields.body} />
          )}
          <ExhibitionDetails>
            {exhibition && (
              <>
                <EmphasizeTitle>{exhibition.title}</EmphasizeTitle>
                <ExhibitionText>
                  {exhibitionOpen} — {exhibitionClose}
                </ExhibitionText>
                <ExhibitionText>
                  {exhibition.ticketsAvailable}/{exhibition.capacity} Tickets
                  are available.
                </ExhibitionText>
              </>
            )}
          </ExhibitionDetails>
          {state === "resolved" && (
            <RichTextContainer>
              <GalleryRichText richText={result.fields.bottom} />
            </RichTextContainer>
          )}
        </>
      </AnimatedPanelContent>

      <ModalView
        onDismiss={goHome}
        routes={{
          "/request": RequestTicketModal,
          "/login": LoginModal,
          "/have-ticket": HaveTicketModal,
          "/want-ticket": WantTicketModal,
          "/want-ticket/voucher": CouponModal,
          "/notice": NoticeModal,
        }}
      />
    </>
  );
}
