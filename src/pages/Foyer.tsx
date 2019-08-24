import { ExhibitionProps, Flow } from "./ExhibitionProps";
import React from "react";

export default function Foyer({ setFlow }: ExhibitionProps<void>) {
  return (
    <>
      <div>Foyer</div>
      <button onClick={() => setFlow(Flow.Gallery)}>next</button>
    </>
  );
}
