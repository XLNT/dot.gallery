import { DateTime } from "luxon";
import CalendarSvg from "components/calendar.svg";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
`;

const Calendar = styled.img`
  margin-left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;

  transform: scale(1);
  transition: transform 150ms linear, box-shadow 150ms linear;
  &:hover {
    box-shadow: 0px 0px 2rem -1rem rgba(0, 0, 0, 0.75);
    transform: scale(1.05);
  }
`;

export default function ExhibitionTimes({ opensAt, closesAt, ...rest }: any) {
  const opensAtDate = useMemo(() => DateTime.fromISO(opensAt).toLocaleString(DateTime.DATE_HUGE), [
    opensAt,
  ]);
  const opensAtTime = useMemo(
    () => DateTime.fromISO(opensAt).toLocaleString(DateTime.TIME_24_SIMPLE),
    [opensAt],
  );
  const closesAtTime = useMemo(
    () => DateTime.fromISO(closesAt).toLocaleString(DateTime.TIME_24_SIMPLE),
    [closesAt],
  );

  const goCalendar = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    <Container {...rest}>
      <OpenDate>
        open {opensAtDate} <Calendar onClick={goCalendar} src={CalendarSvg} />
      </OpenDate>
      <OpenTime>
        {opensAtTime}-{closesAtTime}
      </OpenTime>
    </Container>
  );
}
