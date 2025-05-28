import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 0;
  background-color: ${({ theme, $active }) =>
    $active ? theme.itemBgActive : theme.listItemOdd};
  color: ${({ theme, $active }) =>
    $active ? theme.itemTextActive : theme.text};

  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.itemBgActiveHover : theme.itemBgHover};
  }
`;
