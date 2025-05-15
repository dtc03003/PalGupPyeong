import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@api/firebase";
import { getWeekId } from "@utils/dateUtils";

export const useGetWeeklyRecords = () => {
  return useQuery({
    queryKey: ["weeklyStats"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const weekKey = getWeekId(new Date());
      const weeklyRef = doc(db, "pushupRecords", user.uid, "weekly", weekKey);
      const weeklyDoc = await getDoc(weeklyRef);

      return weeklyDoc.exists() ? weeklyDoc.data()?.total || 0 : 0;
    },
  });
};
