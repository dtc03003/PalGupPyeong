import { useQuery } from "@tanstack/react-query";
import { auth, db } from "@api/firebase";
import { getYear } from "date-fns";
import { collection, getDocs } from "firebase/firestore";

export const useGetMonthlyByMonth = () => {
  return useQuery({
    queryKey: ["monthlyByMonth"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const year = getYear(new Date());
      const monthlyRef = collection(db, "pushupRecords", user.uid, "monthly");
      const snapshot = await getDocs(monthlyRef);

      const monthlyMap: Record<string, number> = {};
      snapshot.forEach((doc) => {
        const key = doc.id;
        if (key.startsWith(`${year}-`)) {
          const month = parseInt(key.split("-")[1], 10);
          monthlyMap[month] = doc.data()?.total || 0;
        }
      });

      return Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: monthlyMap[i + 1] || 0,
      }));
    },
  });
};
