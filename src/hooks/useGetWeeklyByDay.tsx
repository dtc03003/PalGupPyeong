import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@api/firebase";
import { getWeekId } from "@utils/dateUtils";

export const useGetWeeklyByDay = () => {
  return useQuery({
    queryKey: ["weeklyByDay"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const weekKey = getWeekId(new Date());
      const weeklyRef = doc(db, "users", user.uid, "weekly", weekKey);
      const weeklyDoc = await getDoc(weeklyRef);

      if (!weeklyDoc.exists()) return [];

      const map = weeklyDoc.data()?.weeklyByDay || {};
      return [
        { day: "Mon", count: map.Mon || 0 },
        { day: "Tue", count: map.Tue || 0 },
        { day: "Wed", count: map.Wed || 0 },
        { day: "Thu", count: map.Thu || 0 },
        { day: "Fri", count: map.Fri || 0 },
        { day: "Sat", count: map.Sat || 0 },
        { day: "Sun", count: map.Sun || 0 },
      ];
    },
  });
};
