import { useEffect, useState } from "react";
import * as S from "./TimerComponent.styles";

const TimerComponent = ({ onTimerEnd, onRecordButton, currentCount }: { onTimerEnd: () => void, onRecordButton: () => void, currentCount: number }) => {
    const [seconds, setSeconds] = useState(60);
    const [progress, setProgress] = useState(100);
    const [totalCount, setTotalCount] = useState(currentCount);
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
            onTimerEnd();
        }
    }, [seconds, onTimerEnd]);

    const barColor = seconds <= 10 ? "red" : "green";


    useEffect(() => {
        setTotalCount(currentCount);
    }, [currentCount]);

    const handleAddToCount = () => {
        setTotalCount(totalCount + currentCount);
    };

    return (
        <S.ProgressBarContainer>
            <S.TimerText>{seconds}초 남음</S.TimerText>
            <p>누적된 팔굽혀펴기 횟수: {totalCount}회</p> {/* 타이머 화면에 누적된 count 표시 */}
            <S.ProgressBarBackground>
                <S.ProgressBar $progress={progress} $barColor={barColor} />
            </S.ProgressBarBackground>
            <button onClick={handleAddToCount}>시작하기</button>
            <button onClick={onRecordButton}>기록하기</button>
        </S.ProgressBarContainer>
    );
};

export default TimerComponent;
