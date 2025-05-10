import styled, { keyframes } from "styled-components";

interface SkeletonBoxProps {
  $width?: string;
  $height?: string;
  $radius?: string;
  $margin?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonBox = styled.div<SkeletonBoxProps>`
  background-color: #e0e0e0;
  border-radius: ${({ $radius }) => $radius || "8px"};
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "24px"};
  margin: ${({ $margin }) => $margin || "0"};
  animation: ${shimmer} 1.2s infinite linear;
  background: linear-gradient(
    to right,
    #e0e0e0 0%,
    #f0f0f0 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );
  background-size: 200px 100%;
`;
