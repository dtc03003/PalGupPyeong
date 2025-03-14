export const formatDate = (timestamp: { seconds: number } | Date) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const getDayKey = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getWeekKey = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const week = Math.floor(
    (d.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return `${year}-W${week}`;
};

export const getMonthKey = (date: Date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};
