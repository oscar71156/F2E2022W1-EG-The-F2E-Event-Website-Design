import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import iconDecorate3 from "../assets/icon/bg/bg_decorate_03.png";
import iconDecorate7 from "../assets/icon/bg/bg_decorate_07.png";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 2000px);
  }
`;

const Content = styled.div`
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    position: fixed;
    left: 50%;
    top: 180px;
    transform: translateX(-50%);
    height: max-content;
    width: 75vw;
    
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
const Title = styled.h2`
  font-weight: 700;
  color: var(--highlight-color-default);
  text-align: center;

  transform: scale(${(props) => props.tStyle.scale});
  opacity: ${(props) => props.tStyle.opacity};
  transition: opacity ${(props) => (props.tStyle.opacity === 0 ? "1s" : "0s")};
  width: 100%;
  margin: 0;
`;
const Br = styled.br`
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const ImageBgDecorate3 = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    display: inline-block;

    width: 250px;
    height: auto;
    z-index: -1;
    transform: translateX(${(props) => props.ttranslate.x}vw);
    opacity: ${(props) => props.ttranslate.opacity};
    transition: opacity
      ${(props) => (props.ttranslate.opacity === 0 ? "1s" : "0s")};
  }
  @media screen and (min-width: 1400px) {
    width: 368px;
  }
`;

const ImageBgDecorate7 = styled.img`
  display: none;

  @media screen and (min-width: 1200px) {
    display: inline-block;

    z-index: -1;
    height: auto;
    width: 300px;
    transform: translateX(${(props) => props.ttranslate.x}vw);
    opacity: ${(props) => props.ttranslate.opacity};
    transition: opacity
      ${(props) => (props.ttranslate.opacity === 0 ? "1s" : "0s")};
  }
  @media screen and (min-width: 1400px) {
    width: 450px;
  }
`;

const Dissatisfactory = () => {
  const { currentScrollArea, clientHeight, screenWidth } =
    useContext(LayoutContext);
  const [bg3Translate, setBg3Translate] = useState({
    x: -40,
    opacity: 0,
  });
  const [bg7Translate, setBg7Translate] = useState({
    x: 40,
    opacity: 0,
  });
  const [titleStyle, setTitleStyle] = useState({
    scale: 30,
    opacity: 0,
  });
  /**
   *
   *
   * In laptop screen
   * 0 -> 100vh
   *
   * bg3 move from outside
   *  x -40vw -> -20vw
   * bg7 move from outside
   *  x 40vw -> 20vw
   *
   * 100vh -> 100vh + 1200
   * title scale down and became clear
   *  scale 30 -> 1
   *  opacity 0 ->1
   *
   * 100vh + 800 -> 100vh + 1200
   *  bg3 continue moving
   *    x -20vw -> 0vw
   *  bg7 continue moving
   *    x 20vw -> 0vw
   *
   * 100vh + 1200 -> 100vh+2000
   * show title and bg3 and bg7 compeletely
   *
   * 1000vh+2000 ~
   * make all disappear
   *
   */

  useEffect(() => {
    const {
      name: scrollAreaName,
      offset: scrollAreaOffset,
      height: scrollAreaHeight,
    } = currentScrollArea;
    if (scrollAreaName === "dissatisfactory") {
      if (screenWidth < 1200) {
        let titleOpacity = 1,
          titleScale = 0;
        if (
          scrollAreaOffset > scrollAreaHeight / 2 &&
          scrollAreaOffset < scrollAreaHeight
        ) {
          titleScale =
            20 -
            ((19 * (scrollAreaOffset - scrollAreaHeight / 2)) /
              scrollAreaHeight) *
              2;
          titleOpacity =
            0 +
            ((scrollAreaOffset - scrollAreaHeight / 2) / scrollAreaHeight) * 2;
        }
        setTitleStyle({
          opacity: titleOpacity,
          scale: titleScale,
        });
      } else {
        let titleStyle = { opacity: 0, scale: 1 };
        let bg3TStyle = { x: -40, opacity: 1 };
        let bg7TStyle = { x: 40, opacity: 1 };

        if (scrollAreaOffset < clientHeight) {
          bg3TStyle = {
            ...bg3TStyle,
            x:
              -40 +
              (20 * 2 * (scrollAreaOffset - clientHeight / 2)) / clientHeight,
          };
          bg7TStyle = {
            ...bg7TStyle,
            x:
              40 -
              (20 * 2 * (scrollAreaOffset - clientHeight / 2)) / clientHeight,
          };
        } else if (
          scrollAreaOffset >= clientHeight &&
          scrollAreaOffset < clientHeight + 1200
        ) {
          bg3TStyle = { x: -20, opacity: 1 };
          bg7TStyle = { x: 20, opacity: 1 };
          titleStyle = {
            ...titleStyle,
            scale: 30 - (29 * (scrollAreaOffset - clientHeight)) / 1200,
            opacity: 0 + (scrollAreaOffset - clientHeight) / 1200,
          };
          if (scrollAreaOffset > clientHeight + 900) {
            bg3TStyle = {
              ...bg3TStyle,
              x: -20 + 20 * ((scrollAreaOffset - clientHeight - 900) / 300),
            };
            bg7TStyle = {
              ...bg7TStyle,
              x: 20 - 20 * ((scrollAreaOffset - clientHeight - 900) / 300),
            };
          }
        } else if (scrollAreaOffset >= clientHeight + 1200) {
          bg3TStyle = {
            ...bg3TStyle,
            x: 0,
          };
          bg7TStyle = {
            ...bg7TStyle,
            x: 0,
          };
          titleStyle = {
            scale: 1,
            opacity: 1,
          };
        }
        setBg3Translate(bg3TStyle);
        setBg7Translate(bg7TStyle);
        setTitleStyle(titleStyle);
      }
    } else {
      if (screenWidth < 1200) {
        setTitleStyle({ opacity: 1, scale: 1 });
      } else {
        setTitleStyle({ opacity: 0, scale: 1 });
        setBg3Translate((pre) => ({ ...pre, opacity: 0 }));
        setBg7Translate((pre) => ({ ...pre, opacity: 0 }));
      }
    }
  }, [currentScrollArea, clientHeight]);

  return (
    <Container id="dissatisfactory">
      <Content>
        <Title tStyle={titleStyle}>
          區區修練
          <Br />
          已經無法滿足了嗎?
        </Title>
        <ImageBgDecorate3 ttranslate={bg3Translate} src={iconDecorate3} />
        <ImageBgDecorate7 ttranslate={bg7Translate} src={iconDecorate7} />
      </Content>
    </Container>
  );
};

export default Dissatisfactory;
