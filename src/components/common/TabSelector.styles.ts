import styled from "styled-components";

export const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 5px 10px;
  background-color: ${({ $active }) => ($active ? "#ddd" : "#f9f9f9")};
  border: 1px solid #ccc;
  border-radius: 3.75px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;
