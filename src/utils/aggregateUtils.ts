import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { format } from "date-fns";
import { db } from "@api/firebase";
import { getDayKey, getMonthKey, getWeekKey } from "./dateUtils";

const updateAggregate = async ({
  userId,
  type,
  key,
  diff,
  createdAt,
}: {
  userId: string;
  type: "daily" | "weekly" | "monthly";
  key: string;
  diff: number;
  createdAt: Date;
}) => {
  const ref = doc(db, "pushupRecords", userId, type, key);
  const docSnap = await getDoc(ref);
  const prevTotal = docSnap.exists() ? docSnap.data()?.total || 0 : 0;

  const baseData: any = {
    total: Math.max(prevTotal + diff, 0),
  };

  if (type === "daily") {
    const time = format(createdAt, "HH:mm");
    baseData.timeline = arrayUnion({ time, count: diff });
  }

  await setDoc(ref, baseData, { merge: true });
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
    updateAggregate({
      userId,
      type: "daily",
      key: dayKey,
      diff,
      createdAt,
    }),
    updateAggregate({
      userId,
      type: "weekly",
      key: weekKey,
      diff,
      createdAt,
    }),
    updateAggregate({
      userId,
      type: "monthly",
      key: monthKey,
      diff,
      createdAt,
    }),
  ]);
};
