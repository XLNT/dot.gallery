import { useEntityQuery } from "graphql";
import EntityId from "context/EntityId";
import Layer from "components/Layer";
import PresentEntity from "./PresentEntity";
import React from "react";
import styled from "styled-components";

const Container = styled(Layer)``;

const PresenceList = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: flex;
  width: 100%;
`;

export default function SocialLayer() {
  const [entityId] = EntityId.useContainer();
  const { data, loading, error } = useEntityQuery({ variables: { id: entityId } });

  return (
    <Container>
      <PresenceList>
        {!loading && !error && data.entity && <PresentEntity entity={data.entity} />}
      </PresenceList>
    </Container>
  );
}
