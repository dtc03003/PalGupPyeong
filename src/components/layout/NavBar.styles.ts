import styled from "styled-components";
import HamburgerIcon from "@assets/icons/icon_menu.svg?react";

export const NavBar = styled.div`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background-color: ${({ theme }) => theme.navBg};
`;

export const Logo = styled.div`
  cursor: pointer;
`;

export const MenuIcon = styled(HamburgerIcon)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
