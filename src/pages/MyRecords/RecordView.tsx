import { useState } from "react";
import {
  useDeleteRecord,
  useRecords,
  useUpdateRecord,
} from "@hooks/useRecords";
import { useTotalPages } from "@hooks/useTotalPages";
import TabSelector, { TabOption } from "@components/common/TabSelector";
import RecordChart from "@components/record/RecordChart";
import RecordList from "@components/record/RecordList";
import { ViewType } from "@components/record/type";

const RecordView = () => {
  const [page, setPage] = useState(1);
  const [viewType, setViewType] = useState<ViewType>("daily");
  const pageSize = 10;

  const viewTypes: TabOption[] = [
    { label: "일일", value: "daily" },
    { label: "주간", value: "weekly" },
    { label: "월간", value: "monthly" },
    { label: "기록들", value: "records" },
  ];

  const { data: records, isLoading: isRecordsLoading } = useRecords(
    viewType,
    page,
    pageSize
  );
  const { totalPages, isLoading: isTotalPagesLoading } = useTotalPages(
    viewType,
    pageSize
  );
  const isLoading = isRecordsLoading || isTotalPagesLoading;

  const deleteRecord = useDeleteRecord();
  const updateRecord = useUpdateRecord();

  return (
    <>
      <RecordChart records={records ?? []} isLoading={isLoading} />

      <TabSelector
        options={viewTypes}
        activeValue={viewType}
        onChange={(value: ViewType) => {
          setPage(1);
          setViewType(value);
        }}
      />

      <RecordList
        viewType={viewType}
        records={records}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPages={totalPages ?? 0}
        deleteRecord={viewType === "records" ? deleteRecord : undefined}
        updateRecord={viewType === "records" ? updateRecord : undefined}
      />
    </>
  );
};

export default RecordView;
