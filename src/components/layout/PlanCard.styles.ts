import styled from "styled-components";

interface ImageProps {
  imgPosition: "left" | "right";
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Point = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.subText};
  margin: 60px 0;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export const Image = styled.img<ImageProps>`
  width: 80%;
  border-radius: 16px;
  object-fit: contain;
  margin-top: auto;
  ${({ imgPosition }) =>
    imgPosition === "right" ? "margin-left: auto;" : "margin-right: auto;"}
`;
