import styled, { css, keyframes } from "styled-components";

const variants = {
  primary: css`
    background-color: #28a745;
    &:hover:enabled {
      background-color: #218838;
    }
  `,
  danger: css`
    background-color: #dc3545;
    &:hover:enabled {
      background-color: #c82333;
    }
  `,
};

export const Button = styled.button<{ $variant: "primary" | "danger" }>`
  padding: 8px 15px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  ${({ $variant }) => variants[$variant]}

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &:active:enabled {
    transform: scale(0.98);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  margin: 0 auto;
`;
