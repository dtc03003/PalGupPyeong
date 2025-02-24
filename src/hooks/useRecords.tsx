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
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { auth } from "../api/firebase";
import { useState } from "react";

interface PushupRecord {
  count: number;
}

interface RecordData {
  id: string;
  count: number;
  createdAt: Date;
}

interface UpdateRecordData {
  recordId: string;
  updatedData: {
    date?: Date;
    count?: number;
  };
}

export const useRecords = (page: number, pageSize: number) => {
  const [lastVisibleDocs, setLastVisibleDocs] = useState<QueryDocumentSnapshot[]>([]);

  return useQuery<RecordData[]>({
    queryKey: ["pushupRecords", page],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const recordsRef = collection(db, "pushupRecords", user.uid, "records");

      const lastVisibleDoc = page > 1 ? lastVisibleDocs[page - 2] : null;

      if (page > 1 && !lastVisibleDoc) throw new Error("이전 페이지 데이터를 로드하지 못했습니다.");

      const recordsQuery = query(
        recordsRef,
        orderBy("createdAt", "desc"),
        limit(pageSize),
        ...(lastVisibleDoc ? [startAfter(lastVisibleDoc)] : [])
      );

      const querySnapshot = await getDocs(recordsQuery);

      // 현재 페이지의 마지막 문서를 기록
      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisibleDocs((prev) => {
          const updated = [...prev];
          updated[page - 1] = lastDoc;
          return updated;
        });
      }

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          count: data.count,
          createdAt: (data.createdAt as Timestamp).toDate(),
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

      const docRef = doc(
        db,
        "pushupRecords",
        user.uid,
        "records",
        Timestamp.now().toMillis().toString()
      );

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
      const recordRef = doc(db, "pushupRecords", user.uid, "records", recordId);
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

      const recordRef = doc(db, "pushupRecords", user.uid, "records", recordId);

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
