import { animated, config as springConfig, useTransition } from "react-spring";
import { get } from "lodash-es";
import { useDebouncedCallback } from "use-debounce";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useKey from "use-key-hook";

import {
  Coords,
  Direction,
  directionFor,
  findRoom,
  keycodeFor,
  navigate,
} from "lib/rooms";
import { CurrentExhibitionQuery } from "operations";
import { ExhibitionProps } from "./ExhibitionProps";
import { format } from "lib/exhibitionSlug";
import CurrentRoomId from "context/CurrentRoomId";
import Journey from "context/Journey";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import PanelAction from "context/PanelAction";
import Room from "components/Room";
import SocialLayer from "./Gallery/SocialLayer";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import usePreloadedEntries from "hook/usePreloadedEntries";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Canvas = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  perspective: 1000px;
`;

const InnerCanvas = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  margin-left: 5rem;
  margin-right: 5rem;
  margin-bottom: 7rem;
  margin-top: 3rem;

  display: flex;
`;

const ExhibitionSlug = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  font-weight: bold;
`;

export default function Gallery(props: ExhibitionProps<{}>) {
  useEnforcePanelVisibility(true);
  useSuggestedPanelState(true);
  const [, appendToJourney] = Journey.useContainer();
  const [lastDirection, setLastDirection] = useState<Direction>();

  const { exhibition } = useCurrentExhibition();
  const rooms = get(exhibition, "rooms", [] as typeof exhibition["rooms"]);
  usePreloadedEntries(rooms.map(room => room.entryId));

  const [coords, setCoords] = useState<Coords>(null);

  useEffect(() => {
    if (exhibition) {
      const center: Coords = [
        Math.floor(exhibition.extent / 2.0),
        Math.floor(exhibition.extent / 2.0),
      ];
      appendToJourney(center);
      appendToJourney(center);
      setCoords(center);
    }
  }, [appendToJourney, exhibition]);

  const [handleDirection] = useDebouncedCallback(
    (direction: Direction) => {
      if (exhibition) {
        setLastDirection(direction);
        const newCoords = navigate(coords, exhibition.extent, direction);
        appendToJourney(newCoords);
        setCoords(newCoords);
      }
    },
    400,
    {
      leading: true,
    },
  );

  const [] = useKey(
    (pressedKey: number) => handleDirection(directionFor(pressedKey)),
    {
      detectKeys: [
        Direction.Left,
        Direction.Up,
        Direction.Right,
        Direction.Down,
      ].map(keycodeFor),
    },
    { dependencies: [exhibition, coords] },
  );

  const room = useMemo(
    () =>
      !exhibition || coords === null
        ? null
        : findRoom<CurrentExhibitionQuery["currentExhibition"]["rooms"][0]>(
            exhibition.rooms,
            coords,
          ),
    [coords, exhibition],
  );

  const width = document.body.clientWidth * 1.5;
  const height = document.body.clientHeight * 1.5;
  const outX =
    lastDirection === Direction.Left
      ? width
      : lastDirection === Direction.Right
      ? -width
      : 0;
  const outY =
    lastDirection === Direction.Down
      ? -height
      : lastDirection === Direction.Up
      ? height
      : 0;

  const transitions = useTransition(room, room => room && room.id, {
    initial: { transform: `translate3d(0, 0, 0)`, opacity: 1 },
    from: { transform: `translate3d(${-outX}px, ${-outY}px, 0)`, opacity: 0 },
    enter: { transform: `translate3d(0, 0, 0)`, opacity: 1 },
    leave: { transform: `translate3d(${outX}px, ${outY}px, 0)`, opacity: 0 },
    config: { ...springConfig.molasses, friction: 200 },
  });

  return (
    <CurrentRoomId.Provider value={room ? room.id : null}>
      <ExhibitionSlug>{format(exhibition.number)}</ExhibitionSlug>
      <SocialLayer room={room} />
      <JourneyAndExit {...props} />
      <Canvas>
        {transitions.map(({ item, key, props }) => (
          <InnerCanvas key={key} style={props}>
            {item && <Room room={item} />}
          </InnerCanvas>
        ))}
      </Canvas>
      <PanelAction.Source>&nbsp;&nbsp;Details</PanelAction.Source>
    </CurrentRoomId.Provider>
  );
}
