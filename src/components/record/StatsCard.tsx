import { ReactNode } from "react";
import { SkeletonBox } from "@components/common/SkeletonBox";
import * as S from "./StatsCard.styles";

interface StatsCardProps {
  title: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  isLoading,
  children,
}) => {
  return (
    <S.StatsContainer>
      <S.StatsTitle>{title}</S.StatsTitle>
      {isLoading ? <SkeletonBox $width="100%" $height="100px" /> : children}
    </S.StatsContainer>
  );
};

export default StatsCard;
