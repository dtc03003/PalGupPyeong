export const lightTheme = {
  mode: "light",

  // 배경 계층
  outside: "#F4F4F4",
  bg0: "#FFFFFF",
  bg1: "#F5F5F5",
  bg2: "#EAEAEA",
  bg3: "#DDDDDD",
  navBg: "#ff4b4b",
  sideMenuBg: "#dee2e6",
  sideMenuHover: "#ced4da",
  sideMenuBorder: "#adb5bd",

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

  // 리스트
  listItemEven: "#FFF",
  listItemOdd: "#f8f9fa",
  itemBgActive: "#228be6",
  itemTextActive: "#ffffff",
  itemBgHover: "#e9ecef",
  itemBgActiveHover: "#1c7ed6",

  // 캘린더
  calendarnow: "#e3f2fd",

  // 스켈레톤
  skeletonBase: "#e0e0e0",
  skeletonHighlight: "#f0f0f0",

  // 기타
  border: "#DADADA",
  hover: "#1c7ed6",
  disabled: "#ccc",
  scrollbarThumb: "#ccc",
  scrollbarThumbHover: "#bbb",
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
  sideMenuBg: "#1e1e1e",
  sideMenuHover: "#2a2a2a",
  sideMenuBorder: "#3a3a3a",

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

  // 리스트
  listItemEven: "#2b2b2b",
  listItemOdd: "#343a40",
  itemBgActive: "#1c7ed6",
  itemTextActive: "#ffffff",
  itemBgHover: "#3a3a3a",
  itemBgActiveHover: "#1864ab",

  // 캘린더
  calendarnow: "#2a3b4c ",

  // 스켈레톤
  skeletonBase: "#2b2b2b",
  skeletonHighlight: "#444444",

  // 기타
  border: "#333333",
  hover: "#1864ab",
  disabled: "#555555",
  scrollbarThumb: "#444",
  scrollbarThumbHover: "#555",
};

// 타입 추출
export type AppTheme = typeof lightTheme;
