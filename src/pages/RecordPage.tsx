import { useState } from "react";
import { useAddRecord } from "../hooks/useRecords";
import RotaryDialRecordForm from "../components/RotaryDialRecordForm";
import TimerComponent from "../components/TimerComponent";
import RecordList from "../components/RecordList";

const RecordsPage = () => {
  const [step, setStep] = useState<"dial" | "timer" | "record">("dial");
  const [count, setCount] = useState(0);
  const addRecord = useAddRecord();

  const handleConfirmDial = (newCount: number) => {
    setCount(count + newCount);
    setStep("timer");
  };

  const handleTimerEnd = () => {
    setStep("dial");
  };

  const handleRecordButton = async () => {
    try {
      await addRecord.mutateAsync({ count });
      alert("기록이 추가되었습니다.");
    } catch (error) {
      console.error("기록 추가 실패:", error);
    }
    setStep("record");
  };

  return (
    <div>
      <h1>팔굽혀펴기 기록</h1>
      {step === "dial" && <RotaryDialRecordForm onConfirm={handleConfirmDial} />}
      {step === "timer" && (
        <TimerComponent
          onTimerEnd={handleTimerEnd}
          onRecordButton={handleRecordButton}
          currentCount={count}
        />
      )}
      {step === "record" && <RecordList />}
    </div>
  );
};

export default RecordsPage;
