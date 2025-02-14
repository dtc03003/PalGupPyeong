import styled from "styled-components";
import hamburger from "../assets/icon_hamburger.svg?react"

export const NavBar = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background-color: red;
`;

export const Logo = styled.div`
  cursor: pointer;
`;

export const MenuIcon = styled(hamburger)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
