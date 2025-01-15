import { useRef, useState } from "react";
import { useAddRecord } from "../hooks/useRecords";
import RotaryDial from "./RotaryDial";

type RotaryDialRef = {
  handleReset: () => void;
};

const AddRecordForm = () => {
  const [count, setCount] = useState(0);
  const addRecord = useAddRecord();
  const rotaryDialRef = useRef<RotaryDialRef>(null);

  const handleRotationChange = (value: number) => {
    setCount(value);
  };

  const handleSubmit = async () => {
    try {
      await addRecord.mutateAsync({ count });
      alert("기록이 추가되었습니다.");
      setCount(0);
    } catch (error) {
      console.error("기록 추가 실패:", error);
    }
  };

  const handleReset = () => {
    if (rotaryDialRef.current) {
      rotaryDialRef.current.handleReset(); // 자식 컴포넌트의 handleReset 호출
    }
    setCount(0);
  };

  return (
    <div>
      <RotaryDial ref={rotaryDialRef} onRotationChange={handleRotationChange} />
      <button onClick={handleSubmit}>기록 추가</button>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default AddRecordForm;
