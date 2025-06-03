import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 45%;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px 16px 0 0;
  background-color: ${({ theme }) => theme.bg3};
`;

export const Image = styled.img`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.text};
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  word-break: keep-all;
  overflow-wrap: break-word;
  padding: 0 20px;
  width: 100%;
`;

export const Description = styled.p`
  width: 100%;
  padding: 0 20px;
  margin: 8px 0 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  word-break: keep-all;
  overflow-wrap: break-word;
`;
