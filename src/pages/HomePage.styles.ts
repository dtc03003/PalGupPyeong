import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Message = styled.p`
  font-size: 16px;
  color: #666;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: red;
`;

export const GoalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ToastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const GoalInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
