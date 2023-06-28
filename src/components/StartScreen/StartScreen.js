import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import JoiningTypes from "./JoiningTypes";
import LayoutContext from "../../contexts/Layout";
import TrafficLight from "./TrafficLight";

import iconBGStart from "../../assets/icon/start.png";
import bgDecorate01 from "../../assets/icon/bg/bg_decorate_01.png";
import bgDecorate05 from "../../assets/icon/bg/bg_decorate_05.png";

import Logo from "./Logo";

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 1800px);
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
    top: 35vh;
    right: 0;
    left: 0;
    margin: 0 auto;
    padding: 5vh 0;
    visibility: ${(props) => (props.runningState > 3 ? "hidden" : "visible")};
  }
`;

const ImageBgStart = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    position: fixed;
    display: block;

    z-index: -1;
    bottom: -10%;
    height: 120%;

    right: 0;
    left: 0;
    margin: 0 auto;
    max-width: 100vw;
    visibility: ${(props) => (props.runningState > 4 ? "hidden" : "visible")};
  }
`;

const AnimationLogo = styled(Logo)`
  @media screen and (min-width: 1200px) {
    visibility: ${(props) => (props.runningState > 4 ? "hidden" : "visible")};
  }
`;

function StartScreen() {
  const {
    screenWidth,
    screenNodesInforObj: screenNodesInfor,
    scrollTop,
  } = useContext(LayoutContext);
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
    if (screenWidth > 1200) {
      const startScreenPos = {
        start: screenNodesInfor?.startScreen.start,
        end:
          screenNodesInfor?.startScreen.start +
          screenNodesInfor?.startScreen.height,
      };
      if (
        scrollTop >= startScreenPos.start &&
        scrollTop <= startScreenPos.end
      ) {
        setRunningState(Math.floor(scrollTop / 300));
      } else {
        setRunningState(5);
      }
    }
  }, [screenWidth, screenNodesInfor, scrollTop]);

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
      <ImageBgDecorate1 src={bgDecorate01} transformStyle={bg1TransformStyle} />
      <ImageBgDecorate5 src={bgDecorate05} transformStyle={bg2TransformStyle} />
      <TrafficLight runningState={runningState} />
      <ImageBgStart src={iconBGStart} runningState={runningState} />
      <AnimationLogo runningState={runningState} />
      <AnimationJoiningTypes runningState={runningState} />
    </Container>
  );
}

export default StartScreen;
