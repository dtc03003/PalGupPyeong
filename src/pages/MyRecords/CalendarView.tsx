import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMonthlyRecords } from "@hooks/useMonthlyRecords";
import { formatDate } from "@utils/dateUtils";
import * as S from "./CalendarView.styles";

const CalendarView = () => {
  const today = new Date();
  const [activeMonth, setActiveMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const { data: records = [] } = useMonthlyRecords(
    activeMonth.year,
    activeMonth.month
  );

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;
    const key = formatDate(date);
    const record = records.find((r) => formatDate(r.createdAt) === key);
    return record ? (
      <div style={{ fontSize: "0.75rem", color: "green" }}>
        {record.total}회
      </div>
    ) : null;
  };

  return (
    <S.Container>
      <S.StyledCalendar
        showNeighboringMonth={false}
        tileContent={renderTileContent}
        locale="ko-KR"
        onActiveStartDateChange={({ activeStartDate }) => {
          if (!activeStartDate) return;
          setActiveMonth({
            year: activeStartDate.getFullYear(),
            month: activeStartDate.getMonth() + 1,
          });
        }}
      />
    </S.Container>
  );
};

export default CalendarView;
