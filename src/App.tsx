import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
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
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
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
