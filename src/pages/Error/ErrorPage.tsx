import * as S from "./ErrorPage.styles";
import pushupGif from "@assets/images/img_pushup.gif";

const ErrorPage = () => {
    return (
        <S.ErrorPageContainer>
            <img src={pushupGif} alt="팔굽혀펴기" />
            <S.Title>404 ERROR</S.Title>
            <S.Description>페이지를 찾을 수 없습니다.</S.Description>
        </S.ErrorPageContainer>
    );
};

export default ErrorPage;