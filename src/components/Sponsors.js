import styled from "styled-components";
import iconLogoBS from "../assets/icon/logo_blockstudio.png";
import iconLogoKDAN from "../assets/icon/logo_kdanmobile.png";
import iconLogoTS from "../assets/icon/logo_titansoft.png";
import iconBTNSponsor from "../assets/icon/button/btn_sponsor.png";
import iconBTNSponsorH from "../assets/icon/button/btn_sponsor_h.png";
import iconDecorate4 from "../assets/icon/bg/bg_decorate_04.png";
import iconDecorate8 from "../assets/icon/bg/bg_decorate_08.png";

import PageTitle from "./PageTitle";
import { useContext, useEffect, useState, useMemo } from "react";
import LayoutContext from "../contexts/Layout";

const Name = "sponsors";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: 500vh;
  }
`;

const FixedPageTitle = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    top: 0;
    position: fixed;
  }
`;

const Content = styled.div`
  @media screen and (min-width: 1200px) {
    position: fixed;
    width: max-content;
    margin: 0 auto;
    top: 165px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SponsorIconBTN = styled.button`
  height: 252px;
  width: 252px;
  background-image: url(${iconBTNSponsor});
  background-size: contain;
  background-color: transparent;
  border-radius: 50px;
  padding: 0;
  margin: 0;
  :hover {
    background-image: url(${iconBTNSponsorH});
    img {
      transform: translate(2px, 2px);
    }
  }
`;

const Sponsor = styled.div`
  width: 252px;
  text-align: center;
  margin: 60px auto;
  & + div {
    margin: 40px auto;
  }

  transform: translateY(${(props) => (props.isShow ? 0 : "200")}px);
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition-property: opacity, transform;
  transition-duration: 0.5s, 1s;
  transition-delay: 0s;
  @media screen and (min-width: 1200px) {
    display: inline-block;
    transition-duration: opacity: ${(props) => (props.isShow ? "1s" : "0s")};
    transition-delay: 0, 2s;

    &:not(:nth-last-child(2)) + div {
      margin: 0px 125px;
    }
  }
`;

const SponsorBS = styled(Sponsor)`
  @media screen and (min-width: 1200px) {
    transition-delay: 0;
  }
`;
const SponsorTS = styled(Sponsor)`
  @media screen and (min-width: 1200px) {
    transition-delay: 0.5s;
  }
`;

const SponsorKM = styled(Sponsor)`
  @media screen and (min-width: 1200px) {
    transition-delay: 1s;
  }
`;

const SponsorTitle = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  text-align: center;
  color: var(--secondary-color-dark);
  border: 2px solid #a46039;
  border-radius: 60px;
  padding: 4px 24px;
  width: fit-content;
  margin-top: 15px;
`;

const ImageLogoBS = styled.img`
  width: 80%;
  height: auto;
  background: transparent;
  transform: translate(-10px, -5px);
`;

const ImageLogoKDAN = styled.img`
  width: 80%;
  height: auto;
  background: transparent;
  transform: translate(-10px, -5px);
`;

const ImageLogoTitan = styled.img`
  width: 80%;
  height: auto;
  background: transparent;
  transform: translate(-10px, -5px);
`;

const ImageBgDecorate4 = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    height: 548px;
    width: auto;
    display: block;
    position: fixed;
    left: 400px;
    bottom: 0px;
    transform: scale(${(props) => props.tStyle.scale})
      translateX(${(props) => props.tStyle.translateX}px)
      translateY(${(props) => props.tStyle.translateY}px);
    transform-origin: bottom;
    opacity: ${(props) => props.tStyle.opacity};
  }
`;

const ImageBgDecorate8 = styled.img`
  display: none;

  @media screen and (min-width: 1200px) {
    height: 522px;
    width: auto;
    display: block;
    position: fixed;
    top: initial;
    right: 350px;
    bottom: -5px;
    transform: scale(${(props) => props.tStyle.scale})
      translateX(${(props) => props.tStyle.translateX}px)
      translateY(${(props) => props.tStyle.translateY}px);

    transform-origin: bottom;

    opacity: ${(props) => props.tStyle.opacity};
  }
`;
const bgHiddenStyle = { translateX: 0, scale: 0, opacity: 0, translateY: 0 };

const Sponsors = () => {
  const [isShowTitle, setIsShowTitle] = useState(false);
  const [isShowSPBS, setIsShowSPBS] = useState(false);
  const [isShowSPKM, setIsShowSPKM] = useState(false);
  const [isShowSPTS, setIsShowSPTS] = useState(false);
  const { currentScrollArea, clientHeight, screenWidth, checkIsBelow } =
    useContext(LayoutContext);
  const [bgD4TStyle, setBgD4TStyle] = useState({
    translateX: -2000,
    scale: 1.5,
    opacity: 0,
    translateY: 600,
  });
  const [bgD8TStyle, setBgD8TStyle] = useState({
    translateX: 2000,
    scale: 1.4,
    opacity: 0,
    translateY: 600,
  });

  const isBelowCurrentArea = useMemo(() => checkIsBelow(Name), [checkIsBelow]);
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    let showTitle = false;
    let showSPBS = false,
      showSPKM = false,
      showSPTS = false;
    let bgD4AdedStyle = {
      translateX: -2000,
      scale: 2,
      opacity: 1,
      translateY: 1000,
    };
    let bgD8AdedStyle = {
      translateX: 2000,
      scale: 1.4,
      opacity: 1,
      translateY: 1000,
    };

    if (scrollAreaName === Name) {
      if (screenWidth < 1200) {
        if (scrollAreaOffset > 100 && scrollAreaOffset <= clientHeight / 2) {
          showTitle = true;
        } else if (
          scrollAreaOffset > clientHeight / 2 &&
          scrollAreaOffset <= clientHeight / 2 + 300
        ) {
          showTitle = true;
          showSPBS = true;
        } else if (
          scrollAreaOffset > clientHeight / 2 + 300 &&
          scrollAreaOffset <= clientHeight / 2 + 550
        ) {
          showTitle = true;
          showSPBS = true;
          showSPTS = true;
        } else if (scrollAreaOffset > clientHeight / 2 + 550) {
          showTitle = true;
          showSPBS = true;
          showSPTS = true;
          showSPKM = true;
        }
      } else {
        /**
         * like running through tree
         *
         * 0vh
         *      competition scale
         *      title not show
         *      bg4 opacity 0, scale 1.5, x inifitely small(2000), y inifitely big(1000)
         *      bg8 opacity 0, scale 1.4, x inifitely big(2000), y inifitely big(1000)
         *      three sponsors not show
         * 100vh
         *      title show
         *      bg4 opacity 0->1,  x -750 -> -150, y 1000->0
         *      bg8 opacity 0->1,  x 750 -> 150, y 1000->0
         *      three sponsors not show
         *
         * 200vh
         *      show title
         *      bg4 x -150 -> 0, scale 1.5 -> 1
         *      bg8 x 150 -> 0, scale 1.4 -> 1
         *      three sponsors show
         * 300vh
         *      show title
         *      bg4 x 0, scale 1->0, opacity 1->0
         *      bg4 x 0, scale 1->0, opacity 1->0
         *      three sponsors show
         *
         * 400vh
         *      show title
         *      bg4 hide x 0, scale 0, opacity 0
         *      bg8 hide x 0, scale 0, opacity 0
         *      three sponsors show
         * 500vh
         *      all hide
         *
         *
         *
         */

        if (
          scrollAreaOffset > clientHeight &&
          scrollAreaOffset <= clientHeight * 2
        ) {
          showTitle = true;
          bgD4AdedStyle = {
            scale: 2 - (0.5 * (scrollAreaOffset - clientHeight)) / clientHeight,
            translateX:
              -750 + (600 * (scrollAreaOffset - clientHeight)) / clientHeight,
            translateY:
              1000 - (1000 * (scrollAreaOffset - clientHeight)) / clientHeight,
            opacity: 1,
          };
          bgD8AdedStyle = {
            scale: 2 - (0.6 * (scrollAreaOffset - clientHeight)) / clientHeight,
            translateX:
              750 - (600 * (scrollAreaOffset - clientHeight)) / clientHeight,
            translateY:
              1000 - (1000 * (scrollAreaOffset - clientHeight)) / clientHeight,
            opacity: 1,
          };
        } else if (
          scrollAreaOffset > clientHeight * 2 &&
          scrollAreaOffset <= clientHeight * 3
        ) {
          showTitle = true;
          bgD4AdedStyle = {
            translateX:
              -150 +
              (150 * (scrollAreaOffset - clientHeight * 2)) / clientHeight,
            translateY: 0,
            scale:
              1.5 -
              (0.5 * (scrollAreaOffset - clientHeight * 2)) / clientHeight,
          };
          bgD8AdedStyle = {
            translateX:
              150 -
              (150 * (scrollAreaOffset - clientHeight * 2)) / clientHeight,
            translateY: 0,
            scale:
              1.4 -
              (0.4 * (scrollAreaOffset - clientHeight * 2)) / clientHeight,
          };
        } else if (
          scrollAreaOffset > clientHeight * 3 &&
          scrollAreaOffset <= clientHeight * 4
        ) {
          showTitle = true;
          showSPBS = showSPKM = showSPTS = true;

          bgD4AdedStyle = {
            scale:
              1 - (1 * (scrollAreaOffset - clientHeight * 3)) / clientHeight,
            opacity:
              1 - (1 * (scrollAreaOffset - clientHeight * 3)) / clientHeight,
          };
          bgD8AdedStyle = {
            scale:
              1 - (1 * (scrollAreaOffset - clientHeight * 3)) / clientHeight,
            opacity:
              1 - (1 * (scrollAreaOffset - clientHeight * 4)) / clientHeight,
          };
        } else if (
          scrollAreaOffset > clientHeight * 4 &&
          scrollAreaOffset <= clientHeight * 5
        ) {
          showTitle = true;
          showSPBS = true;
          showSPKM = true;
          showSPTS = true;
          bgD4AdedStyle = {
            ...bgHiddenStyle,
          };
          bgD8AdedStyle = {
            ...bgHiddenStyle,
          };
        } else {
          bgD4AdedStyle = {
            ...bgHiddenStyle,
          };
          bgD8AdedStyle = {
            ...bgHiddenStyle,
          };
        }
      }
    } else {
      if (screenWidth < 1200) {
        if (isBelowCurrentArea) {
          showTitle = true;
          showSPBS = true;
          showSPKM = true;
          showSPTS = true;
        }
      } else {
        bgD4AdedStyle = { translateX: 0, scale: 0, opacity: 0, translateY: 0 };
        bgD8AdedStyle = { translateX: 0, scale: 0, opacity: 0, translateY: 0 };
      }
    }
    setIsShowTitle(showTitle);
    setIsShowSPBS(showSPBS);
    setIsShowSPKM(showSPKM);
    setIsShowSPTS(showSPTS);
    setBgD4TStyle((pre) => ({ ...pre, ...bgD4AdedStyle }));
    setBgD8TStyle((pre) => ({ ...pre, ...bgD8AdedStyle }));
  }, [currentScrollArea, clientHeight]);

  return (
    <Container id="sponsors">
      <FixedPageTitle isShow={isShowTitle} titleText="贊助單位" />
      <ImageBgDecorate4 src={iconDecorate4} tStyle={bgD4TStyle} />
      <ImageBgDecorate8 src={iconDecorate8} tStyle={bgD8TStyle} />
      <Content>
        <SponsorBS isShow={isShowSPBS}>
          <SponsorIconBTN>
            <a
              href="https://kdanmobile.teamdoor.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageLogoBS src={iconLogoBS} />
            </a>
          </SponsorIconBTN>
          <SponsorTitle>#版塊設計</SponsorTitle>
        </SponsorBS>
        <SponsorTS isShow={isShowSPTS}>
          <SponsorIconBTN>
            <a
              href="https://blockstudio.tw/career/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageLogoTitan src={iconLogoTS} />
            </a>
          </SponsorIconBTN>
          <SponsorTitle>#鈦坦科技</SponsorTitle>
        </SponsorTS>
        <SponsorKM isShow={isShowSPKM}>
          <SponsorIconBTN>
            <a
              href="https://www.titansoft.com/tw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageLogoKDAN src={iconLogoKDAN} />
            </a>
          </SponsorIconBTN>
          <SponsorTitle>#凱鈿科技</SponsorTitle>
        </SponsorKM>
      </Content>
    </Container>
  );
};

export default Sponsors;
