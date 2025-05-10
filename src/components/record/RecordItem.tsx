import { toast } from "react-toastify";
import { UseMutationResult } from "@tanstack/react-query";
import { formatDate, formatWeekDate } from "@utils/dateUtils";
import ConfirmToast from "@components/toast/ConfirmToast";
import { UpdateRecordData, ViewType } from "./type";

interface RecordItemProps {
  viewType: ViewType;
  record: { id: string; count: number; createdAt: Date };
  deleteRecord?: UseMutationResult<void, Error, string>;
  updateRecord?: UseMutationResult<void, Error, UpdateRecordData>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  editingId: string | null;
  setNewCount: React.Dispatch<React.SetStateAction<number>>;
  newCount: number;
}

const RecordItem = ({
  viewType,
  record,
  deleteRecord,
  updateRecord,
  setEditingId,
  editingId,
  setNewCount,
  newCount,
}: RecordItemProps) => {
  const handleDelete = (id: string) => {
    toast(
      ({ closeToast }) => (
        <ConfirmToast
          message="정말 삭제하시겠습니까?"
          onConfirm={() => confirmDelete(id, closeToast)}
          closeToast={closeToast}
          confirmText="예"
          cancelText="아니오"
        />
      ),
      { autoClose: false }
    );
  };

  const confirmDelete = async (id: string, closeToast: () => void) => {
    closeToast();
    if (!deleteRecord) return;

    toast.promise(deleteRecord.mutateAsync(id), {
      pending: "삭제 중...",
      success: "기록이 삭제되었습니다.",
      error: "삭제에 실패했습니다.",
    });
  };

  const handleEdit = () => {
    if (!updateRecord) return;
    setEditingId(record.id);
    setNewCount(record.count);
  };

  const handleUpdate = async () => {
    if (!updateRecord) return;

    try {
      await updateRecord.mutateAsync({
        recordId: record.id,
        updatedData: { count: newCount },
      });
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
    <li>
      {editingId === record.id ? (
        <>
          <input
            type="number"
            value={newCount}
            onChange={(e) => setNewCount(Number(e.target.value))}
          />
          {updateRecord && <button onClick={handleUpdate}>저장</button>}
          <button onClick={handleCancel}>취소</button>
        </>
      ) : (
        <>
          {record.count} 회 -{" "}
          {viewType === "weekly"
            ? formatWeekDate(record.createdAt)
            : formatDate(record.createdAt)}
          {updateRecord && <button onClick={handleEdit}>수정</button>}
          {deleteRecord && (
            <button onClick={() => handleDelete(record.id)}>삭제</button>
          )}
        </>
      )}
    </li>
  );
};

export default RecordItem;
