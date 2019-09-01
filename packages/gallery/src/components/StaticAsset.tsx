import { Asset } from "../operations";
import React from "react";
import styled from "styled-components";

const AssetImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

// eslint-disable-next-line react/display-name
export default React.forwardRef(
  ({ asset, ...rest }: { asset: Pick<Asset, "id" | "uri"> }, ref) => (
    <AssetImg ref={ref} src={asset.uri.image} {...rest} />
  ),
);
