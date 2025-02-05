import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import theme from "./styles/theme";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecordsPage from "./pages/RecordPage";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/record" element={<RecordsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
