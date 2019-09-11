import { get } from "lodash-es";
import React from "react";
import styled from "styled-components";

import {
  Room,
  useCurrentEntityQuery,
  useUserDataTokenQuery,
} from "../../operations";
import { ZIndex } from "lib/zIndex";
import PresentEntity from "./PresentEntity";
import config from "config";

const PresenceList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);

  z-index: ${ZIndex.Social};
`;

export default function SocialLayer({ room }: { room: Pick<Room, "id"> }) {
  const { data: tokenData } = useUserDataTokenQuery({ pollInterval: 5000 });
  const token = get(tokenData, "userDataToken");
  const { data, loading, error } = useCurrentEntityQuery({
    pollInterval: 5000,
  });

  const ownId = get(data, ["currentEntity", "id"]);
  const ownHandle = get(data, ["currentEntity", "handle"]);

  return (
    <>
      <PresenceList>
        {!loading && !error && (
          <PresentEntity id={ownId} handle={`${ownHandle} (you)`} draggable />
        )}
      </PresenceList>
    </>
  );
}
