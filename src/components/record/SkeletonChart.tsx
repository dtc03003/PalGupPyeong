import styled from "styled-components";
import { SkeletonBox } from "@components/common/SkeletonBox";

const SkeletonChart = () => {
  return (
    <Wrapper>
      <SkeletonBox $width="100%" $height="260px" />
    </Wrapper>
  );
};

export default SkeletonChart;

const Wrapper = styled.div`
  width: 100%;
  height: 260px;
  box-sizing: border-box;
`;
