import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@api/firebase";
import { getDayId } from "@utils/dateUtils";

export const useDailyTimeline = (userId: string, date: Date | null) => {
  return useQuery({
    queryKey: ["dailyTimeline", userId, date?.toDateString()],
    queryFn: async () => {
      if (!userId || !date) return [];
      const key = getDayId(date);
      const ref = doc(db, "pushupRecords", userId, "daily", key);
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data()?.timeline || [] : [];
    },
    enabled: !!userId && !!date,
  });
};
