import { ExhibitionProps } from "./ExhibitionProps";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function GiftShop({  }: ExhibitionProps<void>) {
  return (
    <Container>
      <div>GiftShop</div>
    </Container>
  );
}
