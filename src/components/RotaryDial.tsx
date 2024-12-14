import React, { useState, useRef, useCallback, useEffect } from "react";
import * as S from "./RotaryDial.styles";

interface RotaryDialProps {
  onRotationChange: (value: number) => void;
}

const RotaryDial: React.FC<RotaryDialProps> = ({ onRotationChange }) => {
  const [rotation, setRotation] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const dialRef = useRef<HTMLDivElement>(null);

  // 좌표 계산
  const getAngle = useCallback((x: number, y: number) => {
    if (!dialRef.current) return 0;
    const rect = dialRef.current.getBoundingClientRect();
    const dx = x - (rect.left + rect.width / 2);
    const dy = y - (rect.top + rect.height / 2);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }, []);

  // 마우스 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startAngle.current = getAngle(e.clientX, e.clientY);
  };

  // 마우스가 움직일 때
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;

      const currentAngle = getAngle(e.clientX, e.clientY);
      let angleDelta = currentAngle - startAngle.current;

      if (angleDelta > 180) angleDelta -= 360;
      if (angleDelta < -180) angleDelta += 360;

      startAngle.current = currentAngle;

      setRotation((prevRotation) => {
        const newRotation = prevRotation + angleDelta;

        if (newRotation < 0) return prevRotation;

        const newNumber = Math.max(0, Math.floor(newRotation / 36));
        setSelectedNumber(newNumber);
        onRotationChange(newNumber);

        return newRotation;
      });
    },
    [getAngle, onRotationChange]
  );

  // 마우스 드래그 끝
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <S.DialContainer>
      <S.Dial className="dial" ref={dialRef} rotation={rotation}>
        <S.Display rotation={rotation}>{selectedNumber}</S.Display>
        <S.Handle onMouseDown={handleMouseDown} />
      </S.Dial>
    </S.DialContainer>
  );
};

export default RotaryDial;
