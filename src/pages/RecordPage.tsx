import AddRecordForm from "../components/AddRecordForm";
import RecordList from "../components/RecordList";

const RecordsPage = () => {
  return (
    <div>
      <h1>팔굽혀펴기 기록</h1>
      <AddRecordForm />
      <RecordList />
    </div>
  );
};

export default RecordsPage;
