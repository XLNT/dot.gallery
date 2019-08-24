import { Coords, Direction, directionFor, findRoom, keycodeFor, navigate } from "lib/rooms";
import { ExhibitionProps } from "./ExhibitionProps";
import { animated, useTransition } from "react-spring";
import { get, isNull, isUndefined, negate, uniqBy } from "lodash-es";
import { isEqual } from "apollo-utilities";
import { useCurrentExhibitionQuery } from "graphql";
import Journey from "context/Journey";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import Layer from "components/Layer";
import React, { useEffect, useMemo, useState } from "react";
import Room from "components/Room";
import styled from "styled-components";
import useKey from "use-key-hook";
import usePreviousValue from "hook/usePreviousValue";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Backboard = styled.div`
  position: relative;
  flex: 1;
`;

const Canvas = styled(Layer)`
  z-index: 6;
  display: flex;
`;

const InnerCanvas = styled.div`
  flex: 1;
  margin: 5rem;

  display: flex;
`;

export default function Gallery(props: ExhibitionProps<void>) {
  useSuggestedPanelState(true);
  const [journey, appendToJourney] = Journey.useContainer();

  const { data } = useCurrentExhibitionQuery();
  const exhibition = get(data, ["exhibitions", 0]);

  const [coords, setCoords] = useState<Coords>(null);
  // const prevCoords = usePreviousValue(coords, isEqual);

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
    (pressedKey: number, event: Event) => {
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

  return (
    <Backboard>
      <Canvas>
        <JourneyAndExit {...props} />
        <InnerCanvas>{room && <Room room={room} />}</InnerCanvas>
      </Canvas>
    </Backboard>
  );
}
