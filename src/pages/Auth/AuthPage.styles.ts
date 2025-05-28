import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg0};
  padding: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
`;

export const PageIndicator = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  height: 45px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
`;

export const VisibilityBtn = styled.button`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  overflow: hidden;
`;

export const ErrorText = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 10px 0 10px 0;
  color: red;
  font-size: 12px;
  text-align: right;
  height: 16px;
  visibility: ${({ children }) => (children ? "visible" : "hidden")};
`;

export const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 14px;
  margin-bottom: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: default;
  }
`;

export const ToggleText = styled.p`
  cursor: pointer;
  color: #007bff;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
`;
