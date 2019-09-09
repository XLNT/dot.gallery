import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { RouteComponentProps } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import { parse } from "lib/exhibitionSlug";
import AssetDragLayer from "./AssetDragLayer";
import DoubleConfirm from "./DoubleConfirm";
import Foyer from "./Foyer";
import Fullscreen from "context/Fullscreen";
import Gallery from "./Gallery";
import GiftShop from "./GiftShop";
import Preflight from "./Preflight";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import usePreviousValue from "hook/usePreviousValue";

const Perspective = styled.div`
  flex: 1;
  position: relative;
  perspective: 1000px;
`;

const Transition = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;

const routes: { [_: number]: FunctionComponent<ExhibitionProps<any>> } = {
  [Flow.Preflight]: Preflight,
  [Flow.Foyer]: Foyer,
  [Flow.Gallery]: Gallery,
  [Flow.DoubleConfirm]: DoubleConfirm,
  [Flow.GiftShop]: GiftShop,
};

export default function Exhibition({
  match,
}: RouteComponentProps<{ slug: string }>) {
  const [flow, setFlow] = useState<Flow>(Flow.Preflight);
  const [exhibition, show] = useMemo(() => parse(match.params.slug), [
    match.params.slug,
  ]);
  const { isFullscreen } = Fullscreen.useContainer();

  const wasFullscreen = usePreviousValue(isFullscreen);

  useEffect(() => {
    if (wasFullscreen && !isFullscreen) {
      setFlow(Flow.DoubleConfirm);
    }
  }, [isFullscreen, wasFullscreen]);

  const routeProps = {
    exhibition,
    show,
    setFlow,
  };

  const transitions = useTransition(routes[flow], null, {
    initial: { transform: "translateZ(0%)", opacity: 1 },
    from: { transform: "translateZ(100px)", opacity: 0 },
    enter: { transform: "translateZ(0%)", opacity: 1 },
    leave: { transform: "translateZ(-100px)", opacity: 0 },
  });

  return (
    <>
      <Perspective>
        {transitions.map(({ item: Item, key, props }) => (
          <Transition style={props} key={key}>
            <Item {...routeProps} />
          </Transition>
        ))}
      </Perspective>
      <AssetDragLayer />
    </>
  );
}
