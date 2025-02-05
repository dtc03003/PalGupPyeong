import { useState } from "react";
import { toast } from "react-toastify";
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
      toast.success("기록이 추가되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
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
