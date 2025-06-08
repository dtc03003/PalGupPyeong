import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@api/firebase";
import { getMonthId } from "@utils/dateUtils";

export const useGetMonthlyRecords = () => {
  return useQuery({
    queryKey: ["monthlyStats"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const monthKey = getMonthId(new Date());
      const monthlyRef = doc(db, "users", user.uid, "monthly", monthKey);
      const monthlyDoc = await getDoc(monthlyRef);

      return monthlyDoc.exists() ? monthlyDoc.data()?.total || 0 : 0;
    },
  });
};
