export function parseWeekIdToDate(weekId: string): Date | null {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStr, 10);

  if (isNaN(year) || isNaN(week)) return null;

  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay();

  const mondayOffset = (dayOfWeek + 6) % 7;

  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - mondayOffset + (week - 1) * 7);

  return monday;
}
