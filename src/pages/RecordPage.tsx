import RotaryDialRecordForm from "../components/RotaryDialRecordForm";
import RecordList from "../components/RecordList";

const RecordsPage = () => {
  return (
    <div>
      <h1>팔굽혀펴기 기록</h1>
      <RotaryDialRecordForm />
      <RecordList />
    </div>
  );
};

export default RecordsPage;
