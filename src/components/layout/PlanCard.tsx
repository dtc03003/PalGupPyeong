import * as S from "./PlanCard.styles";

interface PlanCardProps {
  point: string;
  title: string;
  src: string;
  $imgPosition?: "left" | "right";
}

const PlanCard = ({
  point,
  title,
  src,
  $imgPosition = "right",
}: PlanCardProps) => {
  return (
    <S.Wrapper>
      <S.Point>{point}</S.Point>
      <S.Title>{title}</S.Title>
      <S.Image src={src} alt="Plan Card Image" $imgPosition={$imgPosition} />
    </S.Wrapper>
  );
};

export default PlanCard;
