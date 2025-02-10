import { useState } from "react";
import { toast } from "react-toastify";
import { useAddRecord } from "../hooks/useRecords";
import RotaryDialRecordForm from "../components/RotaryDialRecordForm";
import TimerComponent from "../components/TimerComponent";
import RecordList from "../components/RecordList";

const RecordsPage = () => {
  const [step, setStep] = useState<"dial" | "timer" | "record">("dial");
  const [count, setCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복요청 방지
  const addRecord = useAddRecord();

  const handleConfirmDial = (newCount: number) => {
    setCount(count + newCount);
    setStep("timer");
  };

  const handleTimerEnd = () => {
    setStep("dial");
  };

  const handleRecordButton = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addRecord.mutateAsync({ count });
      toast.success("기록이 추가되었습니다.");
      setStep("record");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
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
