import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { auth } from "../api/firebase";

interface PushupRecord {
  count: number;
  date: Date;
}

type RecordData = {
  id: string;
  date: Date;
  count: number;
};

interface UpdateRecordData {
  recordId: string;
  updatedData: {
    date?: Date;
    count?: number;
  };
}

// 기록 리스트 조회
export const useRecords = () => {
  return useQuery<RecordData[]>({
    queryKey: ["pushupRecords"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const querySnapshot = await getDocs(
        query(collection(db, "users", user.uid, "pushupRecords"), orderBy("date", "asc"))
      );
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          date: (data.date as Timestamp).toDate(), // Timestamp -> Date 변환
          count: data.count,
        };
      });
    },
  });
};

// 기록 추가
export const useAddRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRecord: PushupRecord) => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const docRef = await addDoc(collection(db, "users", user.uid, "pushupRecords"), {
        ...newRecord,
        date: Timestamp.fromDate(newRecord.date),
        userId: user.uid,
      });
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

// 기록 삭제
export const useDeleteRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (recordId) => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      // Firestore에서 해당 기록 삭제
      const recordRef = doc(db, "users", user.uid, "pushupRecords", recordId);
      await deleteDoc(recordRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pushupRecords"],
        exact: true,
      });
    },
  });
};

// 기록 수정
export const useUpdateRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateRecordData>({
    mutationFn: async ({ recordId, updatedData }) => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const recordRef = doc(db, "users", user.uid, "pushupRecords", recordId);

      const updatedPayload = {
        ...updatedData,
        ...(updatedData.date && { date: Timestamp.fromDate(updatedData.date) }),
      };
      await updateDoc(recordRef, updatedPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pushupRecords"],
        exact: true,
      });
    },
  });
};
