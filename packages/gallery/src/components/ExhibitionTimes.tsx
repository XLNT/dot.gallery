import { DateTime } from "luxon";
import { ShowState, getShowState } from "lib/shows";
import { format } from "lib/exhibitionSlug";
import CalendarSvg from "static/calendar.svg";
import React, { useMemo } from "react";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";

import { Show } from "../operations";
import useBreakpoints from "hook/useBreakpoints";

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
  cursor: pointer;
  color: ${({ theme, isOpen }) => (isOpen ? theme.secondary : "inherit")};
  margin-bottom: 3rem;
`;

const OpenDate = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OpenTime = styled.div`
  font-weight: bold;
  font-size: ${({ scalar }) => scalar * 1.5}rem;
  text-transform: uppercase;

  &:hover {
    font-style: italic;
  }
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
  show,
  ...rest
}: {
  show: Pick<Show, "id" | "number" | "opensAt" | "closesAt">;
  [_: string]: any;
}) {
  const { exhibition } = useCurrentExhibition();

  const scalar = useBreakpoints([2, 3, 3]);

  const state = getShowState(show.opensAt, show.closesAt);

  const opensAtDate = useMemo(
    () => DateTime.fromISO(show.opensAt).toLocaleString(DateTime.DATE_MED),
    [show.opensAt],
  );
  const opensAtTime = useMemo(
    () =>
      DateTime.fromISO(show.opensAt).toLocaleString(DateTime.TIME_24_SIMPLE),
    [show.opensAt],
  );
  const closesAtTime = useMemo(
    () =>
      DateTime.fromISO(show.closesAt).toLocaleString(DateTime.TIME_24_SIMPLE),
    [show.closesAt],
  );

  const calendarLink = useMemo(
    () =>
      `http://www.google.com/calendar/event?${new URLSearchParams({
        action: "TEMPLATE",
        dates: `${toGoogleCalendarDatetime(
          show.opensAt,
        )}/${toGoogleCalendarDatetime(show.closesAt)}`,
        text: `dot.gallery ${format(exhibition.number, show.number)}`,
        location: "https://dot.gallery",
        details: `dot.gallery ${format(
          exhibition.number,
          show.number,
        )} Opening`,
        ctz: getTimezoneName(show.opensAt),
      })}`,
    [exhibition.number, show.closesAt, show.number, show.opensAt],
  );

  return (
    <Container isOpen={state === ShowState.Open} {...rest}>
      <OpenDate scalar={scalar}>
        opens {opensAtDate}{" "}
        <a href={calendarLink} target="_blank" rel="noopener noreferrer">
          <Calendar src={CalendarSvg} />
        </a>
      </OpenDate>
      <OpenTime isOpen={state === ShowState.Open} scalar={scalar}>
        {state === ShowState.Open ? "Enter" : `${opensAtTime}-${closesAtTime}`}
      </OpenTime>
    </Container>
  );
}
