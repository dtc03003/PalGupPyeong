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
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "@api/firebase";
import { updateAllAggregates } from "@utils/aggregateUtils";
import { parseWeekIdToDate } from "@utils/dateUtils";
import { Record } from "@components/record/type";

interface AddRecord {
  count: number;
}

interface PushupRecord extends AddRecord {
  createdAt: Timestamp;
}

interface UpdateRecordData {
  recordId: string;
  updatedData: {
    date?: Date;
    count?: number;
  };
}

type ViewType = "records" | "daily" | "weekly" | "monthly";

type LastVisibleMap = {
  [key in ViewType]?: QueryDocumentSnapshot<DocumentData>[];
};

// 기록 조회
export const useRecords = (
  viewType: ViewType,
  page: number,
  pageSize: number
) => {
  const [lastVisibleDocs, setLastVisibleDocs] = useState<LastVisibleMap>({});

  const queryResult = useQuery<Record[], Error>({
    queryKey: ["pushupRecords", viewType, page],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const recordsRef = collection(db, "users", user.uid, viewType);
      const lastDocs = lastVisibleDocs[viewType] ?? [];
      const prevLastDoc = page > 1 ? lastDocs[page - 2] : null;

      const recordsQuery = query(
        recordsRef,
        orderBy("__name__", "desc"),
        ...(prevLastDoc ? [startAfter(prevLastDoc)] : []),
        limit(pageSize)
      );

      const snap = await getDocs(recordsQuery);

      if (!snap.empty) {
        const lastDoc = snap.docs[snap.docs.length - 1];
        setLastVisibleDocs((prev) => ({
          ...prev,
          [viewType]: [...(prev[viewType] ?? []), lastDoc],
        }));
      }

      return snap.docs.map((doc) => ({
        id: doc.id,
        count: doc.data().total ?? doc.data().count,
        createdAt: doc.data().createdAt
          ? (doc.data().createdAt as Timestamp).toDate()
          : viewType === "weekly"
          ? parseWeekIdToDate(doc.id) ?? new Date()
          : new Date(doc.id),
      }));
    },
    staleTime: 1000 * 60,
  });

  return queryResult;
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
        "users",
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

      const recordRef = doc(db, "users", user.uid, "records", recordId);
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

      const recordRef = doc(db, "users", user.uid, "records", recordId);
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
