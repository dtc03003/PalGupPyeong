import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "@api/firebase";
import { getDayId, getWeekId, getMonthId, formatTime } from "./dateUtils";

const weekdayKeys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  const ref = doc(db, "users", userId, type, key);
  const docSnap = await getDoc(ref);
  const prevData = docSnap.exists() ? docSnap.data() : {};
  const prevTotal = prevData?.total || 0;

  const baseData: any = {
    total: Math.max(prevTotal + diff, 0),
  };

  if (type === "daily") {
    const time = formatTime(createdAt);
    baseData.timeline = arrayUnion({ time, count: diff });
  }

  if (type === "weekly") {
    const dayKey = weekdayKeys[createdAt.getDay()];
    const prevMap = prevData?.weeklyByDay || {};
    const prevCount = prevMap[dayKey] || 0;

    baseData.weeklyByDay = {
      ...prevMap,
      [dayKey]: Math.max(prevCount + diff, 0),
    };
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
  const dayKey = getDayId(createdAt);
  const weekKey = getWeekId(createdAt);
  const monthKey = getMonthId(createdAt);

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
