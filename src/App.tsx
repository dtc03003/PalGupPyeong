import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "store/themeStore";

import NavBar from "@components/layout/NavBar";
import Layout from "@components/layout/Layout";
import PrivateRoute from "@components/PrivateRoute";
import PublicRoute from "@components/PublicRoute";

import IntroPage from "@pages/Intro/IntroPage";
import HomePage from "@pages/Home/HomePage";
import AuthPage from "@pages/Auth/AuthPage";
import RecordsPage from "@pages/Record/RecordPage";
import MyRecordsPage from "@pages/MyRecords/MyRecordsPage";
import ErrorPage from "@pages/Error/ErrorPage";

import GlobalStyle from "@styles/GlobalStyles";
import { darkTheme, lightTheme } from "@styles/theme";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    toast.dismiss();
  }, [location, theme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        toast.dismiss();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <IntroPage />
              </PublicRoute>
            }
          />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
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
        <div ref={containerRef}>
          <ToastContainer
            className="custom-toast-container"
            position="top-right"
            theme={theme === "dark" ? "dark" : "light"}
          />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
