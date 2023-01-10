import styled from "styled-components";
import iconLogoBS from "../assets/logo_blockstudio.png";
import iconLogoKDAN from "../assets/logo_kdanmobile.png";
import iconLogoTS from "../assets/logo_titansoft.png";
import iconBTNSponsor from "../assets/btnSponsor.svg";
import iconBTNSponsorH from "../assets/btnSponsor_h.svg";
import iconDecorate4 from "../assets/bg_decorate_04.png";
import iconDecorate8 from "../assets/bg_decorate_08.png";

import PageTitle from "./PageTitle";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../contexts/Layout";
import layout from "../layout";

const Name = "sponsors";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 1000px);
    position: relative;
    > * {
      position: ${(props) => (props.isSticky ? "sticky" : "relative")};
      top: ${(props) => (props.isSticky ? 0 : 1000)}px;
    }
  }
`;

const Content = styled.div`
  @media screen and (min-width: 1200px) {
    width: max-content;
    margin: 0 auto;
    top: ${(props) => (props.isSticky ? 165 : 1000)}px;
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
  @media screen and (min-width: 1200px) {
    display: inline-block;
    transform: translateY(${(props) => (props.isShow ? 0 : "200")}px);
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    transition-property: opacity, transform;
    transition-duration: 1s;
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
    ${"" /* bottom:px; */}
    left:400px;
    bottom: 0px;
    top: initial;
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

const Sponsors = () => {
  const [isShowContent, setIsShowContent] = useState(false);
  const [isShowTitle, setIsShowTitle] = useState(false);
  const { currentScrollArea, clientHeight,getScreenInforByName } = useContext(LayoutContext);
  const [isSticky, setIsSticky] = useState(false);
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

  /**
   *
   * like running through tree
   *
   * ovh
   *      title not show
   *      content not show
   *      bg4 opacity 0, scale 1.5, x inifitely small(2000), y inifitely big(1000)
   *      bg8 opacity 0, scale 1.4, x inifitely big(2000), y inifitely big(1000)
   *      title disappear
   *
   * 50vh
   *      show title
   *      bg4 opacity 0->1,  x -750 -> -150, y 1000->0
   *      bg8 opacity 0->1,  x 750 -> 150, y 1000->0
   *      content disappear
   *
   * 100vh
   *
   *      show content
   *      bg4 x -150 -> 0, scale 1.5 -> 1
   *      bg8 x 150 -> 0, scale 1.4 -> 1
   *
   * 100vh+500
   *      bg4 x 0, scale 1->0, opacity 1->0
   *      bg8 x 0, scale 1->0, opacity 1->0
   *
   * 100vh+900
   *
   *    title show
   *      content show
   *
   */
  useEffect(() => {
    const {
      name: scrollAreaName,
      offset: scrollAreaOffset,
      order: scrollAreaOrder,
    } = currentScrollArea;

    if (scrollAreaName === Name) {
      setIsSticky(true);

      if (
        scrollAreaOffset >= clientHeight / 2 &&
        scrollAreaOffset < clientHeight
      ) {
        setIsShowTitle(true);
      } else if (scrollAreaOffset >= clientHeight) {
        setIsShowContent(true);
      }

      if (scrollAreaOffset < clientHeight / 2) {
        setBgD4TStyle({
          translateX: -2000,
          scale: 2,
          opacity: 1,
          translateY: 1000,
        });
        setBgD8TStyle({
          translateX: 2000,
          scale: 1.4,
          opacity: 1,
          translateY: 1000,
        });
      } else if (
        scrollAreaOffset >= clientHeight / 2 &&
        scrollAreaOffset < clientHeight
      ) {
        setBgD4TStyle((pre) => ({
          ...pre,
          scale:
            2 -
            (0.5 * (scrollAreaOffset - clientHeight / 2) * 2) / clientHeight,
          translateX:
            -750 +
            (600 * (scrollAreaOffset - clientHeight / 2) * 2) / clientHeight,
          translateY:
            1000 -
            (1000 * (scrollAreaOffset - clientHeight / 2) * 2) / clientHeight,
        }));
        setBgD8TStyle((pre) => ({
          ...pre,
          scale:
            2 -
            (0.6 * (scrollAreaOffset - clientHeight / 2) * 2) / clientHeight,
          translateX:
            750 -
            (600 * (scrollAreaOffset - clientHeight / 2) * 2) / clientHeight,
          translateY:
            1000 -
            (1000 * (scrollAreaOffset - clientHeight / 2) * 2) / clientHeight,
        }));
      } else if (
        scrollAreaOffset >= clientHeight &&
        scrollAreaOffset < clientHeight + 500
      ) {
        setBgD4TStyle((pre) => ({
          ...pre,
          translateX: -150 + (150 * (scrollAreaOffset - clientHeight)) / 500,
          translateY: 0,
          scale: 1.5 - (0.5 * (scrollAreaOffset - clientHeight)) / 500,
        }));
        setBgD8TStyle((pre) => ({
          ...pre,
          translateX: 150 - (150 * (scrollAreaOffset - clientHeight)) / 500,
          translateY: 0,
          scale: 1.4 - (0.4 * (scrollAreaOffset - clientHeight)) / 500,
        }));
      } else if (
        scrollAreaOffset > clientHeight + 500 &&
        scrollAreaOffset < clientHeight + 900
      ) {
        setBgD4TStyle((pre) => ({
          ...pre,
          scale: 1 - (1 * (scrollAreaOffset - clientHeight - 500)) / 400,
          opacity: 1 - (1 * (scrollAreaOffset - clientHeight - 500)) / 400,
        }));
        setBgD8TStyle((pre) => ({
          ...pre,
          scale: 1 - (1 * (scrollAreaOffset - clientHeight - 500)) / 400,
          opacity: 1 - (1 * (scrollAreaOffset - clientHeight - 500)) / 400,
        }));
      } else {
        setBgD4TStyle({ translateX: 0, scale: 0, opacity: 0, translateY: 0 });
        setBgD8TStyle({ translateX: 0, scale: 0, opacity: 0, translateY: 0 });
      }
    } else {
      setBgD4TStyle({ translateX: 0, scale: 0, opacity: 0, translateY: 0 });
      setBgD8TStyle({ translateX: 0, scale: 0, opacity: 0, translateY: 0 });
      setIsSticky(false);
      const sponsorsScreen=getScreenInforByName('sponsors');
      if (scrollAreaOrder < sponsorsScreen?.order) {
        setIsShowContent(false);
        setIsShowTitle(false);
      }
    }
  }, [currentScrollArea, clientHeight]);
  return (
    <Container isSticky={isSticky} id="sponsors">
      <PageTitle isShow={isShowTitle} titleText="贊助單位" />
      <Content isSticky={isSticky}>
        <SponsorBS isShow={isShowContent}>
          <SponsorIconBTN>
            <a href="https://kdanmobile.teamdoor.io/" target="_blank" rel="noopener noreferrer">
              <ImageLogoBS src={iconLogoBS} />
            </a>
          </SponsorIconBTN>
          <SponsorTitle>#版塊設計</SponsorTitle>
        </SponsorBS>
        <SponsorTS isShow={isShowContent}>
          <SponsorIconBTN>
            <a href="https://www.titansoft.com/tw/" target="_blank" rel="noopener noreferrer">
              <ImageLogoKDAN src={iconLogoKDAN} />
            </a>
          </SponsorIconBTN>
          <SponsorTitle>#鈦坦科技</SponsorTitle>
        </SponsorTS>
        <SponsorKM isShow={isShowContent}>
          <SponsorIconBTN>
            <a href="https://blockstudio.tw/career/" target="_blank" rel="noopener noreferrer">
              <ImageLogoTitan src={iconLogoTS} />
            </a>
          </SponsorIconBTN>
          <SponsorTitle>#凱鈿科技</SponsorTitle>
        </SponsorKM>
      </Content>
      <ImageBgDecorate4 src={iconDecorate4} tStyle={bgD4TStyle} />
      <ImageBgDecorate8 src={iconDecorate8} tStyle={bgD8TStyle} />
    </Container>
  );
};

export default Sponsors;
