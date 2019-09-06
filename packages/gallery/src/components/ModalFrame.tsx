import fromTheme from "theme/fromTheme";
import styled from "styled-components";

export default styled.div`
  background-color: ${fromTheme("panel")};
  padding: 0.75rem 1.25rem;

  min-height: 40vh;
  max-width: 40vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
