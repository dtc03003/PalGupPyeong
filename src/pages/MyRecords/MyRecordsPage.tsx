import { useState } from "react";
import {
  useRecords,
  useDeleteRecord,
  useUpdateRecord,
} from "@hooks/useRecords";
import { useTotalPages } from "@hooks/useTotalPages";
import RecordChart from "@components/record/RecordChart";
import RecordList from "@components/record/RecordList";
import { ViewType } from "@components/record/type";

const RecordListPage = () => {
  const [page, setPage] = useState(1);
  const [viewType, setViewType] = useState<ViewType>("daily");
  const pageSize = 10;

  const { data: records, isLoading } = useRecords(viewType, page, pageSize);
  const { totalPages, isLoading: isTotalPagesLoading } = useTotalPages(
    viewType,
    pageSize
  );

  const deleteRecord = useDeleteRecord();
  const updateRecord = useUpdateRecord();

  if (isLoading || isTotalPagesLoading) return <p>Loading...</p>;

  return (
    <>
      <select
        value={viewType}
        onChange={(e) => {
          setPage(1);
          setViewType(e.target.value as ViewType);
        }}
      >
        <option value="records">기록들</option>
        <option value="daily">일일</option>
        <option value="weekly">주간</option>
        <option value="monthly">월간</option>
      </select>

      <RecordChart records={records ?? []} />
      <RecordList
        viewType={viewType}
        records={records ?? []}
        page={page}
        setPage={setPage}
        totalPages={totalPages ?? 0}
        deleteRecord={viewType === "records" ? deleteRecord : undefined}
        updateRecord={viewType === "records" ? updateRecord : undefined}
      />
    </>
  );
};

export default RecordListPage;
