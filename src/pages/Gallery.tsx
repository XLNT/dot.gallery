import { ExhibitionProps } from "./ExhibitionProps";
import { get } from "lodash-es";
import { useCurrentExhibitionQuery } from "graphql";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import Layer from "components/Layer";
import React, { useEffect, useState } from "react";
import Room from "components/Room";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

type Coords = [number, number];

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
  background: ${fromTheme("canvas")};
`;

export default function Gallery(props: ExhibitionProps<void>) {
  useSuggestedPanelState(true);

  const { data } = useCurrentExhibitionQuery();
  const exhibition = get(data, ["exhibitions", 0]);

  const [coords, setCoords] = useState<Coords>(null);

  useEffect(() => {
    if (exhibition) {
      const center: Coords = [
        Math.ceil(exhibition.extent / 2.0),
        Math.ceil(exhibition.extent / 2.0),
      ];
      console.log("setting room to ", center);
      setCoords(center);
    }
  }, [exhibition]);

  return (
    <Backboard>
      <Canvas>
        <JourneyAndExit {...props} />
        <InnerCanvas>
          {exhibition && exhibition.rooms.length > 0 && <Room room={exhibition.rooms[0]} />}
        </InnerCanvas>
      </Canvas>
    </Backboard>
  );
}
