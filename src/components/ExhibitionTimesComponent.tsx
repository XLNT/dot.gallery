import { DateTime } from "luxon";
import { ShowState, getShowState } from "lib/shows";
import { format } from "lib/exhibitionSlug";
import { useCreateAssetMutation } from "graphql";
import CalendarSvg from "components/calendar.svg";
import React, { useCallback, useMemo } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useRouter from "context/useRouter";

import { buildTokenUri } from "lib/tokenURI";
import { times } from "lodash-es";
import EntityId from "context/EntityId";
import tokenURI from "images/token.png";
import useEntityAssets from "hook/useEntityAssets";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 3rem;

  transition: color 100ms linear;
  &:hover {
    color: ${fromTheme("secondary")};
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

  transform: scale(1);
  transition: transform 150ms linear, box-shadow 150ms linear;
  &:hover {
    box-shadow: 0px 0px 2rem -1rem rgba(0, 0, 0, 0.75);
    transform: scale(1.05);
  }
`;

export default function ExhibitionTimes({ number, opensAt, closesAt, ...rest }: any) {
  const { history } = useRouter();
  const { exhibition } = useCurrentExhibition();

  const [entityId] = EntityId.useContainer();
  const { assets } = useEntityAssets();
  const [grantToken] = useCreateAssetMutation({
    variables: { ownerId: entityId, uri: buildTokenUri(tokenURI) },
  });

  const opensAtDate = useMemo(() => DateTime.fromISO(opensAt).toLocaleString(DateTime.DATE_MED), [
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

  const showState = getShowState(opensAt, closesAt);

  const goExhibition = useCallback(async () => {
    if (assets.length === 0) {
      await Promise.all(times(5, () => grantToken()));
    }
    history.push(`/${format(exhibition.number, number)}`);
  }, [assets.length, exhibition.number, grantToken, history, number]);

  const goRequest = useCallback(() => {}, []);

  return (
    <Container {...rest} onClick={showState === ShowState.Open ? goExhibition : goRequest}>
      <OpenDate>
        opens {opensAtDate} <Calendar onClick={goCalendar} src={CalendarSvg} />
      </OpenDate>
      <OpenTime>
        {showState === ShowState.Open ? "Enter" : `${opensAtTime}-${closesAtTime}`}
      </OpenTime>
    </Container>
  );
}
