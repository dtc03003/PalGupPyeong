import { toast } from "react-toastify";
import { UseMutationResult } from "@tanstack/react-query";
import { formatDate, formatWeekDate } from "@utils/dateUtils";
import ConfirmToast from "@components/toast/ConfirmToast";
import { UpdateRecordData, ViewType } from "./type";
import * as S from "./RecordItem.styles";

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
    <S.ListItem>
      {editingId === record.id ? (
        <>
          <S.EditInput
            type="number"
            value={newCount}
            onChange={(e) => setNewCount(Number(e.target.value))}
          />
          <S.Actions>
            <button className="save-btn" onClick={handleUpdate}>
              저장
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              취소
            </button>
          </S.Actions>
        </>
      ) : (
        <>
          <S.Info>
            <span className="count">{record.count} 회</span>
            <span className="date">
              {viewType === "weekly"
                ? formatWeekDate(record.createdAt)
                : formatDate(record.createdAt)}
            </span>
          </S.Info>
          <S.Actions>
            {updateRecord && (
              <button className="edit-btn" onClick={handleEdit}>
                수정
              </button>
            )}
            {deleteRecord && (
              <button
                className="delete-btn"
                onClick={() => handleDelete(record.id)}
              >
                삭제
              </button>
            )}
          </S.Actions>
        </>
      )}
    </S.ListItem>
  );
};

export default RecordItem;
