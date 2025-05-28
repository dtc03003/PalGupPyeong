import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import ThemeToggleButton from "@components/common/ThemeToggleButton";
import * as S from "./NavBar.styles";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const sideMenuRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target as Node) &&
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.NavBar ref={parentRef}>
      <S.MenuIcon onClick={toggleMenu} />
      <S.Logo onClick={handleLogoClick}>팔굽평</S.Logo>
      <ThemeToggleButton />
      <SideMenu
        ref={sideMenuRef}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </S.NavBar>
  );
};

export default NavBar;
