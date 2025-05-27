import styled from "styled-components";
import Calendar from "react-calendar";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  background: ${(props) => props.theme.bg1};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

export const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  background: transparent;

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    button {
      background: none;
      border: none;
      color: ${(props) => props.theme.text};
      font-size: 17.6px;
      font-weight: 600;
      cursor: pointer;
      padding: 8px;
      transition: color 0.2s ease;

      &:hover {
        color: ${(props) => props.theme.hover};
        background: ${(props) => props.theme.bg3};
      }
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 500;
    font-size: 14.4px;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .react-calendar__tile {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 6px;
    border-radius: 10px;
    transition: background-color 0.2s;
    position: relative;
    color: ${(props) => props.theme.text};

    abbr {
      font-size: 15.2px;
      margin-bottom: auto;
    }

    &:hover {
      background: #74c0fc;
    }
  }

  .react-calendar__tile--now {
    background: ${(props) => props.theme.calendarnow};
    font-weight: bold;
    color: #1c7ed6;
  }

  .react-calendar__tile--active {
    background: linear-gradient(135deg, #339af0, #74c0fc);
    color: white;

    abbr {
      color: white;
    }

    div {
      color: #fff;
    }
  }

  .react-calendar__tile--active .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: linear-gradient(135deg, #228be6, #4dabf7);
    color: #fff;

    abbr {
      color: #fff;
    }

    div {
      color: #fff;
    }
  }

  .react-calendar__tile.has-data {
    border: 1px solid #4dabf7;
    border-radius: 8px;
    box-sizing: border-box;
  }
`;

export const TileTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 0.7rem;
  color: #339af0;
  font-weight: 600;
`;

export const TimelineContainer = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: ${(props) => props.theme.bg2};
  border-radius: 8px;
`;

export const TimelineTitle = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`;
