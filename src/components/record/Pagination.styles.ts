import styled from "styled-components";

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  flex-wrap: wrap;

  button,
  span {
    padding: 6px 12px;
    font-size: 15px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    min-width: 36px;
    text-align: center;
    background-color: #f1f3f5;
    transition: background-color 0.2s, color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: #e0e0e0;
  }

  button:disabled {
    cursor: default;
    opacity: 0.5;
  }

  .active {
    background-color: #339af0;
    color: white;
    font-weight: bold;
  }

  span {
    cursor: default;
    color: #868e96;
  }
`;
