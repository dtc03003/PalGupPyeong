export const formatDate = (timestamp: { seconds: number } | Date) => {
  const date =
    timestamp instanceof Date ? timestamp : new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const getDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`; // "2025-05-15"
};

export function getWeekKey(date: Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);

  const dayOfWeek = firstDayOfYear.getDay();
  const mondayOffset = dayOfWeek <= 4 ? 1 - dayOfWeek : 8 - dayOfWeek;
  const firstMonday = new Date(
    firstDayOfYear.setDate(firstDayOfYear.getDate() + mondayOffset)
  );

  const diffTime = d.getTime() - firstMonday.getTime();
  const weekNumber = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000)) + 1;

  return `${year}-W${weekNumber}`;
}

export const getMonthKey = (date: Date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export function formatWeekDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const adjustedDate = day + offset;
  const weekOrder = Math.ceil(adjustedDate / 7);

  const weekText = ["첫째", "둘째", "셋째", "넷째", "다섯째"][
    Math.min(weekOrder - 1, 4)
  ];

  return `${month}월 ${weekText} 주`;
}
