import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.success("로그인 성공");
      navigate("/record");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>메인페이지</h1>

      {loading && <p>로딩중...</p>}
      {error && <p>에러: {error}</p>}

      <a href="/login">로그인</a>
      <a href="/signup">회원가입</a>
    </div>
  );
}

export default Home;
