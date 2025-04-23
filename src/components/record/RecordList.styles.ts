import styled from "styled-components";

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    background-color: #f8f9fa;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e9ecef;
    }

    &:disabled {
      background-color: #dee2e6;
      cursor: not-allowed;
    }
  }
`;

export const RecordList = styled.ul`
  height: calc(100vh - 260px);
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:nth-child(odd) {
      background-color: #f8f9fa;
    }

    input[type="number"] {
      width: 60px;
      padding: 5px;
      margin-right: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    button {
      padding: 5px 10px;
      font-size: 14px;
      margin-left: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;

      &.edit-btn {
        background-color: #007bff;
        color: white;

        &:hover {
          background-color: #0056b3;
        }
      }

      &.delete-btn {
        background-color: #dc3545;
        color: white;

        &:hover {
          background-color: #c82333;
        }
      }

      &.save-btn {
        background-color: #28a745;
        color: white;

        &:hover {
          background-color: #218838;
        }
      }

      &.cancel-btn {
        background-color: #6c757d;
        color: white;

        &:hover {
          background-color: #5a6268;
        }
      }
    }
  }
`;
