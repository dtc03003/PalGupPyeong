import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMonthlyRecords } from "@hooks/useMonthlyRecords";
import { useDailyTimeline } from "@hooks/useDailyTimeline";
import { auth } from "@api/firebase";
import { formatDate } from "@utils/dateUtils";
import * as S from "./CalendarView.styles";

type TimelineEntry = {
  time: string;
  count: number;
};

const CalendarView = () => {
  const today = new Date();
  const [activeMonth, setActiveMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: records = [] } = useMonthlyRecords(
    activeMonth.year,
    activeMonth.month
  );

  const user = auth.currentUser;
  const { data: timeline = [] } = useDailyTimeline(
    user?.uid ?? "",
    selectedDate
  );

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;
    const key = formatDate(date);
    const record = records.find((r) => formatDate(r.createdAt) === key);
    return record ? <S.TileTotal>{record.total}회</S.TileTotal> : null;
  };

  return (
    <S.Container>
      <S.StyledCalendar
        calendarType="gregory"
        showNeighboringMonth={false}
        tileContent={renderTileContent}
        locale="ko-KR"
        onClickDay={(date) => {
          setSelectedDate(date);
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (!activeStartDate) return;
          setActiveMonth({
            year: activeStartDate.getFullYear(),
            month: activeStartDate.getMonth() + 1,
          });
        }}
        tileClassName={({ date, view }) => {
          if (view !== "month") return undefined;
          const key = formatDate(date);
          const hasData = records.some((r) => formatDate(r.createdAt) === key);
          return hasData ? "has-data" : undefined;
        }}
      />

      {selectedDate && (
        <S.TimelineContainer>
          <S.TimelineTitle>{formatDate(selectedDate)} 기록</S.TimelineTitle>
          {timeline.length === 0 ? (
            <p>기록 없음</p>
          ) : (
            <ul>
              {timeline.map((entry: TimelineEntry, i: number) => (
                <li key={i}>
                  {entry.time} - {entry.count}회
                </li>
              ))}
            </ul>
          )}
        </S.TimelineContainer>
      )}
    </S.Container>
  );
};

export default CalendarView;
