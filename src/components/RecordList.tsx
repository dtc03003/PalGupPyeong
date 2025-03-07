import { useState } from "react";
import { useRecords, useDeleteRecord, useUpdateRecord } from "../hooks/useRecords";
import { formatDate } from "../utils/dateUtils";
import { toast } from "react-toastify";
import { LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from "recharts";

import * as S from "./RecordList.styles";

const RecordList = () => {
  const deleteRecord = useDeleteRecord();
  const updateRecord = useUpdateRecord();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCount, setNewCount] = useState<number>(0);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: records, isLoading } = useRecords(page, pageSize);
  const isLastPage = !records || records.length < pageSize;

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = (id: string) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>정말 삭제하시겠습니까?</p>
          <button onClick={() => confirmDelete(id, closeToast)}>예</button>
          <button onClick={closeToast}>아니오</button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const confirmDelete = async (id: string, closeToast: () => void) => {
    closeToast();

    toast.promise(deleteRecord.mutateAsync(id), {
      pending: "삭제 중...",
      success: "기록이 삭제되었습니다.",
      error: "삭제에 실패했습니다.",
    });
  };

  const handleEdit = (record: { id: string; count: number }) => {
    setEditingId(record.id);
    setNewCount(record.count);
  };

  const handleUpdate = async (recordId: string) => {
    try {
      await updateRecord.mutateAsync({ recordId, updatedData: { count: newCount } });
      setEditingId(null);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewCount(0);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={records} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="createdAt" tickFormatter={formatDate} />
          <YAxis width={30} />
          <Tooltip
            labelFormatter={(label) => formatDate(label)}
            formatter={(value) => [value, "갯수"]}
          />
          <Line type="monotone" dataKey="count" stroke="#ff4b4b" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>

      <S.RecordList>
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
                {record.count} 회 - {formatDate(record.createdAt)}
                <button onClick={() => handleEdit(record)}>수정</button>
                <button onClick={() => handleDelete(record.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
        <S.Pagination>
          {page > 1 && <button onClick={() => setPage(page - 1)}>{page - 1}</button>}

          <button disabled>{page}</button>

          {!isLastPage && <button onClick={() => setPage(page + 1)}>{page + 1}</button>}
        </S.Pagination>
      </S.RecordList>
    </div>
  );
};

export default RecordList;
