import { useState } from "react";
import { login } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    } finally {
      setLoading(false);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="buttonContainer">
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
