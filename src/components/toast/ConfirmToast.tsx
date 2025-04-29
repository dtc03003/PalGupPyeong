import React from "react";
import * as S from "./ConfirmToast.styles";

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  closeToast?: () => void;
  children?: React.ReactNode;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
  closeToast,
  children,
}) => {
  return (
    <S.ToastContainer>
      <p>{message}</p>
      {children}
      <S.ButtonContainer>
        <S.SaveButton
          onClick={() => {
            onConfirm();
            closeToast?.();
          }}
        >
          {confirmText}
        </S.SaveButton>
        <S.CancelButton
          onClick={() => {
            onCancel?.();
            closeToast?.();
          }}
        >
          {cancelText}
        </S.CancelButton>
      </S.ButtonContainer>
    </S.ToastContainer>
  );
};

export default ConfirmToast;
