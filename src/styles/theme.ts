export const lightTheme = {
  mode: "light",

  // 배경 계층
  outside: "#F4F4F4",
  bg0: "#FFFFFF",
  bg1: "#F5F5F5",
  bg2: "#EAEAEA",
  bg3: "#DDDDDD",
  navBg: "#ff4b4b",

  // 텍스트
  text: "#333",
  subText: "#555555",
  strongText: "#000",
  grayText0: "##555",
  grayText1: "#666",

  // 포인트
  primary: "#007bff",
  primaryText: "#FFFFFF",
  primaryHover: "#0056b3",

  // 기타
  border: "#DADADA",
  disabled: "#ccc",
};

export const darkTheme = {
  mode: "dark",

  // 배경 계층
  outside: "#000",
  bg0: "#121212",
  bg1: "#1E1E1E",
  bg2: "#2A2A2A",
  bg3: "#333333",
  navBg: "	#e64545",

  // 텍스트
  text: "#FFFFFF",
  subText: "#AAAAAA",
  strongText: "#fff",
  grayText0: "#AAA",
  grayText1: "#888",

  // 포인트
  primary: "#339aff",
  primaryText: "#FFFFFF",
  primaryHover: "#0056b3",

  // 기타
  border: "#333333",
  disabled: "#555555",
};

// 타입 추출
export type AppTheme = typeof lightTheme;
