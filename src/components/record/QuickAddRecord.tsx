import { useState } from "react";
import { toast } from "react-toastify";
import { useAddRecord } from "@hooks/useRecords";

import * as S from "./QuickAddRecord.styles";

const QuickAddRecord = () => {
  const [count, setCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addRecord = useAddRecord();

  const validateInput = (count: number, isSubmitting: boolean) => {
    if (isSubmitting) return false;

    if (count <= 0) {
      toast.error("1개 이상의 개수를 입력하세요.");
      return false;
    }

    return true;
  };

  const handleAddRecord = async () => {
    if (!validateInput(count, isSubmitting)) return;

    setIsSubmitting(true);
    try {
      await addRecord.mutateAsync({ count });
      toast.success("기록이 추가되었습니다!");
      setCount(0);
    } catch {
      toast.error("기록 추가에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.QuickAddContainer>
      <S.Input
        type="number"
        value={count}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
        min={1}
      />
      <S.AddButton onClick={handleAddRecord} disabled={isSubmitting || count <= 0}>빠른 기록 추가</S.AddButton>
    </S.QuickAddContainer>
  );
};

export default QuickAddRecord;
