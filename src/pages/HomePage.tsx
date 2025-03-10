import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchDailyRecords } from "../hooks/useDailyRecords";
import { useGetDailyGoal } from "../hooks/useDailyGoal";
import DailyProgress from "../components/DailyProgress";

function Home() {
  const { user, loading: authLoading } = useAuth();
  const [dailyRecord, setDailyRecord] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: dailyGoal = 100, isLoading: goalLoading, error: goalError } = useGetDailyGoal();

  useEffect(() => {
    const getRecord = async () => {
      if (!user) {
        setError("로그인된 사용자가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const result = await fetchDailyRecords();
        setDailyRecord(result);
      } catch {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      getRecord();
    }
  }, [user, authLoading]);

  return (
    <div>
      <h1>메인페이지</h1>

      {(loading || goalLoading) && <p>로딩중...</p>}
      {(error || goalError) && <p>에러: {error || goalError?.message}</p>}

      {!loading && !error && !goalLoading && !goalError && (
        <DailyProgress total={dailyRecord || 0} goal={dailyGoal} />
      )}

      {/* 주간 월간 통계 */}
      {/* 빠른 기록 추가 */}
    </div>
  );
}

export default Home;
