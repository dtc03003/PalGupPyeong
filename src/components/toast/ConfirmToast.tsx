import React, { useState } from "react";
import * as S from "./ConfirmToast.styles";
import LoadingButton from "@components/common/LoadingButton";

interface ConfirmToastProps {
  message: string;
  onConfirm: () => Promise<void> | void;
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
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      closeToast?.();
    } catch {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    closeToast?.();
  };

  return (
    <S.ToastContainer>
      <p>{message}</p>
      {children}
      <S.ButtonContainer>
        <LoadingButton
          loading={loading}
          variant="primary"
          onClick={handleConfirm}
        >
          {confirmText}
        </LoadingButton>
        <LoadingButton
          disabled={loading}
          variant="danger"
          onClick={handleCancel}
        >
          {cancelText}
        </LoadingButton>
      </S.ButtonContainer>
    </S.ToastContainer>
  );
};

export default ConfirmToast;
