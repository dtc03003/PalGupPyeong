import styled from "styled-components";

export const DialContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

export const Dial = styled.div.attrs<{ $rotation: number }>((props) => ({
  style: {
    transform: `rotate(${props.$rotation}deg)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 8px solid #aaa;
  border-radius: 50%;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 30px;
  height: 30px;
  background: #333;
  border-radius: 50%;
  position: absolute;
  top: -15px;
  left: calc(50% - 15px);
  cursor: grab;
`;
