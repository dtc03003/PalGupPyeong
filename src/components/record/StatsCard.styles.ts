import styled from "styled-components";

export const StatsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.bg1};
  user-select: none;
`;

export const StatsTitle = styled.h3`
  padding: 8px 0;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;
