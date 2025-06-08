import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { auth, db } from "@api/firebase";
import { ViewType } from "@components/record/type";

export const useTotalPages = (viewType: ViewType, pageSize: number) => {
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = collection(db, "users", user.uid, viewType);
      const snapshot = await getCountFromServer(ref);
      const totalCount = snapshot.data().count;

      setTotalPages(Math.ceil(totalCount / pageSize));
      setIsLoading(false);
    };

    fetch();
  }, [viewType, pageSize]);

  return { totalPages, isLoading };
};
