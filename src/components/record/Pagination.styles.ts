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
