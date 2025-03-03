import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, signup } from "../hooks/useAuth";
import * as S from "./AuthPage.styles";

const AuthPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSignup, setIsSignup] = useState(location.state?.isSignup ?? false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(isValidEmail(value) ? "" : "올바른 이메일 형식을 입력해주세요.");
  };

  const isButtonDisabled = loading || !!emailError;

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignup) {
        await signup(email, password);
        toast.success("회원가입 성공!");
        setIsSignup(false);
      } else {
        await login(email, password);
        toast.success("로그인 성공!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Input type="email" value={email} onChange={handleEmailChange} placeholder="이메일" />
      {emailError && <S.ErrorText>{emailError}</S.ErrorText>}
      <S.Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <S.Button onClick={handleAuth} disabled={isButtonDisabled}>
        {loading ? "처리 중..." : isSignup ? "회원가입" : "로그인"}
      </S.Button>
      <S.ToggleText onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
      </S.ToggleText>
    </S.Container>
  );
};

export default AuthPage;
