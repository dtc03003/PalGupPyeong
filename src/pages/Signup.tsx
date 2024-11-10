import { useState } from "react";
import { signup } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(email, password);
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
};

export default SignupPage;
