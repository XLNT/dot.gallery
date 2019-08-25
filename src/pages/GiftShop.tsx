import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ExhibitionProps } from "./ExhibitionProps";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useCreateAssetMutation, useEntityQuery } from "graphql";
import DragTypes from "lib/dragTypes";
import EntityId from "context/EntityId";
import Fullscreen from "context/Fullscreen";
import Journey from "context/Journey";
import LoadingAsset from "components/LoadingAsset";
import PresentEntity from "./Gallery/PresentEntity";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import timeout from "lib/timeout";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useRouter from "context/useRouter";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GiftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AssetsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`;

const Header = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.span``;

const JourneyIcon = styled.div`
  width: 4.25rem;
  height: 4.25rem;

  opacity: ${({ isDragging }) => (isDragging ? 0.2 : 1)};
`;

const LeaveButton = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: ${fromTheme("secondary")};
  text-transform: uppercase;
  cursor: pointer;
`;

const connectDrag = (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() });
const collectDrop = (monitor: DropTargetMonitor) => ({ isOver: monitor.isOver({ shallow: true }) });

export default function GiftShop({ exhibition, show }: ExhibitionProps<void>) {
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);

  const [journey] = Journey.useContainer();
  const { setFullscreen } = Fullscreen.useContainer();
  const { history } = useRouter();

  const [createAsset, { loading }] = useCreateAssetMutation({ refetchQueries: ["Entity"] });
  const [entityId] = EntityId.useContainer();
  const { data } = useEntityQuery({
    variables: { id: entityId },
    pollInterval: 5000,
  });

  const goHome = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      setFullscreen(false);
      await timeout(1000);
    }

    history.replace("/");
  }, [history, setFullscreen]);

  const journeySvg = useMemo(
    () => `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="64" height="64" fill="white" stroke="#FF3333" stroke-width="4"/>
    <rect x="60" y="20" width="4" height="16" transform="rotate(90 60 20)" fill="#FF3333"/>
    <rect x="48" y="36" width="4" height="16" transform="rotate(-180 48 36)" fill="#FF3333"/>
    <rect x="12" y="48" width="4" height="16" transform="rotate(-180 12 48)" fill="#FF3333"/>
    <rect x="32" y="36" width="4" height="16" transform="rotate(-90 32 36)" fill="#FF3333"/>
    <rect x="56" y="20" width="4" height="16" fill="#FF3333"/>
    <rect x="56" y="32" width="4" height="16" fill="#FF3333"/>
    <rect x="68" y="44" width="4" height="12" transform="rotate(90 68 44)" fill="#FF3333"/>
    <rect y="48" width="4" height="12" transform="rotate(-90 0 48)" fill="#FF3333"/>
    </svg>`,
    [],
  );

  const [didDrag, setDidDrag] = useState(false);

  const onDrop = useCallback(
    item => {
      setDidDrag(true);
      createAsset({ variables: { ownerId: entityId, uri: "http://placekitten.com/200/200" } });
    },
    [createAsset, entityId],
  );

  const [{ isDragging }, drag, connectDragPreview] = useDrag({
    item: { type: DragTypes.Journey, journey, html: journeySvg },
    collect: connectDrag,
  });

  useEffect(() => {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }, [connectDragPreview]);

  const [{ isOver }, drop] = useDrop({
    accept: DragTypes.Journey,
    collect: collectDrop,
    drop: onDrop,
  });

  return (
    <Column>
      <Container>
        <StepsContainer>
          <Header>We hope you enjoyed your walk.</Header>
          <Subtitle>
            Take home your personalized journey by dragging it into your collection.
          </Subtitle>
        </StepsContainer>
        <GiftContainer>
          {didDrag ? (
            <LeaveButton onClick={goHome}>Exit</LeaveButton>
          ) : (
            <JourneyIcon
              ref={drag}
              dangerouslySetInnerHTML={{ __html: journeySvg }}
              isDragging={isDragging}
            />
          )}
        </GiftContainer>
      </Container>
      <hr style={{ width: "100%" }} />
      <AssetsContainer ref={drop}>
        {data.entity && (
          <PresentEntity entity={data.entity} draggable={false} wrappable>
            {(() => {
              if (isOver) {
                return (
                  <JourneyIcon dangerouslySetInnerHTML={{ __html: journeySvg }} isDragging={true} />
                );
              }

              if (didDrag && loading) {
                return <LoadingAsset />;
              }

              return null;
            })()}
          </PresentEntity>
        )}
      </AssetsContainer>
    </Column>
  );
}
