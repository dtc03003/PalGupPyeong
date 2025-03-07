import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchDailyRecords } from "../hooks/useRecords";

function Home() {
  const [dailyRecord, setDailyRecord] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecord = async () => {
      try {
        const result = await fetchDailyRecords();
        setDailyRecord(result);
      } catch (error) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getRecord();
  }, []);

  return (
    <div>
      <h1>메인페이지</h1>


      {loading && <p>로딩중...</p>}
      {error && <p>에러: {error}</p>}

      {/* 오늘의 기록 목표 진행사항 */}
      <p>{dailyRecord ? `${dailyRecord} 회` : "기록이 없습니다."}</p>

      {/* 주간 월간 통계 */}

      {/* 빠른 기록 추가 */}

    </div>
  );
}

export default Home;
