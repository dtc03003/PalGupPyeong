import * as S from "./SubCard.styles";

interface SubCardProps {
  title: string;
  description?: string;
  src: string;
}

const SubCard = ({ title, description, src }: SubCardProps) => {
  return (
    <S.Wrapper>
      <S.Image src={src} alt="Sub Card Image" />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};

export default SubCard;
