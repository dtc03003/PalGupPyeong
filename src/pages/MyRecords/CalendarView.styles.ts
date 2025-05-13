import styled from "styled-components";
import Calendar from "react-calendar";

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
`;

export const StyledCalendar = styled(Calendar)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  .react-calendar__tile {
    padding: 10px 6.6667px;
    background: none;
    border-radius: 8px;
    transition: background-color 0.2s;

    &:hover {
      background: #f0f0f0;
    }
  }

  .react-calendar__tile--active {
    background: #d0ebff;
    color: #000;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: red;
    color: #000;
  }

  .react-calendar__tile--now {
    background: #e7f5ff;
    font-weight: bold;
  }
`;

export const TileTotal = styled.div`
  margin-top: 4px;
  font-size: 0.75rem;
  color: red;
  font-weight: 500;
`;
