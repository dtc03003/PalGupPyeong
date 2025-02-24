export const formatDate = (timestamp: { seconds: number } | Date) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};
