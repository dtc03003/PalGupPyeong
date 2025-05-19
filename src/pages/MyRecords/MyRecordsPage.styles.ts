import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dee2e6;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 0;
  background-color: ${({ $active }) => ($active ? "#228be6" : "#f8f9fa")};
  color: ${({ $active }) => ($active ? "#fff" : "#495057")};
  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#1c7ed6" : "#e9ecef")};
  }
`;
