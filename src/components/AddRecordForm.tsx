import { useState } from "react";
import { useAddRecord } from "../hooks/useRecords";

const AddRecordForm = () => {
  const [count, setCount] = useState(0);
  const addRecord = useAddRecord();

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
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        placeholder="팔굽혀펴기 횟수"
      />
      <button onClick={handleSubmit}>기록 추가</button>
    </div>
  );
};

export default AddRecordForm;
