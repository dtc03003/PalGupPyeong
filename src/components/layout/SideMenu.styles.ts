import styled from "styled-components";

export const MenuWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 50px;
  left: 0;
  width: 250px;
  height: calc(100vh - 50px);
  background-color: ${(props) => props.theme.sideMenuBg};
  color: ${(props) => props.theme.text};
  transform: ${(props: { $isOpen: boolean }) =>
    props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MenuItem = styled.div`
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.sideMenuHover};
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
`;

export const ProfileSection = styled.div`
  padding: 15px;
  border-top: 1px solid ${(props) => props.theme.sideMenuBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileName = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;
