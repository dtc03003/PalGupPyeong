import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
