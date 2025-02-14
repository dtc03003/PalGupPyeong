import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GNB from "./components/GNB";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecordsPage from "./pages/RecordPage";
import GlobalStyle from "./styles/GlobalStyles";
import theme from "./styles/theme";
import * as S from "./styles/GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Router>
          <GNB />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/record" element={<RecordsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <S.StyledContainer position="top-right" closeOnClick={true} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
