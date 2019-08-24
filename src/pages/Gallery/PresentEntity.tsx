import { Asset, Entity } from "graphql";
import DraggableAsset from "components/DraggableAssets";
import Maybe from "graphql/tsutils/Maybe";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Name = styled.div``;

const Assets = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDraggableAsset = styled(DraggableAsset)`
  margin-right: 0.5rem;
`;

export default function PresentEntity({
  entity,
}: {
  entity: Pick<Entity, "id" | "handle"> & {
    ownedAssets: Maybe<Array<{ __typename?: "Asset" } & Pick<Asset, "id" | "uri">>>;
  };
}) {
  return (
    <Container>
      <Name>{entity.handle}</Name>
      <Assets>
        {entity.ownedAssets.map(asset => (
          <StyledDraggableAsset key={asset.id} asset={asset} />
        ))}
      </Assets>
    </Container>
  );
}
