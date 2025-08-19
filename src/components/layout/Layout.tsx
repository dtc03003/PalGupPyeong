import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 100dvh;
  aspect-ratio: 9 / 16;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.bg0};
  overflow: hidden;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
