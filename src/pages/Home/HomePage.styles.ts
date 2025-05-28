import styled from "styled-components";
import IconPower from "@assets/icons/icon_power.svg?react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 16px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Power = styled(IconPower)`
  width: 25px;
  height: 25px;
  filter: ${({ theme }) => (theme.mode === "dark" ? "invert(1)" : "none")};
`;

export const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;
