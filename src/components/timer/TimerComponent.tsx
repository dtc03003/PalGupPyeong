import { useEffect, useState } from "react";
import * as S from "./TimerComponent.styles";

const TimerComponent = ({
  onTimerEnd,
  onRecordButton,
  currentCount,
}: {
  onTimerEnd: () => void;
  onRecordButton: () => void;
  currentCount: number;
}) => {
  const [seconds, setSeconds] = useState(60);
  const [progress, setProgress] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          setProgress((newSeconds / 60) * 100);
          return newSeconds;
        });
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }
  }, [seconds]);

  return (
    <S.Container>
      <>
        <S.TimerWrapper>
          <S.Circle $progress={progress}>
            <S.CircleText>
              {!isFinished ? <>{seconds}초</> : <S.EndMessage>휴식 끝!</S.EndMessage>}
            </S.CircleText>
          </S.Circle>
        </S.TimerWrapper>
        <S.CounterText>누적 횟수: {currentCount}회</S.CounterText>
      </>

      <S.ButtonContainer>
        <S.ActionButton onClick={onTimerEnd}>운동 더하기</S.ActionButton>
        <S.RecordButton onClick={onRecordButton}>기록하기</S.RecordButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default TimerComponent;
