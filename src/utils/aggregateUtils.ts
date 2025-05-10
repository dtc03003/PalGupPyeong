import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@api/firebase";
import { getDayKey, getMonthKey, getWeekKey } from "./dateUtils";

const updateAggregate = async ({
  userId,
  type,
  key,
  diff,
}: {
  userId: string;
  type: "daily" | "weekly" | "monthly";
  key: string;
  diff: number;
}) => {
  const ref = doc(db, "pushupRecords", userId, type, key);
  const docSnap = await getDoc(ref);
  const total = docSnap.exists() ? docSnap.data()?.total || 0 : 0;
  await setDoc(ref, { total: Math.max(total + diff, 0) }, { merge: true });
};

export const updateAllAggregates = async ({
  userId,
  createdAt,
  diff,
}: {
  userId: string;
  createdAt: Date;
  diff: number;
}) => {
  const dayKey = getDayKey(createdAt);
  const weekKey = getWeekKey(createdAt);
  const monthKey = getMonthKey(createdAt);

  await Promise.all([
    updateAggregate({ userId, type: "daily", key: dayKey, diff }),
    updateAggregate({ userId, type: "weekly", key: weekKey, diff }),
    updateAggregate({ userId, type: "monthly", key: monthKey, diff }),
  ]);
};
