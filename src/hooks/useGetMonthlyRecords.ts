import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase";
import { getMonthKey } from "../utils/dateUtils";

export const useGetMonthlyRecords = () => {
  return useQuery({
    queryKey: ["monthlyStats"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const monthKey = getMonthKey(new Date());
      const monthlyRef = doc(db, "pushupRecords", user.uid, "monthly", monthKey);
      const monthlyDoc = await getDoc(monthlyRef);

      return monthlyDoc.exists() ? monthlyDoc.data()?.total || 0 : 0;
    },
  });
};
