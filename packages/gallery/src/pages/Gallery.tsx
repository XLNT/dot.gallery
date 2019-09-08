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
import { animated, useTransition } from "react-spring";
import { format } from "lib/exhibitionSlug";
import Journey from "context/Journey";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import PanelAction from "context/PanelAction";
import React, { useEffect, useMemo, useState } from "react";
import Room from "components/Room";
import SocialLayer from "./Gallery/SocialLayer";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useKey from "use-key-hook";
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

export default function Gallery(props: ExhibitionProps<void>) {
  useEnforcePanelVisibility(true);
  useSuggestedPanelState(true);
  const [, appendToJourney] = Journey.useContainer();
  const [lastDirection, setLastDirection] = useState<Direction>();

  const { exhibition } = useCurrentExhibition();

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

  useKey(
    (pressedKey: number) => {
      if (exhibition) {
        setLastDirection(directionFor(pressedKey));
        const newCoords = navigate(
          coords,
          exhibition.extent,
          directionFor(pressedKey),
        );
        appendToJourney(newCoords);
        setCoords(newCoords);
      }
    },
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

  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
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
  });

  return (
    <>
      <ExhibitionSlug>{format(exhibition.number)}</ExhibitionSlug>
      <JourneyAndExit {...props} />
      <Canvas>
        {transitions.map(({ item, key, props }) => (
          <InnerCanvas key={key} style={props}>
            {item && <Room room={item} />}
          </InnerCanvas>
        ))}
      </Canvas>
      <SocialLayer />
      <PanelAction.Source>&nbsp;&nbsp;Details</PanelAction.Source>
    </>
  );
}
