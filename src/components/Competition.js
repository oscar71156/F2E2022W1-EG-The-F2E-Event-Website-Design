import styled from "styled-components";
import { useContext, useEffect, useState, useRef } from "react";
import LayoutContext from "../contexts/Layout";

import iconCharacterf2e from "../assets/characterf2e.gif";
import iconCharacterTeam from "../assets/characterTeam.gif";
import iconCharacterUI from "../assets/characterUI.gif";
import iconRoad from "../assets/road.png";
import iconFinishLineL from "../assets/finishLine_l.png";
import iconFinishLineR from "../assets/finishLine_r.png";

import layout, { getPreScreenByName } from "../layout";

const CompetitionEnvir = styled.div`
  margin: 0 auto;
  bottom: 0;
  position: fixed;
  width: 100%;
  /**On top of all the content PageTitle */
  z-index: 2;
  height: 200px;
  @media screen and (min-width: 1200px) {
    transform-origin: bottom;
    transform: ${(props) => "scale( " + props.reducedRatio + " )"};
    position: sticky;
    max-height: 1080px;
    max-width: 1430px;
    width: 100%;
    height: 600px;
    bottom: initial;
    top: calc(100vh - 600px);
  }

  @media screen and (min-width: 1800px) {
    width: 74.48vw;
  }
`;

const ImageRoad = styled.img`
  position: absolute;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  width: 349px;
  bottom: 0;
  z-index: -1;
  @media screen and (min-width: 1200px) {
    width: 82.17%;
    height: auto;
  }
`;

const ImageCharacter = styled.img`
  position: absolute;
  width: auto;
  height: 192px;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  margin: auto;
  @media screen and (min-width: 1200px) {
    visibility: ${(props) => (props.isShow ? "visible" : "hidden")};
  }
`;
const ImageCharacterf2e = styled(ImageCharacter)`
  transform: translateX(-115px);
  @media screen and (min-width: 1200px) {
    height: 47.87%;
    transform: translateX(-102%) scale(${(props) => props.tStyle.scale})
      translateY(${(props) => props.tStyle.translateY}px);
    transform-origin: right bottom;
    bottom: 30px;
    opacity: ${(props) => props.tStyle.opacity};
  }
  @media screen and (min-width: 1200px) {
    height: 100%;
  }
`;

const ImageCharacterUI = styled(ImageCharacter)`
  transform: translateX(5px);
  @media screen and (min-width: 1200px) {
    height: 47.87%;
    transform: scale(${(props) => props.tStyle.scale})
      translateY(${(props) => props.tStyle.translateY}px);
    transform-origin: bottom;
    opacity: ${(props) => props.tStyle.opacity};
  }
  @media screen and (min-width: 1200px) {
    height: 100%;
  }
`;

const ImageCharacterTeam = styled(ImageCharacter)`
  height: 168px;
  bottom: 0px;
  transform: translateX(120px);
  @media screen and (min-width: 1200px) {
    height: 88%;
    transform: translateX(102%) scale(${(props) => props.tStyle.scale})
      translateY(${(props) => props.tStyle.translateY}px);
    transform-origin: left bottom;

    bottom: 20px;
    opacity: ${(props) => props.tStyle.opacity};
  }
`;

const FinishLine = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    display: ${(props) => (props.isShow ? "block" : "none")};
    position: fixed;
    bottom: 20%;
    height: 200px;
    width: 100%;

    /**For on top of finish.png */
    z-index: 1;

    opacity: ${(props) => props.tStyle.opacity};

    &::before {
      content: "";
      display: block;
      background-image: url(${iconFinishLineL});
      background-size: 100%;
      width: 975px;
      height: 130px;
      position: absolute;
      left: 50%;
      transform: translateX(
          calc(15px - 100% + ${(props) => props.tStyle.lTanslateXOffset}px)
        )
        rotate(${(props) => props.tStyle.lRotate}deg)
        translateY(${(props) => props.tStyle.lTranslateY}px);
    }
    &::after {
      content: "";
      display: block;
      background-image: url(${iconFinishLineR});
      background-size: 100%;
      width: 975px;
      height: 130px;
      position: absolute;
      right: 50%;
      transform: translateX(
          calc(100% - 15px + ${(props) => props.tStyle.rTanslateXOffset}px)
        )
        rotate(${(props) => props.tStyle.rRotate}deg)
        translateY(${(props) => props.tStyle.rTranslateY}px);
    }
  }
`;
/**
  StartScreen height: 1500px;
  Bother heigth height: 100vh+1500px, real content: 700px;
  ThisYearTopic real content: 513(1920) 458(1440)
  CompingTopic realConntent: 768(1920) 816(1920)
 */

const Competition = () => {
  const [reducedRatio, setReducedRatio] = useState(1);
  const { clientHeight, scrollTop, currentScrollArea } =
    useContext(LayoutContext);

  const [isVisibleCharacter, setIsVisibleCharacter] = useState(true);
  const [cF2eTStyle, setCF2eTStyle] = useState({
    scale: 1,
    translateY: 0,
    opacity: 1,
  });
  const [cUITStyle, setCUITStyle] = useState({
    scale: 1,
    translateY: 0,
    opacity: 1,
  });
  const [cTeamTStyle, setCTeamTStyle] = useState({
    scale: 1,
    translateY: 0,
    opacity: 1,
  });
  const [finishLineTStyle, setFinishLineTStyle] = useState({
    lTanslateXOffset: 0,
    lTranslateY: 0,
    lRotate: 0,
    rTanslateXOffset: 0,
    rTranslateY: 0,
    rRotate: 0,
    opacity: 1,
  });

  const [isRenderFL, setIsRenderFL] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let lastCompetitionP = 1;
    let currenttCompetitionP = 1;
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    console.log(
      "scrollAreaName",
      scrollAreaName,
      "scrollAreaOffset",
      scrollAreaOffset
    );

    if (scrollAreaName) {
      const { realContentH } = layout[scrollAreaName];
      const { realContentH: preRealContentH } =
        getPreScreenByName(scrollAreaName);
      lastCompetitionP = (clientHeight - preRealContentH) / 600;
      currenttCompetitionP = (clientHeight - realContentH) / 600;
      if (
        scrollAreaName === "initialScreen" ||
        scrollAreaName === "startScreen"
      ) {
        lastCompetitionP = 1;
      }
    }

    const maxScrollAreaOffset =
      scrollAreaOffset > clientHeight ? clientHeight : scrollAreaOffset;
    const scaleNumber =
      lastCompetitionP +
      ((currenttCompetitionP - lastCompetitionP) * maxScrollAreaOffset) /
        clientHeight;

    if (scrollAreaName === "finish" && scrollAreaOffset >= 2000) {
      setReducedRatio(1);
    } else {
      setReducedRatio(scaleNumber);
    }

    let newAddedCharTStyle = {};
    let newAddedFLTStyle = {};
    if (scrollAreaName === "finish") {
      if (scrollAreaOffset <= 400) {
        setIsRenderFL(false);
      }

      if (scrollAreaOffset <= 2000) {
        setIsRenderFL(true);
        newAddedCharTStyle = {
          scale: 1,
          translateY: 0,
        };
        newAddedFLTStyle = {
          lTanslateXOffset: 0,
          lTranslateY: 0,
          lRotate: 0,
          rTanslateXOffset: 0,
          rTranslateY: 0,
          rRotate: 0,
          opacity: 0,
        };
      } else if (scrollAreaOffset > 2000 && scrollAreaOffset <= 4000) {
        newAddedCharTStyle = {
          scale: 1 + (0.3 * (scrollAreaOffset - 2000)) / 2000,
          translateY: 0 + (100 * (scrollAreaOffset - 2000)) / 2000,
        };
        newAddedFLTStyle = {
          lTanslateXOffset: 0 - (50 * (scrollAreaOffset - 2000)) / 2000,
          lTranslateY: 0 + (100 * (scrollAreaOffset - 2000)) / 2000,
          lRotate: 0 - (5 * (scrollAreaOffset - 2000)) / 2000,
          rTanslateXOffset: 0 + (50 * (scrollAreaOffset - 2000)) / 2000,
          rTranslateY: 0 + (100 * (scrollAreaOffset - 2000)) / 2000,
          rRotate: 0 + (5 * (scrollAreaOffset - 2000)) / 2000,
          opacity: 1,
        };
      } else if (scrollAreaOffset > 4000 && scrollAreaOffset <= 6000) {
        setIsRenderFL(true);

        newAddedCharTStyle = {
          scale: 1.3 + (0.2 * (scrollAreaOffset - 4000)) / 2000,
          opacity: 1,
          translateY: 100, //+ ( * (scrollAreaOffset - 4000)) / 2000,
        };

        newAddedFLTStyle = {
          lTanslateXOffset: -50 - (400 * (scrollAreaOffset - 4000)) / 2000,
          rTanslateXOffset: 50 + (400 * (scrollAreaOffset - 4000)) / 2000,
          lRotate: -5 - (10 * (scrollAreaOffset - 4000)) / 2000,
          rRotate: 5 + (10 * (scrollAreaOffset - 4000)) / 2000,
          lTranslateY: 100 + (1000 * (scrollAreaOffset - 4000)) / 2000,
          rTranslateY: 100 + (1000 * (scrollAreaOffset - 4000)) / 2000,
          opacity: 1 - (0 + (scrollAreaOffset - 4000) / 2000),
        };
      } else if (scrollAreaOffset > 6000 && scrollAreaOffset <= 8000) {
        newAddedCharTStyle = {
          scale: 1.5 + (1 * (scrollAreaOffset - 6000)) / 2000,
          opacity: 1 - (1 * (scrollAreaOffset - 6000)) / 2000,
          translateY: 100, //scroll up will stay the same position
        };
        setIsVisibleCharacter(true);
        setIsRenderFL(false);
      } else if (scrollAreaName === "finish" && scrollAreaOffset > 8000) {
        //For prevent character overflow in the end
        newAddedCharTStyle = {
          scale: 1,
          translateY: 0, //prevent overflow
        };
        setIsVisibleCharacter(false);
      }
    } else {
    }

    setCF2eTStyle((pre) => ({ ...pre, ...newAddedCharTStyle }));
    setCUITStyle((pre) => ({ ...pre, ...newAddedCharTStyle }));
    setCTeamTStyle((pre) => ({ ...pre, ...newAddedCharTStyle }));

    setFinishLineTStyle((pre) => ({
      ...pre,
      ...newAddedFLTStyle,
    }));
  }, [scrollTop, clientHeight, currentScrollArea]);

  return (
    <CompetitionEnvir ref={ref} id="test" reducedRatio={reducedRatio}>
      <ImageCharacterf2e
        src={iconCharacterf2e}
        tStyle={cF2eTStyle}
        isShow={isVisibleCharacter}
      />
      <ImageCharacterUI
        src={iconCharacterUI}
        tStyle={cUITStyle}
        isShow={isVisibleCharacter}
      />
      <ImageCharacterTeam
        src={iconCharacterTeam}
        tStyle={cTeamTStyle}
        isShow={isVisibleCharacter}
      />
      <ImageRoad src={iconRoad} />
      <FinishLine isShow={isRenderFL} tStyle={finishLineTStyle} />
    </CompetitionEnvir>
  );
};

export default Competition;
