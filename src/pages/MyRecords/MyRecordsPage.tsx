import {
  useRecords,
  useDeleteRecord,
  useUpdateRecord,
} from "@hooks/useRecords";
import { useState } from "react";
import RecordChart from "@components/record/RecordChart";
import RecordList from "@components/record/RecordList";

const RecordListPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: records, isLoading, totalPages } = useRecords(page, pageSize);
  const deleteRecord = useDeleteRecord();
  const updateRecord = useUpdateRecord();

  if (isLoading || totalPages == null) return <p>Loading...</p>;

  return (
    <>
      <RecordChart records={records ?? []} />
      <RecordList
        records={records ?? []}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        deleteRecord={deleteRecord}
        updateRecord={updateRecord}
      />
    </>
  );
};

export default RecordListPage;
