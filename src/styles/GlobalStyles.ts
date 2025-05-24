import { createGlobalStyle } from "styled-components";

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
    background-color: ${({ theme }) => theme.outside};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.2s ease, color 0.2s ease;
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

  .Toastify__toast {
    width: 100%;
  }

  .custom-toast-container {
    width: 60%;
    position: absolute;
    top: 50px !important;
    right: 0 !important;
    left: auto !important;
    transform: none !important;
    gap: 10px;
  }

  .Toastify__toast-theme--dark {
    background-color: ${({ theme }) => theme.bg1};
  }
`;

export default GlobalStyle;
