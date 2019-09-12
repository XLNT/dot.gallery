import { get } from "lodash-es";
import React from "react";
import styled from "styled-components";

import {
  Room,
  useCurrentEntityQuery,
  useTwilioAccessTokenQuery,
} from "../../operations";
import { ZIndex } from "lib/zIndex";
import LoadingAsset from "components/LoadingAsset";
import PresentEntity from "./PresentEntity";

const PresenceList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);

  z-index: ${ZIndex.Social};
`;

export default function SocialLayer({
  room,
  loadingAsset = false,
}: {
  room: Pick<Room, "id">;
  loadingAsset: boolean;
}) {
  const { data: tokenData } = useTwilioAccessTokenQuery({ pollInterval: 5000 });
  const token = get(tokenData, "userDataToken");

  const { data, loading, error } = useCurrentEntityQuery({
    pollInterval: 5000,
  });

  const ownId = get(data, ["currentEntity", "id"]);
  const ownHandle = get(data, ["currentEntity", "handle"]);
  const ownAssets = get(data, ["currentEntity", "tradableAssets"]);

  return (
    <>
      <PresenceList>
        {!loading && !error && (
          <PresentEntity
            id={ownId}
            handle={`${ownHandle} (you)`}
            assets={ownAssets}
            draggable
          >
            {loadingAsset && <LoadingAsset />}
          </PresentEntity>
        )}
      </PresenceList>
    </>
  );
}
