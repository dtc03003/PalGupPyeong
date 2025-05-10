import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 390px;
  height: calc(100vh - 50px);
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
