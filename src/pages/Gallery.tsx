import { Coords, Direction, directionFor, findRoom, keycodeFor, navigate } from "lib/rooms";
import { ExhibitionProps } from "./ExhibitionProps";
import { animated, useTransition } from "react-spring";
import { last } from "lodash-es";
import AssetDragLayer from "./Gallery/AssetDragLayer";
import Journey from "context/Journey";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import React, { useEffect, useMemo, useState } from "react";
import Room from "components/Room";
import SocialLayer from "./Gallery/SocialLayer";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
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

  margin: 5rem;

  display: flex;
`;

export default function Gallery(props: ExhibitionProps<void>) {
  useSuggestedPanelState(true);
  const [journey, appendToJourney] = Journey.useContainer();

  const { exhibition } = useCurrentExhibition();

  const [coords, setCoords] = useState<Coords>(null);

  useEffect(() => {
    if (exhibition) {
      const center: Coords = [
        Math.floor(exhibition.extent / 2.0),
        Math.floor(exhibition.extent / 2.0),
      ];
      setCoords(center);
    }
  }, [exhibition]);

  useKey(
    (pressedKey: number) => {
      if (exhibition) {
        appendToJourney(directionFor(pressedKey));
        setCoords(navigate(coords, exhibition.extent, directionFor(pressedKey)));
      }
    },
    {
      detectKeys: [Direction.Left, Direction.Up, Direction.Right, Direction.Down].map(keycodeFor),
    },
    { dependencies: [exhibition, coords] },
  );

  const room = useMemo(
    () => (!exhibition || coords === null ? null : findRoom(exhibition.rooms, coords)),
    [coords, exhibition],
  );

  const lastDirection = last(journey);

  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const outX =
    lastDirection === Direction.Left ? width : lastDirection === Direction.Right ? -width : 0;
  const outY =
    lastDirection === Direction.Down ? -height : lastDirection === Direction.Up ? height : 0;

  const transitions = useTransition(room, room => room && room.id, {
    initial: { transform: `translate3d(0, 0, 0)`, opacity: 1 },
    from: { transform: `translate3d(${-outX}px, ${-outY}px, 0)`, opacity: 0 },
    enter: { transform: `translate3d(0, 0, 0)`, opacity: 1 },
    leave: { transform: `translate3d(${outX}px, ${outY}px, 0)`, opacity: 0 },
  });

  return (
    <>
      <JourneyAndExit {...props} />
      <Canvas>
        {transitions.map(({ item, key, props }) => (
          <InnerCanvas key={key} style={props}>
            {item && <Room room={item} />}
          </InnerCanvas>
        ))}
      </Canvas>
      <SocialLayer />
      <AssetDragLayer />
    </>
  );
}
