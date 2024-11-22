import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../api/firebase";

interface PushupRecord {
  count: number;
  date: Date;
}

type RecordData = {
  id: string;
  date: Date;
  count: number;
};

// 기록 추가
export const useAddRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRecord: PushupRecord) => {
      const docRef = await addDoc(collection(db, "pushupRecords"), newRecord);
      return { id: docRef.id, ...newRecord };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pushupRecords"],
        exact: true,
      });
    },
  });
};

// 기록 리스트 조회
export const useRecords = () => {
  return useQuery<RecordData[]>({
    queryKey: ["pushupRecords"],
    queryFn: async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "pushupRecords"), orderBy("date", "asc"))
      );
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date.toDate ? doc.data().date.toDate() : new Date(doc.data().date),
        count: doc.data().count,
      }));
    },
  });
};
