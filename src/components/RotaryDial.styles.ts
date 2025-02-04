import styled from "styled-components";

export const DialContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1;
`;

export const Dial = styled.div.attrs<{ $rotation: number }>((props) => ({
  style: {
    transform: `rotate(${props.$rotation}deg)`,
  },
}))`
  top: 0;
  left: 0;
  width: 80%;
  aspect-ratio: 1;
  border: 8px solid #aaa;
  border-radius: 50%;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none; /* 터치 스크롤, 확대/축소 방지 */
  user-select: none;
`;

export const Display = styled.div.attrs<{ $rotation: number }>((props) => ({
  style: {
    transform: `rotate(${- props.$rotation}deg)`,
  },
}))`
  font-size: 24px;
  font-weight: bold;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;


export const Handle = styled.div`
  width: 50px;
  aspect-ratio: 1;
  background: #333;
  border-radius: 50%;
  position: absolute;
  top: -25px;
  left: calc(50% - 25px);
  cursor: grab;
`;
