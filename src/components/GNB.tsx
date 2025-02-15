import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import * as S from "./GNB.styles";

const GNB = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const sideMenuRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    setMenuOpen(false)
    navigate('/');
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node) &&
        parentRef.current && !parentRef.current.contains(event.target as Node)
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
      <S.Logo onClick={handleLogoClick}>
        <h1>팔굽평</h1>
      </S.Logo>
      <S.MenuIcon onClick={toggleMenu} />
      <SideMenu ref={sideMenuRef} isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
    </S.NavBar>
  );
};

export default GNB;
