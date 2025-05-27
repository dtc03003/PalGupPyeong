import styled from "styled-components";

export const ListItem = styled.li`
  padding: 10px 16px;
  border-bottom: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  background-color: ${(props) => props.theme.listItemEven};

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.listItemOdd};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .count {
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.text};
  }

  .date {
    font-size: 14px;
    color: ${(props) => props.theme.subText};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;

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
`;

export const EditInput = styled.input`
  width: 80px;
  padding: 6px;
  font-size: 14px;
  margin-right: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
