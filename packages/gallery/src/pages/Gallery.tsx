import { animated, config as springConfig, useTransition } from "react-spring";
import { get } from "lodash-es";
import { useDebouncedCallback } from "use-debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useKey from "use-key-hook";

import { Coords, findRoom, navigate } from "lib/rooms";
import {
  CurrentEntityDocument,
  CurrentEntityQuery,
  CurrentExhibitionQuery,
  useCreatePlacementMutation,
} from "operations";
import {
  Direction,
  directionFor,
  invertForPreference,
  keycodeFor,
} from "lib/direction";
import { ExhibitionProps } from "./ExhibitionProps";
import { format } from "lib/exhibitionSlug";
import CurrentRoomId from "context/CurrentRoomId";
import Journey from "context/Journey";
import JourneyAndExit from "./Gallery/JourneyAndExit";
import PanelAction from "context/PanelAction";
import Room from "components/Room";
import ScrollingPreference from "context/ScrollingPreference";
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
  const [scrollDirection] = ScrollingPreference.useContainer();
  const [, appendToJourney, resetJourney] = Journey.useContainer();
  const [lastDirection, setLastDirection] = useState<Direction>();

  const { exhibition } = useCurrentExhibition();
  const exhibitionExtent = get(exhibition, "extent");
  const exhibitionId = get(exhibition, "id");
  // const rooms = get(exhibition, "rooms", [] as typeof exhibition["rooms"]);
  // usePreloadedEntries(rooms.map(room => room.entryId));

  const [
    createPlacementMutation,
    { loading: creatingPlacement },
  ] = useCreatePlacementMutation({
    refetchQueries: ["CurrentEntity"],
    awaitRefetchQueries: true,
  });

  const createPlacement = useCallback(
    (args: Parameters<typeof createPlacementMutation>[0]) =>
      createPlacementMutation({
        ...args,
        optimisticResponse: {
          createPlacement: {
            __typename: "Placement",
            id: new Date().toString(),
            assets: [],
          },
        },
        update: (proxy, { data: { createPlacement } }) => {
          const data = proxy.readQuery<CurrentEntityQuery>({
            query: CurrentEntityDocument,
          });
          data.currentEntity.tradableAssets = [
            ...data.currentEntity.tradableAssets.filter(
              asset => asset.id !== args.variables.assetId,
            ),
            ...createPlacement.assets,
          ];
          proxy.writeQuery<CurrentEntityQuery>({
            query: CurrentEntityDocument,
            data,
          });
        },
      }),
    [createPlacementMutation],
  );

  const [coords, setCoords] = useState<Coords>(null);

  useEffect(() => {
    if (exhibitionId) {
      const center: Coords = [
        Math.floor(exhibitionExtent / 2.0),
        Math.floor(exhibitionExtent / 2.0),
      ];
      resetJourney();
      // yes, twice
      appendToJourney(center);
      appendToJourney(center);
      setCoords(center);
    }
  }, [appendToJourney, exhibitionExtent, exhibitionId, resetJourney]);

  const [handleDirection] = useDebouncedCallback(
    useCallback(
      (direction: Direction) => {
        if (exhibition) {
          setLastDirection(direction);
          const newCoords = navigate(coords, exhibition.extent, direction);
          appendToJourney(newCoords);
          setCoords(newCoords);
        }
      },
      [appendToJourney, coords, exhibition],
    ),
    400,
    {
      leading: true,
    },
  );

  useKey(
    (pressedKey: number) =>
      handleDirection(
        invertForPreference(scrollDirection, directionFor(pressedKey)),
      ),
    {
      detectKeys: [
        Direction.Left,
        Direction.Up,
        Direction.Right,
        Direction.Down,
      ].map(keycodeFor),
    },
    { dependencies: [handleDirection] },
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
    config: springConfig.molasses,
  });

  return (
    <CurrentRoomId.Provider initialState={room ? room.id : null}>
      <ExhibitionSlug>{format(exhibition.number)}</ExhibitionSlug>
      <SocialLayer room={room} loadingAsset={creatingPlacement} />
      <JourneyAndExit {...props} />
      <Canvas>
        {transitions.map(({ item, key, props }) => (
          <InnerCanvas key={key} style={props}>
            {item && <Room room={item} createPlacement={createPlacement} />}
          </InnerCanvas>
        ))}
      </Canvas>
      <PanelAction.Source>&nbsp;&nbsp;Details</PanelAction.Source>
    </CurrentRoomId.Provider>
  );
}
