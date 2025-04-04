import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RecordsPage from "./pages/RecordPage";
import MyRecordsPage from "./pages/MyRecordsPage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import GlobalStyle from "./styles/GlobalStyles";
import theme from "./styles/theme";
import * as S from "./styles/GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth/:type"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/record"
              element={
                <PrivateRoute>
                  <RecordsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-records"
              element={
                <PrivateRoute>
                  <MyRecordsPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
        <S.StyledContainer position="top-right" closeOnClick={true} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
