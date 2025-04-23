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
} from "firebase/firestore";
import { db } from "@api/firebase";
import { auth } from "@api/firebase";
import { getDayKey, getMonthKey, getWeekKey } from "@utils/dateUtils";

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

// 기록 조회
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

      const now = Timestamp.now();
      const dayKey = getDayKey(now.toDate()); // 일간 키 (YYYY-MM-DD)
      const weekKey = getWeekKey(now.toDate()); // 주간 키 (YYYY-WW)
      const monthKey = getMonthKey(now.toDate()); // 월간 키 (YYYY-MM)

      const newRecordWithTimestamp = {
        ...newRecord,
        userId: user.uid,
        createdAt: now,
      };

      // 개별 기록 저장
      const recordRef = doc(db, "pushupRecords", user.uid, "records", now.toMillis().toString());
      await setDoc(recordRef, newRecordWithTimestamp);

      // 일간 합산 기록 업데이트
      const dailyRef = doc(db, "pushupRecords", user.uid, "daily", dayKey);
      const dailyDoc = await getDoc(dailyRef);
      const dailyTotal = dailyDoc.exists() ? dailyDoc.data()?.total || 0 : 0;
      await setDoc(dailyRef, { total: dailyTotal + newRecord.count }, { merge: true });

      // 주간 합산 기록 업데이트
      const weeklyRef = doc(db, "pushupRecords", user.uid, "weekly", weekKey);
      const weeklyDoc = await getDoc(weeklyRef);
      const weeklyTotal = weeklyDoc.exists() ? weeklyDoc.data()?.total || 0 : 0;
      await setDoc(weeklyRef, { total: weeklyTotal + newRecord.count }, { merge: true });

      // 월간 합산 기록 업데이트
      const monthlyRef = doc(db, "pushupRecords", user.uid, "monthly", monthKey);
      const monthlyDoc = await getDoc(monthlyRef);
      const monthlyTotal = monthlyDoc.exists() ? monthlyDoc.data()?.total || 0 : 0;
      await setDoc(monthlyRef, { total: monthlyTotal + newRecord.count }, { merge: true });

      return { id: recordRef.id, ...newRecordWithTimestamp };
    },
    onSuccess: () => {
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
