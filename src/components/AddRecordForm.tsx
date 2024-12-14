import { useState } from "react";
import { useAddRecord } from "../hooks/useRecords";
import RotaryDial from "./RotaryDial";

const AddRecordForm = () => {
  const [count, setCount] = useState(0);
  const addRecord = useAddRecord();

  const handleRotationChange = (value: number) => {
    setCount(value);
  };

  const handleSubmit = async () => {
    try {
      await addRecord.mutateAsync({ count, date: new Date() });
      alert("기록이 추가되었습니다.");
      setCount(0);
    } catch (error) {
      console.error("기록 추가 실패:", error);
    }
  };

  return (
    <div>
      <RotaryDial onRotationChange={handleRotationChange} />
      <button onClick={handleSubmit}>기록 추가</button>
    </div>
  );
};

export default AddRecordForm;
