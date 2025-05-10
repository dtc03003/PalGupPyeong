import { SkeletonBox } from "@components/common/SkeletonBox";
import * as S from "./StatsCard.styles";

interface StatsCardProps {
  title: string;
  data?: number;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, data, isLoading }) => {
  return (
    <S.StatsContainer>
      <S.StatsTitle>{title}</S.StatsTitle>
      <S.StatsText>
        {isLoading ? (
          <SkeletonBox $width="40%" $height="24px" />
        ) : data !== undefined ? (
          `${data}`
        ) : (
          "데이터가 없습니다."
        )}
      </S.StatsText>
    </S.StatsContainer>
  );
};

export default StatsCard;
