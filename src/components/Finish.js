import styled from "styled-components";
import iconFinish from "../assets/finish_1.png";
import { useContext, useEffect, useState } from "react";
import bgDecorate01 from "../assets/bg_decorate_01.png";
import bgDecorate05 from "../assets/bg_decorate_05.png";
import LayoutContext from "../contexts/Layout";
const Container = styled.div`
  display: none;

  @media screen and (min-width: 1200px) {
    display: block;
    height: 9000px;
    background: #e6eed6;
    overflow: hidden;
    position: relative;
    /**For on top of Competiton */
    z-index: 0;
    &::after {
      content: "";
      visibility: ${(props) => (props.isShowRailing ? "visible" : "hidden")};
      ${"" /* display:block; */}
      position: fixed;
      bottom: 0;

      height: max-content;
      max-width: 1430px;

      width: 100%;
      height: 100vh;
      width: 1430px;
      background-image: url(${iconFinish});
      background-size: 100%;
      background-position: bottom;
      background-repeat: no-repeat;
      transform: scale(${(props) => props.tStyle.scale});
      right: 0;
      left: 0;
      margin: 0 auto;
    }
  }
`;

// const ImageBgStart = styled.img`
//   display: none;
//   @media screen and (min-height: 900px) and (min-width: 1200px) {
//     display: block;
//   }
//   @media screen and (min-width: 1200px) {
//     position: fixed;

//     top: 0;
//     height: 100%;
//     max-height: 1080px;
//     max-width: 1430px;

//     width: 100%;
//     height: 100vh;

//     visibility: ${(props) => (props.runningState > 4 ? "hidden" : "visible")};
//   }

//   @media screen and (min-width: 1800px) {
//     width: 74.48vw;
//   }
//   @media screen and (min-height: 1080px) {
//     top: calc(100vh - 1080px);
//   }
// `;

const ImageBgDecorate1 = styled.img`
  display: none;
  position: absolute;
  ${"" /* left: -20px; */}
  top: 50%;
  transform: translateY(-30%);
  width: 113px;
  height: auto;

  ${"" /* transform: translateY(40px); */}

  @media screen and (min-width: 600px) {
    display: block;
    width: 271px;
    ${"" /* left: -70px; */}
    z-index: -1;
  }
  @media screen and (min-width: 900px) {
    width: 430px;
  }
  @media screen and (min-width: 1200px) {
    position: fixed;
    top: 40%;
    left: 10%;
    transform-origin: top right;
    transform: translateY(${(props) => props.tStyle.translateY}px)
      translateX(${(props) => props.tStyle.translateX}px)
      scale(${(props) => props.tStyle.scale});
    ${
      "" /* transition-property: transform;
    transition-duration: 1s; */
    }
    opacity:${(props) => props.tStyle.opacity};
  }
`;

const ImageBgDecorate5 = styled.img`
  display: none;
  position: absolute;
  width: 127px;
  height: auto;
  top: 50%;
  right: -30px;
  transform: translateY(-50%);

  @media screen and (min-width: 600px) {
    width: 305px;
    right: -70px;
  }

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

    transform: translateY(${(props) => props.tStyle.translateY}px)
      translateX(${(props) => props.tStyle.translateX}px)
      scale(${(props) => props.tStyle.scale});
    ${
      "" /* transition-property: transform;
    transition-duration: 1s; */
    }
    opacity:${(props) => props.tStyle.opacity};
  }
`;

function Finish() {
  const [isShowRailing, setIsShowRailing] = useState(false);
  const [bg1TStyle, setBg1TStyle] = useState({
    translateX: -1000,
    translateY: 1000,
    scale: 1.5,
    opacity: 1,
  });
  const [bg5TStyle, setBg5TStyle] = useState({
    translateX: 1000,
    translateY: 1000,
    scale: 1.5,
    opacity: 1,
  });

  const [railingTStyle, setRailingTStyle] = useState({
    scale: 2,
  });

  const { clientHeight, currentScrollArea } = useContext(LayoutContext);
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (scrollAreaName === "finish") {
      if (scrollAreaOffset > 0 && scrollAreaOffset <= 1000) {
        setBg1TStyle((pre) => ({
          ...pre,
          translateX: -1000 + (1000 * scrollAreaOffset) / 1000,
          translateY: 1000 - (1000 * scrollAreaOffset) / 1000,
          scale: 1.5 - (0.5 * scrollAreaOffset) / 1000,
          opacity: 1,
        }));
        setBg5TStyle((pre) => ({
          ...pre,
          translateX: 1000 - (1000 * scrollAreaOffset) / 1000,
          translateY: 1000 - (1000 * scrollAreaOffset) / 1000,
          scale: 1.5 - (0.5 * scrollAreaOffset) / 1000,
          opacity: 1,
        }));
      } else if (scrollAreaOffset > 1000 && scrollAreaOffset <= 2000) {
        setIsShowRailing(true);
        setRailingTStyle((pre) => ({
          ...pre,
          scale: 2 - (1 * (scrollAreaOffset - 1000)) / 1000,
        }));
        setBg1TStyle((pre) => ({
          ...pre,
          translateX: 0,
          translateY: 0,
          scale: 1,
        }));
        setBg5TStyle((pre) => ({
          ...pre,
          translateX: 0,
          translateY: 0,
          scale: 1,
        }));
      } else if (scrollAreaOffset > 2000 && scrollAreaOffset <= 4000) {
        setRailingTStyle((pre) => ({
          ...pre,
          scale: 1,
        }));
      } else if (scrollAreaOffset > 4000 && scrollAreaOffset <= 6000) {
        setBg1TStyle((pre) => ({
          ...pre,
          scale: 1 - (0 + (scrollAreaOffset - 4000) / 2000),
          opacity: 1 - (0 + (scrollAreaOffset - 4000) / 2000),
        }));
        setBg5TStyle((pre) => ({
          ...pre,
          scale: 1 - (0 + (scrollAreaOffset - 4000) / 2000),
          opacity: 1 - (0 + (scrollAreaOffset - 4000) / 2000),
        }));
      } else {
        setBg1TStyle((pre) => ({
          ...pre,
          opacity: 0,
        }));
        setBg5TStyle((pre) => ({
          ...pre,
          opacity: 0,
        }));
      }
    } else {
      setIsShowRailing(false);
    }
  }, [clientHeight, currentScrollArea]);

  return (
    <Container isShowRailing={isShowRailing} tStyle={railingTStyle}>
      <ImageBgDecorate1 src={bgDecorate01} tStyle={bg1TStyle} />
      <ImageBgDecorate5 src={bgDecorate01} tStyle={bg5TStyle} />
    </Container>
  );
}

export default Finish;
