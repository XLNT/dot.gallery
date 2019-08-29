import { DateTime } from "luxon";
import { ShowState, getShowState } from "lib/shows";
import { format } from "lib/exhibitionSlug";
import { useCreateAssetMutation } from "operations";
import CalendarSvg from "static/calendar.svg";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useRouter from "context/useRouter";

import { buildTokenUri } from "lib/tokenURI";
import { times } from "lodash-es";
import EntityId from "context/EntityId";
import tokenURI from "static/token.png";
import useEntityAssets from "hook/useEntityAssets";

const GOOGLE_CALENDAR_FORMAT = "yyyyMMdd'T'HHmmss'Z'";
const toGoogleCalendarDatetime = (isoString: string) =>
  DateTime.fromISO(isoString)
    .toUTC()
    .toFormat(GOOGLE_CALENDAR_FORMAT);
const getTimezoneName = (isoDate: string) => DateTime.fromISO(isoDate).zoneName;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  cursor: ${({ isOpen }) => (isOpen ? "cursor" : "not-allowed")};
  margin-bottom: 3rem;

  transition: color 100ms linear;
  &:hover {
    color: ${({ theme, isOpen }) => (isOpen ? theme.secondary : "inherit")};
  }
`;

const OpenDate = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OpenTime = styled.div`
  font-weight: bold;
  font-size: 4.5rem;
  text-transform: uppercase;
`;

const Calendar = styled.img`
  margin-left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  transform: scale(1);
  transition: transform 150ms linear, box-shadow 150ms linear;
  &:hover {
    box-shadow: 0px 0px 2rem -1rem rgba(0, 0, 0, 0.75);
    transform: scale(1.05);
  }
`;

export default function ExhibitionTimes({
  show: { number, opensAt, closesAt },
  ...rest
}: any) {
  const { history } = useRouter();
  const { exhibition } = useCurrentExhibition();

  const state = getShowState(opensAt, closesAt);

  const [entityId] = EntityId.useContainer();
  const { assets } = useEntityAssets();
  const [grantToken] = useCreateAssetMutation({
    variables: { ownerId: entityId, uri: buildTokenUri(tokenURI) },
  });

  const opensAtDate = useMemo(
    () => DateTime.fromISO(opensAt).toLocaleString(DateTime.DATE_MED),
    [opensAt],
  );
  const opensAtTime = useMemo(
    () => DateTime.fromISO(opensAt).toLocaleString(DateTime.TIME_24_SIMPLE),
    [opensAt],
  );
  const closesAtTime = useMemo(
    () => DateTime.fromISO(closesAt).toLocaleString(DateTime.TIME_24_SIMPLE),
    [closesAt],
  );

  const showState = getShowState(opensAt, closesAt);

  const goExhibition = useCallback(async () => {
    if (assets.length === 0) {
      await Promise.all(times(3, () => grantToken()));
    }
    history.push(`/${format(exhibition.number, number)}`);
  }, [assets.length, exhibition.number, grantToken, history, number]);

  const goRequest = useCallback(() => {}, []);

  const calendarLink = useMemo(
    () =>
      `http://www.google.com/calendar/event?${new URLSearchParams({
        action: "TEMPLATE",
        dates: `${toGoogleCalendarDatetime(opensAt)}/${toGoogleCalendarDatetime(
          closesAt,
        )}`,
        text: `dot.gallery ${format(exhibition.number, number)}`,
        location: "https://dot.gallery",
        details: `dot.gallery ${format(exhibition.number, number)} Opening`,
        ctz: getTimezoneName(opensAt),
      })}`,
    [closesAt, exhibition.number, number, opensAt],
  );

  return (
    <Container
      onClick={showState === ShowState.Open ? goExhibition : goRequest}
      isOpen={state === ShowState.Open}
      {...rest}
    >
      <OpenDate>
        opens {opensAtDate}{" "}
        <a href={calendarLink} target="_blank" rel="noopener noreferrer">
          <Calendar src={CalendarSvg} />
        </a>
      </OpenDate>
      <OpenTime>
        {showState === ShowState.Open
          ? "Enter"
          : `${opensAtTime}-${closesAtTime}`}
      </OpenTime>
    </Container>
  );
}
