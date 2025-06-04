import styled, { keyframes } from "styled-components";
import ArrowIcon from "@assets/icons/icon_arrow.svg?react";

export const Wrapper = styled.div`
  max-width: 480px;
  height: calc(100% - 50px);
  padding: 0 24px 32px 24px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 32px;

  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  & > * {
    scroll-snap-align: start;
  }
`;

export const Section = styled.section`
  height: 100%;
  text-align: center;
  padding-top: 32px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 16px 0;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.subText};
  margin: 24px 0;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.05);
`;

export const Button = styled.button`
  width: 80%;
  background-color: #1e90ff;
  color: white;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  cursor: pointer;

  &:hover {
    background-color: #187bcd;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(.375rem);
  }
`;

export const ScrollHint = styled.div`
  margin-top: 8px;
  margin-bottom: 50px;
  text-align: center;
  color: #888;
  animation: ${bounce} 1.5s infinite;
  animation-timing-function: ease-in-out;
`;

export const Arrow = styled(ArrowIcon)`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 24px;
  filter: ${({ theme }) => (theme.mode === "dark" ? "invert(1)" : "none")};
`;

export const HintText = styled.p`
  font-size: 14.4px;
  margin-top: 4px;
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  padding: 40px 0 24px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const FeedbackButton = styled.button`
  font-size: 14px;
  padding: 6px 12px;
  background-color: transparent;
  color: ${({ theme }) => theme.subText};
  border: 1px solid ${({ theme }) => theme.subText};
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.subText}20;
  }
`;
