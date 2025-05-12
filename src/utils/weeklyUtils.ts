export function parseWeekIdToDate(weekId: string): Date | null {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStr, 10);

  if (isNaN(year) || isNaN(week) || week < 1 || week > 52) return null;

  const jan1 = new Date(year, 0, 1);
  const dayOfWeek = jan1.getDay();
  const mondayOffset = dayOfWeek <= 4 ? 1 - dayOfWeek : 8 - dayOfWeek;
  const firstMonday = new Date(year, 0, 1 + mondayOffset);

  const resultDate = new Date(firstMonday);
  resultDate.setDate(firstMonday.getDate() + (week - 1) * 7);

  return resultDate;
}
