import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/Layout";
import Profile from "./Profile/Profile";
import iconLogoText from "../../assets/icon/logo_text.png";
import iconLogo from "../../assets/icon/logo.png";
const HeaderC = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /***for able to scroll on Header. unable to scroll when position fixed */
  height: 60px;
  top: 0;
  width: 100%;
  flex-direction: row;
  /*under Competition(2) and on top of content(0)*/
  z-index: 1;
  position: fixed;
  @media screen and (min-width: 1200px) {
    height: 0;
    /**For scrollable, normal flow will take up space */
  }
`;

const Title = styled.div`
  display: inline-block;
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;
const TitleImage = styled.img`
  display: block;
  width: 133px;
  height: 46px;
  margin-top: 8px;
  @media screen and (min-width: 1200px) {
    width: 680px;
    height: 236px;
    margin-top: 44px;
  }
`;

const ImageBigLogo = styled.img`
  visibility: hidden;
  width: 40px;
  height: auto;
  /**對稱於Profile, make TheF2E center */
  margin: 12px 0;
  display: block;
  @media screen and (min-width: 1200px) {
    margin: 30px 40px;
    width: 200px;
    height: auto;
    display: block;
    visibility: visible;
    opacity: ${(props) => props.tStyle.opacity};
  }
`;

const Header = () => {
  const [bigLogoTStyle, setBigLogoTStyle] = useState({ opacity: 1 });
  const { clientHeight, currentScrollArea } = useContext(LayoutContext);
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (scrollAreaName === "signUp") {
      if (scrollAreaOffset <= clientHeight - 200) {
        setBigLogoTStyle({ opacity: 1 });
      } else if (
        scrollAreaOffset > clientHeight - 200 &&
        scrollAreaOffset <= clientHeight + 600
      ) {
        setBigLogoTStyle((pre) => ({
          ...pre,
          opacity: 1 - (scrollAreaOffset - clientHeight + 200) / 800,
        }));
      } else {
        setBigLogoTStyle({ opacity: 0 });
      }
    }
  }, [clientHeight, currentScrollArea]);

  return (
    <HeaderC>
      <ImageBigLogo src={iconLogo} tStyle={bigLogoTStyle} />
      <Title>
        <TitleImage src={iconLogoText} />
      </Title>
      <Profile />
    </HeaderC>
  );
};

export default Header;
