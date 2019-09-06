import Button from "./Button";
import styled from "styled-components";

import arrow from "static/arrow.svg";

export default styled(Button)`
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: content-box;
`;
