import { ExhibitionProps, Flow } from "./ExhibitionProps";
import React from "react";

export default function Preflight({ exhibition, show, setFlow }: ExhibitionProps<void>) {
  return (
    <>
      <div>Preflight</div>
      exhibition {exhibition} show {show}
      <button onClick={() => setFlow(Flow.Foyer)}>next</button>
    </>
  );
}
