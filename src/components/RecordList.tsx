import { useState } from "react";
import { useRecords, useDeleteRecord, useUpdateRecord } from "../hooks/useRecords";

const RecordList = () => {
  const { data: records, isLoading } = useRecords();
  const deleteRecord = useDeleteRecord();
  const updateRecord = useUpdateRecord();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCount, setNewCount] = useState<number>(0);

  if (isLoading) return <p>Loading...</p>;

  // 삭제 핸들러
  const handleDelete = (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteRecord.mutate(id);
    }
  };

  // 수정 시작 핸들러
  const handleEdit = (record: { id: string; count: number }) => {
    setEditingId(record.id);
    setNewCount(record.count);
  };

  // 수정 저장 핸들러
  const handleUpdate = async (recordId: string) => {
    try {
      await updateRecord.mutateAsync({ recordId, updatedData: { count: newCount } });
      setEditingId(null);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  // 수정 취소 핸들러
  const handleCancel = () => {
    setEditingId(null);
    setNewCount(0);
  };

  return (
    <ul>
      {records?.map((record) => (
        <li key={record.id}>
          {editingId === record.id ? (
            <>
              <input
                type="number"
                value={newCount}
                onChange={(e) => setNewCount(Number(e.target.value))}
              />
              <button onClick={() => handleUpdate(record.id)}>저장</button>
              <button onClick={handleCancel}>취소</button>
            </>
          ) : (
            <>
              {record.date.toDateString()} - {record.count} 회
              <button onClick={() => handleEdit(record)}>수정</button>
              <button onClick={() => handleDelete(record.id)}>삭제</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
