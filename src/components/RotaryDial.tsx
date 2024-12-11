import React, { useState, useRef, useCallback, useEffect } from "react";
import * as S from "./RotaryDial.styles";

const RotaryDial = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const dialRef = useRef<HTMLDivElement>(null);

  const getAngle = useCallback((x: number, y: number) => {
    if (!dialRef.current) return 0;
    const rect = dialRef.current.getBoundingClientRect();
    const dx = x - (rect.left + rect.width / 2);
    const dy = y - (rect.top + rect.height / 2);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startAngle.current = getAngle(e.clientX, e.clientY);
  };

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

        const newNumber = Math.max(0, Math.floor(newRotation / 36));
        setSelectedNumber(newNumber);

        return newRotation;
      });
    },
    [getAngle]
  );

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
      <S.Dial className="dial" ref={dialRef} rotation={rotation} onMouseDown={handleMouseDown}>
        <S.Display rotation={rotation}>{selectedNumber}</S.Display>
        <S.Handle />
      </S.Dial>
    </S.DialContainer>
  );
};

export default RotaryDial;
