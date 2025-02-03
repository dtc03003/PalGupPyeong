import { useState } from "react";
import RotaryDialRecordForm from "../components/RotaryDialRecordForm";
import TimerComponent from "../components/TimerComponent";
import RecordList from "../components/RecordList";

const RecordsPage = () => {
  const [step, setStep] = useState<"dial" | "timer" | "record">("dial");
  const [count, setCount] = useState(0);


  const handleConfirmDial = (newCount: number) => {
    setCount(newCount);
    setStep("timer");
  };

  const handleTimerEnd = () => {
    setStep("dial");
    setCount(0);
  };

  const handleRecordButton = () => {
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