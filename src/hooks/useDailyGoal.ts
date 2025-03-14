import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase";

// 일일 목표량 조회
export const useSetDailyGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: number) => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const goalRef = doc(db, "pushupGoals", user.uid, "daily", getDayKey(new Date()));
      await setDoc(goalRef, { goal }, { merge: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyGoal"] });
    },
  });
};

// 일일 목표량 저장
export const useGetDailyGoal = () => {
  const user = auth.currentUser;

  return useQuery({
    queryKey: ["dailyGoal"],
    queryFn: async () => {
      if (!user) return 0;

      const goalRef = doc(db, "pushupGoals", user.uid, "daily", getDayKey(new Date()));
      const goalSnap = await getDoc(goalRef);
      return goalSnap.exists() ? goalSnap.data().goal : 0;
    },
    enabled: !!user,
  });
};

// 일 단위 키 (YYYY-MM-DD)
const getDayKey = (date: Date) => date.toISOString().split("T")[0];
