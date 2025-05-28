import { useThemeStore } from "@store/themeStore";
import DarkModeIcon from "@assets/icons/icon_dark.svg?react";
import LightModeIcon from "@assets/icons/icon_light.svg?react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? (
        <DarkModeIcon style={{ width: "25px", height: "25px" }} />
      ) : (
        <LightModeIcon style={{ width: "25px", height: "25px" }} />
      )}
    </button>
  );
};

export default ThemeToggleButton;
