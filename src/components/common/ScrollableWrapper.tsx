import { useRef, useEffect, ReactNode } from "react";
import * as S from "./ScrollableWrapper.styles";

interface ScrollableWrapperProps {
  children: ReactNode;
}

const ScrollableWrapper: React.FC<ScrollableWrapperProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX;
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const walk = (e.pageX - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const walk = (e.touches[0].pageX - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, []);

  return (
    <S.Wrapper
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </S.Wrapper>
  );
};

export default ScrollableWrapper;
