import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import RecordItem from "./RecordItem";
import Pagination from "./Pagination";
import SkeletonRecordItem from "./SkeletonRecordItem";
import { Record, UpdateRecordData, ViewType } from "./type";
import * as S from "./RecordList.styles";

interface RecordListProps {
  viewType: ViewType;
  records?: Record[];
  isAllLoading?: boolean;
  deleteRecord?: UseMutationResult<void, Error, string>;
  updateRecord?: UseMutationResult<void, Error, UpdateRecordData>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const RecordList = ({
  viewType,
  records = [],
  deleteRecord,
  updateRecord,
  page,
  setPage,
  totalPages,
  isLoading,
}: RecordListProps & { isLoading: boolean }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCount, setNewCount] = useState<number>(0);

  return (
    <>
      <S.RecordListWrapper>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRecordItem key={i} />
            ))
          : records.map((record) => (
              <RecordItem
                key={record.id}
                viewType={viewType}
                record={record}
                deleteRecord={deleteRecord}
                updateRecord={updateRecord}
                editingId={editingId}
                setEditingId={setEditingId}
                setNewCount={setNewCount}
                newCount={newCount}
              />
            ))}
      </S.RecordListWrapper>
      {!isLoading && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
};

export default RecordList;
