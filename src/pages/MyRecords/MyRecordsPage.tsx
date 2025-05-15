import { useState } from "react";
import RecordView from "./RecordView";
import CalendarView from "./CalendarView";
import * as S from "./MyRecordsPage.styles";

type TabOption = "record" | "calendar";

const RecordListPage = () => {
  const [tab, setTab] = useState<TabOption>("record");

  return (
    <S.Container>
      <S.TabWrapper>
        <S.TabButton
          $active={tab === "record"}
          onClick={() => setTab("record")}
        >
          기록 보기
        </S.TabButton>
        <S.TabButton
          $active={tab === "calendar"}
          onClick={() => setTab("calendar")}
        >
          캘린더 보기
        </S.TabButton>
      </S.TabWrapper>

      {tab === "record" && <RecordView />}
      {tab === "calendar" && <CalendarView />}
    </S.Container>
  );
};

export default RecordListPage;
