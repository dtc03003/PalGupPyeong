import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

function Home() {
  const { user, loading, error } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    alert("로그아웃 성공");
  };

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러: {error}</p>;
  }

  return (
    <div>
      <h1>메인페이지</h1>
      {user ? (
        <div>
          <p>어서오세요, {user.displayName || user.email}님!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <a href="/login">로그인</a>
          <a href="/signup">회원가입</a>
        </>
      )}
    </div>
  );
}

export default Home;
