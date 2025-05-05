// hooks/usePushupRecords.ts
import { useState } from "react";
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
  limit,
  startAfter,
  QueryDocumentSnapshot,
  getDoc,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { db, auth } from "@api/firebase";
import { updateAllAggregates } from "@utils/aggregateUtils";

interface AddRecord {
  count: number;
}

interface PushupRecord extends AddRecord {
  createdAt: Timestamp;
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

// 기록 조회
export const useRecords = (page: number, pageSize: number) => {
  const [lastVisibleDocs, setLastVisibleDocs] = useState<
    QueryDocumentSnapshot[]
  >([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const queryResult = useQuery<RecordData[], Error>({
    queryKey: ["pushupRecords", page],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const recordsRef = collection(db, "pushupRecords", user.uid, "records");

      if (totalPages === null) {
        const snapshot = await getCountFromServer(recordsRef);
        const totalCount = snapshot.data().count;
        setTotalPages(Math.ceil(totalCount / pageSize));
      }

      const lastVisibleDoc = page > 1 ? lastVisibleDocs[page - 2] : null;
      if (page > 1 && !lastVisibleDoc)
        throw new Error("이전 페이지 데이터를 로드하지 못했습니다.");

      const recordsQuery = query(
        recordsRef,
        orderBy("createdAt", "desc"),
        limit(pageSize),
        ...(lastVisibleDoc ? [startAfter(lastVisibleDoc)] : [])
      );

      const querySnapshot = await getDocs(recordsQuery);
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
    staleTime: 1000 * 60,
  });

  return {
    ...queryResult,
    totalPages,
  };
};

// 기록 추가
export const useAddRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRecord: AddRecord) => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인된 사용자가 없습니다.");

      const now = Timestamp.now();
      const newRecordWithTimestamp = {
        ...newRecord,
        userId: user.uid,
        createdAt: now,
      };

      const recordRef = doc(
        db,
        "pushupRecords",
        user.uid,
        "records",
        now.toMillis().toString()
      );
      await setDoc(recordRef, newRecordWithTimestamp);

      await updateAllAggregates({
        userId: user.uid,
        createdAt: now.toDate(),
        diff: newRecord.count,
      });

      return { id: recordRef.id, ...newRecordWithTimestamp };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pushupRecords"] });
      queryClient.invalidateQueries({ queryKey: ["dailyStats"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyStats"] });
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

      const recordRef = doc(db, "pushupRecords", user.uid, "records", recordId);
      const recordDoc = await getDoc(recordRef);
      if (!recordDoc.exists()) throw new Error("기록이 존재하지 않습니다.");

      const recordData = recordDoc.data() as PushupRecord;

      await deleteDoc(recordRef);

      await updateAllAggregates({
        userId: user.uid,
        createdAt: recordData.createdAt.toDate(),
        diff: -recordData.count,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pushupRecords"] });
      queryClient.invalidateQueries({ queryKey: ["dailyStats"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyStats"] });
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
      const recordDoc = await getDoc(recordRef);
      if (!recordDoc.exists()) throw new Error("기록이 존재하지 않습니다.");

      const recordData = recordDoc.data() as PushupRecord;
      const oldCount = recordData.count;
      const newCount = updatedData.count ?? oldCount;

      const updatedPayload = {
        ...updatedData,
        ...(updatedData.date && { date: Timestamp.fromDate(updatedData.date) }),
      };

      await updateDoc(recordRef, updatedPayload);

      await updateAllAggregates({
        userId: user.uid,
        createdAt: recordData.createdAt.toDate(),
        diff: newCount - oldCount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pushupRecords"] });
      queryClient.invalidateQueries({ queryKey: ["dailyStats"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyStats"] });
    },
  });
};
