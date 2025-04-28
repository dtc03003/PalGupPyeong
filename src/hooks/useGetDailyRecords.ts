import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@api/firebase";

export const useGetDailyRecords = () => {
  return useQuery({
    queryKey: ["dailyStats"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const getDayKey = (date: Date) => date.toISOString().split("T")[0];
      const dayKey = getDayKey(new Date());
      const docRef = doc(db, "pushupRecords", user.uid, "daily", dayKey);
      const docSnap = await getDoc(docRef);

      return docSnap.exists() ? docSnap.data()?.total || 0 : 0;
    },
  });
};
