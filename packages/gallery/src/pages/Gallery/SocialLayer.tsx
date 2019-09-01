import { useCurrentEntityQuery } from "../../operations";
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
  const { data, loading, error } = useCurrentEntityQuery({
    pollInterval: 5000,
  });

  return (
    <PresenceList>
      {!loading && !error && data.currentEntity && (
        <PresentEntity entity={data.currentEntity} />
      )}
    </PresenceList>
  );
}
