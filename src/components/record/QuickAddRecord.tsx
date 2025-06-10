import { useState } from "react";
import { toast } from "react-toastify";
import { useAddRecord } from "@hooks/useRecords";

import * as S from "./QuickAddRecord.styles";

const QuickAddRecord = () => {
  const [count, setCount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addRecord = useAddRecord();

  const validateInput = (countStr: string, isSubmitting: boolean) => {
    if (isSubmitting) return false;

    const num = Number(countStr);
    if (num <= 0 || isNaN(num)) {
      toast.error("1개 이상의 개수를 입력하세요.");
      return false;
    }

    return true;
  };

  const handleAddRecord = async () => {
    if (!validateInput(count, isSubmitting)) return;

    setIsSubmitting(true);
    try {
      await addRecord.mutateAsync({ count: Number(count) });
      toast.success("기록이 추가되었습니다!");
      setCount("");
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCount(e.target.value.replace(/^0+(?=\d)/, ""))
        }
        min={1}
        placeholder="0"
      />
      <S.AddButton
        onClick={handleAddRecord}
        loading={isSubmitting}
        disabled={Number(count) <= 0 || isNaN(Number(count))}
      >
        빠른 기록 추가
      </S.AddButton>
    </S.QuickAddContainer>
  );
};

export default QuickAddRecord;
