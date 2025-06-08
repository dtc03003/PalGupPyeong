import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PlanCard from "@components/layout/PlanCard";
import SubCard from "@components/layout/SubCard";

import landingImage from "@assets/images/img_landing.png";
import rotaryDialImage from "@assets/images/img_rotary_dial.gif";
import recordImage from "@assets/images/img_records.png";
import calendarImage from "@assets/images/img_calender.png";
import timerImage from "@assets/images/img_timer.png";
import dailyGoalImage from "@assets/images/img_daily_goal.png";

import * as S from "./IntroPage.styles";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Section>
        <S.Image src={landingImage} alt="팔굽평 예시" />
        <S.Title>작은 습관이 만드는 큰 변화</S.Title>
        <S.Subtitle>
          하루 한 번, 팔굽혀펴기 기록을 남겨보세요. <br />
          꾸준한 기록이 어제보다 나은 오늘을 만듭니다.
        </S.Subtitle>
        <S.Button onClick={() => navigate("/auth/login")}>
          기록 시작하기
        </S.Button>
        <S.ScrollHint>
          <S.Arrow />
          <S.HintText>아래로 스크롤</S.HintText>
        </S.ScrollHint>
      </S.Section>

      <PlanCard
        point="Point 01"
        title="회전식 다이얼로 간편하게 기록"
        src={rotaryDialImage}
      />

      <PlanCard
        point="Point 02"
        title="통계 그래프로 확인하는 성장"
        src={recordImage}
        $imgPosition="left"
      />

      <PlanCard
        point="Point 03"
        title="언제 했는지, 한눈에 보는 타임라인"
        src={calendarImage}
      />

      <SubCard
        title="세트 간 휴식도 놓치지 마세요"
        description="세트 간 휴식을 관리하는 타이머로 운동 루틴을 더 효율적으로 유지할 수 있어요."
        src={timerImage}
      />

      <SubCard
        title="오늘의 목표, 얼마나 달성했을까요?"
        description="하루 팔굽혀펴기 목표를 설정하고 달성률을 확인하세요."
        src={dailyGoalImage}
      />

      <S.Footer>
        <>
          작은 반복이 만드는 큰 변화
          <br />© 2025 팔굽평
        </>
        <S.FeedbackButton
          onClick={() => {
            navigator.clipboard.writeText("dtc03003@gmail.com");
            toast("이메일 주소가 복사되었습니다!");
          }}
        >
          이메일로 의견 보내기
        </S.FeedbackButton>
      </S.Footer>
    </S.Wrapper>
  );
};

export default IntroPage;
