import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "@api/firebase";

export const useMonthlyRecords = (year: number, month: number) => {
  return useQuery({
    queryKey: ["monthlyRecords", year, month],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const recordsRef = collection(db, "users", user.uid, "daily");
      const recordsQuery = query(
        recordsRef,
        where("__name__", ">=", startDate.toISOString().slice(0, 10)),
        where("__name__", "<", endDate.toISOString().slice(0, 10)),
        orderBy("__name__")
      );

      const snap = await getDocs(recordsQuery);

      return snap.docs.map((doc) => ({
        id: doc.id,
        total: doc.data().total,
        createdAt: new Date(doc.id),
      }));
    },
  });
};
