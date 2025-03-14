import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

export const Input = styled.input`
  width: 80px;
  padding: 8px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const AddButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
