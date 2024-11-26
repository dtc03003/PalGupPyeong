import { useRecords, useDeleteRecord } from "../hooks/useRecords";

const RecordList = () => {
  const { data: records, isLoading } = useRecords();
  const deleteRecord = useDeleteRecord();

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteRecord.mutate(id);
    }
  };

  return (
    <ul>
      {records?.map((record) => (
        <li key={record.id}>
          {record.date.toDateString()} - {record.count} 회
          <button onClick={() => handleDelete(record.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
