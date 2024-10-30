import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 10px;
    line-height: 1.5;
    background-color: #f4f4f4;
    color: #333;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
