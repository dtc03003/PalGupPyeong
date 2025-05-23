import { useThemeStore } from "@store/themeStore";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  );
};

export default ThemeToggleButton;
