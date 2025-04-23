import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, useAuth } from "@hooks/useAuth";
import * as S from "./SideMenu.styles";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = React.forwardRef<HTMLDivElement, SideMenuProps>(({ isOpen, onClose }, ref) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/auth/login");
    } catch (error) {
      toast.error(
        "로그아웃 에러 발생: " + (error instanceof Error ? error.message : "알 수 없는 오류")
      );
    }
  };

  const handlePageChange = (page: string) => {
    navigate(`/${page}`);
    onClose();
  };

  return (
    <S.MenuWrapper ref={ref} $isOpen={isOpen}>
      <div>
        <S.MenuItem onClick={() => handlePageChange("")}>홈</S.MenuItem>
        {user && (
          <>
            <S.MenuItem onClick={() => handlePageChange("record")}>기록 하기</S.MenuItem>
            <S.MenuItem onClick={() => handlePageChange("my-records")}>기록 목록</S.MenuItem>
          </>
        )}
      </div>
      <S.ProfileSection>
        {user ? (
          <>
            <S.ProfileName>{user.displayName || "사용자"}</S.ProfileName>
            <S.MenuItem onClick={handleLogout}>로그아웃</S.MenuItem>
          </>
        ) : (
          <>
            <S.MenuItem onClick={() => handlePageChange("auth/login")}>로그인</S.MenuItem>
            <S.MenuItem onClick={() => handlePageChange("auth/signup")}>회원가입</S.MenuItem>
          </>
        )}
      </S.ProfileSection>
    </S.MenuWrapper>
  );
});

export default SideMenu;
