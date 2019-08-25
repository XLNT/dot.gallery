import { Coords, Direction, directionFor, findRoom, keycodeFor, navigate } from "lib/rooms";
import { ExhibitionProps } from "./ExhibitionProps";
import AssetDragLayer from "./Gallery/AssetDragLayer";
import Journey from "context/Journey";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import Layer from "components/Layer";
import React, { useEffect, useMemo, useState } from "react";
import Room from "components/Room";
import SocialLayer from "./Gallery/SocialLayer";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useEntityAssets from "hook/useEntityAssets";
import useKey from "use-key-hook";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Canvas = styled(Layer)`
  display: flex;
`;

const InnerCanvas = styled(Layer)`
  flex: 1;
  margin: 5rem;

  display: flex;
`;

export default function Gallery(props: ExhibitionProps<void>) {
  useSuggestedPanelState(true);
  const [journey, appendToJourney] = Journey.useContainer();

  const { exhibition } = useCurrentExhibition();
  const assets = useEntityAssets();

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

  return (
    <Canvas>
      <JourneyAndExit {...props} />
      <InnerCanvas>{room && <Room room={room} />}</InnerCanvas>
      <SocialLayer />
      <AssetDragLayer />
    </Canvas>
  );
}
