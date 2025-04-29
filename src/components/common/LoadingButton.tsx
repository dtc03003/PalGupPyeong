import React from "react";
import * as S from "./LoadingButton.styles";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "danger";
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <S.Button
      disabled={loading || props.disabled}
      $variant={variant}
      {...props}
    >
      {loading ? <S.Spinner /> : children}
    </S.Button>
  );
};

export default LoadingButton;
