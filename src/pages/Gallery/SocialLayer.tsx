import { useEntityQuery } from "graphql";
import EntityId from "context/EntityId";
import PresentEntity from "./PresentEntity";
import React from "react";
import styled from "styled-components";

const PresenceList = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: calc(100% - 5rem);
`;

export default function SocialLayer() {
  const [entityId] = EntityId.useContainer();
  const { data, loading, error } = useEntityQuery({ variables: { id: entityId } });

  return (
    <PresenceList>
      {!loading && !error && data.entity && <PresentEntity entity={data.entity} />}
    </PresenceList>
  );
}
