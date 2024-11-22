import { useRecords } from "../hooks/useRecords";

const RecordList = () => {
  const { data: records, isLoading } = useRecords();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {records?.map((record) => (
        <li key={record.id}>
          {record.date.toDateString()} - {record.count} 회
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
