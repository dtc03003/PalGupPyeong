import { ToastContainer } from "react-toastify";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    height: 100vh;
    font-size: 10px;
    line-height: 1.5;
    background-color: #f4f4f4;
    color: #333;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  ul {
    list-style: none; 
    margin: 0;        
    padding: 0;       
  }

  li {
    margin: 0;
    padding: 0;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const StyledContainer = styled(ToastContainer)`
  width: 50%;
  top: 50px !important;
  right: 0 !important;
  left: auto !important;
  transform: none !important;
  gap: 10px;
`;

export default GlobalStyle;
