import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@api/firebase";

// 일일 목표량 설정
export const useSetDailyGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: number) => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const goalRef = doc(db, "users", user.uid, "goals", "default");
      await setDoc(goalRef, { goal }, { merge: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyGoal"] });
    },
  });
};

// 일일 목표량 조회
export const useGetDailyGoal = () => {
  const user = auth.currentUser;

  return useQuery({
    queryKey: ["dailyGoal"],
    queryFn: async () => {
      if (!user) return 0;

      const goalRef = doc(db, "users", user.uid, "goals", "default");
      const goalSnap = await getDoc(goalRef);

      if (goalSnap.exists()) {
        return goalSnap.data().goal;
      } else {
        await setDoc(goalRef, { goal: 100 });
        return 100;
      }
    },
    enabled: !!user,
  });
};
