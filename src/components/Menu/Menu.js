import styled from "styled-components";
import { useState } from "react";
import MenuSwitch from "./MenuSwitch";
import MenuItem from "./MenuItem";

import { getMenuItems } from "./menuItems";

const Container = styled.div`
  /**right side with 40px+7px*/
  /* for  */
  position: fixed;

  /***On the of all, give it as big as possible */
  z-index: 10;
  background: yellow;
  ${
    "" /* width: 47px;
  height: 47px; */
  }
  display: inline-block;
  vertical-align: top;
`;


const MenuOverlay = styled.div`
  ${"" /* use <Header> relative */}
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 195, 125, 0.8);
  z-index: -1;
  transform: translateX(0);
  visibility: ${(props) => (props.isMenuClosed ? "hidden" : "visible")};
  opacity: ${(props) => (props.isMenuClosed ? 0 : 1)};
  transition-duration: 0.2s;
  transition-property: opacity, visibility;
  @media screen and (min-width: 900px) {
    display: none;
  }
`;

const MenuItems = styled.ul`
  width: 155px;
  height: 100vh;
  background-color: var(--primary-color-default);
  margin: 0;
  list-style-type: none;
  padding: 0;
  position: absolute;
  ${"" /* z-index: -1; */}
  transition-duration: 0.3s;
  transition-property: transform;
  transform: translateX(${(props) => (props.isMenuClosed ? -155 : 0)}px);
  ${"" /* visibility:hidden; */}

  @media screen and (min-width: 900px) {
    transform: translateX(${(props) => (props.isMenuClosed ? -135 : 0)}px);
  }
`;

const Menu = ({ children }) => {
  const [isMenuClosed, setIsMenuClosed] = useState(true);
  return (
    <Container>
      <MenuOverlay isMenuClosed={isMenuClosed} />
      <MenuItems isMenuClosed={isMenuClosed}>
        <MenuSwitch
          isMenuClosed={isMenuClosed}
          toggleMenu={() => {
            setIsMenuClosed((preState) => !preState);
          }}
        />
        {getMenuItems().map(({ title, url, image, imageH }) => (
          <MenuItem
            key={title}
            title={title}
            url={url}
            image={image}
            imageH={imageH}
          />
        ))}
      </MenuItems>
    </Container>
  );
};

export default Menu;
