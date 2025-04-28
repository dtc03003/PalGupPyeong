import { useRef, useState } from "react";
import RotaryDial from "./RotaryDial";
import * as S from "./RotaryDialRecordForm.styles";

type RotaryDialRef = {
  handleReset: () => void;
};

const RotaryDialRecordForm = ({ onConfirm }: { onConfirm: (count: number) => void }) => {
  const [count, setCount] = useState(0);
  const rotaryDialRef = useRef<RotaryDialRef>(null);

  const handleRotationChange = (value: number) => {
    setCount(value);
  };

  const handleSubmit = async () => {
    onConfirm(count);
  };

  const handleReset = () => {
    if (rotaryDialRef.current) {
      rotaryDialRef.current.handleReset(); // 자식 컴포넌트의 handleReset 호출
    }
    setCount(0);
  };

  return (
    <S.RotaryDialRecordForm>
      <RotaryDial ref={rotaryDialRef} onRotationChange={handleRotationChange} />
      <S.ButtonContainer>
        <S.AddRecordButton onClick={handleSubmit} disabled={count === 0}>
          쉬기
        </S.AddRecordButton>
        <S.ResetButton onClick={handleReset}>0</S.ResetButton>
      </S.ButtonContainer>
    </S.RotaryDialRecordForm>
  );
};

export default RotaryDialRecordForm;
