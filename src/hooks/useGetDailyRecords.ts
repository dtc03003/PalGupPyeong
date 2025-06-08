import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@api/firebase";
import { getDayId } from "@utils/dateUtils";

export const useGetDailyRecords = () => {
  return useQuery({
    queryKey: ["dailyStats"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const dayKey = getDayId(new Date());
      const docRef = doc(db, "users", user.uid, "daily", dayKey);
      const docSnap = await getDoc(docRef);

      return docSnap.exists() ? docSnap.data()?.total || 0 : 0;
    },
  });
};
