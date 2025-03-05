import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, signup } from "../hooks/useAuth";
import BtnEyeOff from "../assets/btn_eye_off.svg?react";
import BtnEyeON from "../assets/btn_eye_on.svg?react";
import * as S from "./AuthPage.styles";

const AuthPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
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

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordError(password !== confirmPassword);
  };

  const isButtonDisabled =
    loading ||
    emailError ||
    passwordError ||
    confirmPasswordError ||
    !email ||
    !password ||
    (isSignup && confirmPassword !== password);

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

        <S.InputContainer>
          <S.Input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            placeholder="비밀번호"
          />
          <S.VisibilityBtn onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <BtnEyeON /> : <BtnEyeOff />}
          </S.VisibilityBtn>
        </S.InputContainer>

        <S.ErrorText>{passwordError && "비밀번호는 최소 6자 이상이어야 합니다."}</S.ErrorText>

        {isSignup && (
          <>
            <S.InputContainer>
              <S.Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleConfirmPasswordBlur}
                placeholder="비밀번호 확인"
              />
              <S.VisibilityBtn
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                {isConfirmPasswordVisible ? <BtnEyeON /> : <BtnEyeOff />}
              </S.VisibilityBtn>
            </S.InputContainer>
            <S.ErrorText>{confirmPasswordError && "비밀번호가 일치하지 않습니다."}</S.ErrorText>
          </>
        )}

        <S.Button onClick={handleAuth} disabled={isButtonDisabled}>
          {loading ? "처리 중..." : isSignup ? "회원가입" : "로그인"}
        </S.Button>
        <S.ToggleText
          onClick={() => {
            setIsSignup(!isSignup);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setEmailError(false);
            setPasswordError(false);
            setConfirmPasswordError(false);
          }}
        >
          {isSignup ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
        </S.ToggleText>
      </S.Container>
    </S.Wrapper>
  );
};

export default AuthPage;
