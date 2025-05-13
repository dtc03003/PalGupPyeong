import { useState } from "react";
import RecordView from "./RecordView";
import CalendarView from "./CalendarView";

type TabOption = "record" | "calendar";

const RecordListPage = () => {
  const [tab, setTab] = useState<TabOption>("record");

  return (
    <>
      <>
        <button onClick={() => setTab("record")}>기록 보기</button>
        <button onClick={() => setTab("calendar")}>캘린더 보기</button>
      </>

      {tab === "record" && <RecordView />}
      {tab === "calendar" && <CalendarView />}
    </>
  );
};

export default RecordListPage;
