import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeProvider } from "styled-components";

import NavBar from "./components/layout/NavBar";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Auth/AuthPage";
import RecordsPage from "./pages/Record/RecordPage";
import MyRecordsPage from "./pages/MyRecords/MyRecordsPage";
import ErrorPage from "./pages/Error/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import GlobalStyle from "./styles/GlobalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import { useThemeStore } from "store/themeStore";
import * as S from "./styles/GlobalStyles";

function App() {
  const location = useLocation();
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    toast.dismiss();
  }, [location]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout>
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
        <S.StyledContainer position="top-right" closeOnClick={true} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
