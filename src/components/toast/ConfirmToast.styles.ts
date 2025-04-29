import styled from "styled-components";

export const ToastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const SaveButton = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
