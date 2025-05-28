import styled from "styled-components";
import { SkeletonBox } from "@components/common/SkeletonBox";

const SkeletonRecordItem = () => {
  return (
    <Container>
      <SkeletonBox $width="30%" $height="20px" />
      <SkeletonBox $width="80%" $height="14px" $margin="6px 0 0 0" />
    </Container>
  );
};

export default SkeletonRecordItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;
