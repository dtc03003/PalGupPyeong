import { addWeeks, format, getDate, getMonth, startOfISOWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { getISOWeek } from "date-fns";

// 일간 ID (예: "2025-05-15")
export const getDayId = (date: Date) => format(date, "yyyy-MM-dd");

// 주간 ID (예: "2025-W20")
export const getWeekId = (date: Date) => {
  const year = date.getFullYear();
  const week = getISOWeek(date);
  return `${year}-W${week.toString().padStart(2, "0")}`;
};

// 월간 ID (예: "2025-05")
export const getMonthId = (date: Date) => format(date, "yyyy-MM");

// 사용자용 날짜 포맷 (예: "05.15")
export const formatDateDisplay = (date: Date | { seconds: number }): string => {
  const d = date instanceof Date ? date : new Date(date.seconds * 1000);
  return format(d, "MM.dd", { locale: ko });
};

// 주차 ID 문자열 (예: "2025-W20") → Date (그 주의 월요일)
export const parseWeekIdToDate = (weekId: string): Date | null => {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStr, 10);
  if (isNaN(year) || isNaN(week)) return null;

  const jan4 = new Date(year, 0, 4);
  const firstWeekMonday = startOfISOWeek(jan4);
  return addWeeks(firstWeekMonday, week - 1);
};

// 몇째 주 포맷 (예: "5월 둘째 주")
export const formatWeekDisplay = (date: Date): string => {
  const month = getMonth(date) + 1;
  const day = getDate(date);

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const offset = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  const adjusted = day + offset;
  const weekOrder = Math.ceil(adjusted / 7);
  const weekText = ["첫째", "둘째", "셋째", "넷째", "다섯째"][
    Math.min(weekOrder - 1, 4)
  ];

  return `${month}월 ${weekText} 주`;
};

// 날짜 -> 몇시: 몇분
export const formatTime = (date: Date): string => {
  return format(date, "HH:mm");
};
