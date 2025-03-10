import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase";

export const fetchDailyRecords = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const getDayKey = (date: Date) => date.toISOString().split("T")[0];

  const dayKey = getDayKey(new Date());
  const docRef = doc(db, "pushupRecords", user.uid, "daily", dayKey);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data()?.total : 0;
};
