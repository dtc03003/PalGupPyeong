import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../api/firebase";
import { useMutation, useQuery } from "react-query";

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
  return useMutation(async (newRecord: PushupRecord) => {
    const docRef = await addDoc(collection(db, "pushupRecords"), newRecord);
    return { id: docRef.id, ...newRecord };
  });
};

// 기록 리스트 조회
export const useRecords = () => {
  return useQuery<RecordData[]>("pushupRecords", async () => {
    const querySnapshot = await getDocs(collection(db, "pushupRecords"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      date: doc.data().date.toDate ? doc.data().date.toDate() : new Date(doc.data().date),
      count: doc.data().count,
    }));
  });
};
