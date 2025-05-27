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
  border-radius: ${({ $radius }) => $radius || "8px"};
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "24px"};
  margin: ${({ $margin }) => $margin || "0"};
  animation: ${shimmer} 1.2s infinite linear;
  background: ${({ theme }) =>
    `linear-gradient(
      to right,
      ${theme.skeletonBase} 0%,
      ${theme.skeletonHighlight} 20%,
      ${theme.skeletonBase} 40%,
      ${theme.skeletonBase} 100%
    )`};
  background-size: 200px 100%;
`;
