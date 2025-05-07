import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import RecordItem from "./RecordItem";
import Pagination from "./Pagination";

import * as S from "./RecordList.styles";

interface Record {
  id: string;
  count: number;
  createdAt: Date;
}

interface UpdateRecordData {
  recordId: string;
  updatedData: {
    count?: number;
    date?: Date;
  };
}

interface RecordListProps {
  viewType: "records" | "daily" | "weekly" | "monthly";
  records: Record[];
  deleteRecord?: UseMutationResult<void, Error, string>;
  updateRecord?: UseMutationResult<void, Error, UpdateRecordData>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const RecordList = ({
  viewType,
  records,
  deleteRecord,
  updateRecord,
  page,
  setPage,
  totalPages,
}: RecordListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCount, setNewCount] = useState<number>(0);

  return (
    <div>
      <S.RecordList>
        {records?.map((record) => (
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
      </S.RecordList>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default RecordList;
