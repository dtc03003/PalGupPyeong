import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { auth } from "../api/firebase";

interface PushupRecord {
  count: number;
}

interface RecordData {
  id: string;
  count: number;
  createdAt: Timestamp;
}

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
        query(collection(db, "pushupRecords", user.uid, "records"))
      );

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          count: data.count,
          createdAt: data.createdAt,
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

      const newRecordWithTimestamp = {
        ...newRecord,
        userId: user.uid,
        createdAt: Timestamp.now(),
      };

      const docRef = doc(db, "pushupRecords", user.uid, "records", Timestamp.now().toMillis().toString());

      await setDoc(docRef, newRecordWithTimestamp);

      return { id: docRef.id, ...newRecordWithTimestamp };
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
