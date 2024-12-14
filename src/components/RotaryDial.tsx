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

  // 드래그 시작
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    startAngle.current = getAngle(clientX, clientY);
  };

  // 움직일 때
  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;

      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const currentAngle = getAngle(clientX, clientY);
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

  // 드래그 끝
  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);


  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => handleMove(e);
    const onEnd = () => handleEnd();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchend", onEnd);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchend", onEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <S.DialContainer>
      <S.Dial className="dial" ref={dialRef} rotation={rotation}>
        <S.Display rotation={rotation}>{selectedNumber}</S.Display>
        <S.Handle onMouseDown={handleStart} onTouchStart={handleStart} />
      </S.Dial>
    </S.DialContainer>
  );
};

export default RotaryDial;
