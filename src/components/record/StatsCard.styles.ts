import styled from "styled-components";

export const StatsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

export const StatsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const StatsText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: normal;
  color: #555;
`;
