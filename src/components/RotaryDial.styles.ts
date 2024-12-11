import styled from "styled-components";

interface DisplayProps {
  rotation: number;
}

export const DialContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

export const Dial = styled.div<{ rotation: number }>`
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
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`;

export const Display = styled.div<DisplayProps>`
  font-size: 24px;
  font-weight: bold;
  z-index: 1;
  pointer-events: none;
  transform: ${({ rotation }) => `rotate(${-rotation}deg)`};
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
