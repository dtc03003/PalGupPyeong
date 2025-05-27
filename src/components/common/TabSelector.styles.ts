import styled from "styled-components";

export const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.bg1};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 5px 10px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.bg3 : theme.bg1};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 3.75px;
  color: ${({ theme }) => theme.text};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.bg2};
  }
`;
