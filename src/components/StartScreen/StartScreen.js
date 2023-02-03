import styled from "styled-components";
import iconLogo from "../../assets/icon/logo.png";
import LogoText from "../LogoText";
import JoiningTypes from "./JoiningTypes";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/Layout";
import TrafficLight from "./TraficLight";

import iconBGStart from "../../assets/icon/start.png";
import bgDecorate01 from "../../assets/icon/bg/bg_decorate_01.png";
import bgDecorate05 from "../../assets/icon/bg/bg_decorate_05.png";

import Logo from "./Logo";

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  padding-top: 60px;
  @media screen and (min-width: 1200px) {
    height: 1800px;
    display: flex;
    justify-content: center;
  }
`;
const ImageBigLogo = styled.img`
  display: block;
  padding: 32px 0 16px;
  margin: 0 auto;
  width: auto;
  height: calc(100vh - 550px);
  ${'' /* aspect-ratio: 137/102; */}
  max-height: 190px;

  @media screen and (min-width: 800px) {
    width: 90vw;
    height: auto;
  }
`;
const BigIconM = styled.div`
  height: min-content;
  @media screen and (min-width: 1200px) {
    display: none;
  }
  @media screen and (max-height: 600px) {
    display: none;
  }
`;

const ImageBgDecorate1 = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-30%);
  width: 113px;
  height: auto;
  z-index: -1;
  @media screen and (min-width: 900px) {
    width: 430px;
  }
  @media screen and (min-width: 1200px) {
    position: fixed;
    top: 40%;
    left: 10%;
    transform-origin: top right;
    transform: translateY(-30%) scale(${(props) => props.transformStyle.scale});
    transition-property: transform;
    transition-duration: 1s;
  }
`;

const ImageBgDecorate5 = styled.img`
  position: absolute;
  width: 127px;
  height: auto;
  top: 50%;
  right: -30px;
  transform: translateY(-50%);

  @media screen and (min-width: 900px) {
    display: block;
    width: 485px;
    z-index: -1;
  }
  @media screen and (min-width: 1200px) {
    position: fixed;
    top: 40%;
    right: 10%;
    transform-origin: top left;

    transform: translateY(-50%) scale(${(props) => props.transformStyle.scale});
    transition-property: transform;
    transition-duration: 1s;
  }
`;

const AnimationJoiningTypes = styled(JoiningTypes)`
  @media screen and (min-width: 1200px) {
    position: fixed;
    top: 50%;
    transform: translateY(-200%);
    visibility: ${(props) => (props.runningState > 3 ? "hidden" : "visible")};
  }
`;

const ImageBgStart = styled.img`
  display: none;
  @media screen and (min-height: 900px) and (min-width: 1200px) {
    display: block;
  }
  @media screen and (min-width: 1200px) {
    position: fixed;

    top: 0;
    max-height: 1080px;
    max-width: 1430px;

    width: 100%;
    height: 100vh;

    visibility: ${(props) => (props.runningState > 4 ? "hidden" : "visible")};
  }

  @media screen and (min-width: 1800px) {
    width: 74.48vw;
  }
  @media screen and (min-height: 1080px) {
    top: calc(100vh - 1080px);
  }
`;

const AnimationLogo = styled(Logo)`
  @media screen and (min-width: 1200px) {
    visibility: ${(props) => (props.runningState > 4 ? "hidden" : "visible")};
  }
`;

function StartScreen() {
  const { clientHeight, currentScrollArea, screenWidth } =
    useContext(LayoutContext);
  const [bg1TransformStyle, setBg1TransformStyle] = useState({ scale: 1 });
  const [bg2TransformStyle, setBg2TransformStyle] = useState({ scale: 1 });
  const [runningState, setRunningState] = useState(0);

  /**
   * When in desktop or , big desktop(width > 1200px)
   * Animation
   * 0   ~ 300 => runningState=0 initial
   * 300 ~ 600 => runningState=1 red light, bg cloud become smaller
   * 600 ~ 900 => runningState=2 orange light, bg cloud become smaller
   * 900 ~ 1200 => runningState=3 green light and Go!!, bg cloud disappear
   * 1200 ~ 1500 => runningState=4 traffic light and jointypes disappear
   * 1500 ~ 1800 => runningState=5 bgStart and the icon on top of it disappear, top-left icon appear
   */
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (screenWidth > 1200) {
      if (scrollAreaName === "startScreen") {
        setRunningState(Math.floor(scrollAreaOffset / 300));
      } else {
        setRunningState(5);
      }
    }
  }, [clientHeight, currentScrollArea]);

  useEffect(() => {
    //runningState 0=>2 3=>disappear
    if (runningState <= 4) {
      setBg1TransformStyle({ scale: 1 - 0.25 * runningState, opacity: 1 });
      setBg2TransformStyle({ scale: 1 - 0.25 * runningState, opacity: 1 });
    } else {
      setBg1TransformStyle({ scale: 0, opacity: 0 });
      setBg2TransformStyle({ scale: 0, opacity: 0 });
    }
  }, [runningState]);
  return (
    <Container id="startScreen">
      <BigIconM>
        <ImageBigLogo src={iconLogo} />
        <LogoText />
      </BigIconM>
      <ImageBgDecorate1 src={bgDecorate01} transformStyle={bg1TransformStyle} />
      <ImageBgDecorate5 src={bgDecorate05} transformStyle={bg2TransformStyle} />
      <AnimationJoiningTypes runningState={runningState} />
      <TrafficLight runningState={runningState} />
      <ImageBgStart src={iconBGStart} runningState={runningState} />
      <AnimationLogo runningState={runningState} />
    </Container>
  );
}

export default StartScreen;
