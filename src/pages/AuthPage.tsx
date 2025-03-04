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
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSignup, setIsSignup] = useState(location.state?.isSignup ?? false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = () => {
    setEmailError(!isValidEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(password.length < 6);
  };

  const isButtonDisabled = loading || emailError || passwordError || !email || !password;

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
    <S.Wrapper>
      <S.Container>
        <S.PageIndicator>{isSignup ? "회원가입" : "로그인"}</S.PageIndicator>

        <S.Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          placeholder="이메일"
        />
        <S.ErrorText>{emailError && "올바른 이메일 형식을 입력해주세요."}</S.ErrorText>

        <S.Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          placeholder="비밀번호"
        />
        <S.ErrorText>{passwordError && "비밀번호는 최소 6자 이상이어야 합니다."}</S.ErrorText>

        <S.Button onClick={handleAuth} disabled={isButtonDisabled}>
          {loading ? "처리 중..." : isSignup ? "회원가입" : "로그인"}
        </S.Button>
        <S.ToggleText
          onClick={() => {
            setIsSignup(!isSignup);
            setEmail("");
            setPassword("");
            setEmailError(false);
            setPasswordError(false);
          }}
        >
          {isSignup ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
        </S.ToggleText>
      </S.Container>
    </S.Wrapper>
  );
};

export default AuthPage;
