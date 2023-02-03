import styled from "styled-components";
import { useRef, useEffect } from "react";
import iconBTNBurgerOpen from "../../assets/icon/button/btn_burger_open.png";
import iconBTNBurgerOpenH from "../../assets/icon/button/btn_burger_open_h.png";
import iconBTNBurgerOpenP from "../../assets/icon/button/btn_burger_open_p.png";
import iconBTNBurgerClose from "../../assets/icon/button/btn_burger_close.png";
import iconBTNBurgerCloseH from "../../assets/icon/button/btn_burger_close_h.png";
import iconBTNBurgerCloseP from "../../assets/icon/button/btn_burger_close_p.png";

const MenuSwitchBTN = styled.button`
  background: transparent;
  position: absolute;
  cursor: pointer;
  left: 150px;
  top: 5px;
  height:max-content;

  @media screen and (min-width: 900px) {
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const MenuSwitchImage = styled.img`
  width: 40px;
  height: auto;
  @media screen and (min-width: 900px) {
    width: 60px;
  }
`;

const MenuSwitch = ({ isMenuClosed, toggleMenu }) => {
  const menuSwitchImageRef = useRef(null);

  useEffect(() => {
    if (!isMenuClosed) {
      menuSwitchImageRef.current.src = iconBTNBurgerClose;
    } else {
      menuSwitchImageRef.current.src = iconBTNBurgerOpen;
    }
  }, [isMenuClosed]);

  const handleBTNMouseEnter = () => {
    if (isMenuClosed) {
      menuSwitchImageRef.current.src = iconBTNBurgerOpenH;
    } else {
      menuSwitchImageRef.current.src = iconBTNBurgerCloseH;
    }
  };

  const handleBTNMouseLeave = () => {
    if (isMenuClosed) {
      menuSwitchImageRef.current.src = iconBTNBurgerOpen;
    } else {
      menuSwitchImageRef.current.src = iconBTNBurgerClose;
    }
  };

  const handleBTNMouseDown = () => {
    if (isMenuClosed) {
      menuSwitchImageRef.current.src = iconBTNBurgerOpenP;
    } else {
      menuSwitchImageRef.current.src = iconBTNBurgerCloseP;
    }
  };

  const handleBTNMouseUp = () => {
    if (isMenuClosed) {
      menuSwitchImageRef.current.src = iconBTNBurgerOpen;
    } else {
      menuSwitchImageRef.current.src = iconBTNBurgerClose;
    }
  };

  return (
    <MenuSwitchBTN
      onMouseEnter={handleBTNMouseEnter}
      onMouseLeave={handleBTNMouseLeave}
      onMouseDown={handleBTNMouseDown}
      onMouseUp={handleBTNMouseUp}
      onClick={toggleMenu}
    >
      <MenuSwitchImage ref={menuSwitchImageRef} src={iconBTNBurgerOpen} />
    </MenuSwitchBTN>
  );
};

export default MenuSwitch;
