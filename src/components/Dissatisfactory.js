import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import iconDecorate3 from "../assets/bg_decorate_03.png";
import iconDecorate7 from "../assets/bg_decorate_07.png";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 2400px);
    ${"" /* background-color: #cfffe5; */}
  }
`;

const Content = styled.div`
  @media screen and (min-width: 1200px) {
    position: ${(props) => (props.isSticky ? "sticky" : "static")};
    top: 230px;
    transform: translateY(${(props) => (props.isSticky ? 0 : 2000)}px);
    ${"" /* height:400px; */}
  }
`;
const Title = styled.h2`
  font-weight: 700;
  color: var(--highlight-color-default);
  padding: 228px 0 252px;
  text-align: center;
  @media screen and (min-width: 1200px) {
    padding: 0;
    margin-top: 232px;
    transform: scale(${(props) => props.tStyle.scale});
    opacity: ${(props) => props.tStyle.opacity};
  }
`;
const Br = styled.br`
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const ImageBgDecorate3 = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;

    width: 368px;
    height: auto;

    position: absolute;

    transform: translateY(${(props) => props.ttranslate.y}px)
      translateX(${(props) => props.ttranslate.x}px);
  }
`;

const ImageBgDecorate7 = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;

    width: 450px;
    height: auto;
    position: absolute;
    right: 0;

    transform: translateY(${(props) => props.ttranslate.y}px)
      translateX(${(props) => props.ttranslate.x}px);
  }
`;

const Dissatisfactory = () => {
  const { currentScrollArea, clientHeight } = useContext(LayoutContext);
  const [bg3Translate, setBg3Translate] = useState({ x: -500, y: 0 });
  const [bg7Translate, setBg7Translate] = useState({ x: 450, y: -70 });
  const [titleStyle, setTitleStyle] = useState({ scale: 30, opacity: 0 });
  const [isStikcy, setIsSticky] = useState(false);
  /**
   * bg3 x -500 y 0
   * bg7 x 450 y -70
   *
   * bg3 x -50 y  0
   * bg7 x 100 y -70
   *
   * bg3 x 100 y 0
   * bg7 x 0 y -70
   *
   */

  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (scrollAreaName === "dissatisfactory") {
      setIsSticky(true);
      if (scrollAreaOffset < clientHeight / 2) {
        setBg3Translate({
          x: -500,
          y: 0,
        });
        setBg7Translate({
          x: 450,
          y: -70,
        });
      } else if (
        scrollAreaOffset >= clientHeight / 2 &&
        scrollAreaOffset < clientHeight
      ) {
        setBg3Translate((pre) => ({
          ...pre,
          x:
            -500 +
            (450 * 2 * (scrollAreaOffset - clientHeight / 2)) / clientHeight,
        }));
        setBg7Translate((pre) => ({
          ...pre,
          x:
            450 -
            (450 * 2 * (scrollAreaOffset - clientHeight / 2)) / clientHeight,
        }));
      } else if (
        scrollAreaOffset >= clientHeight &&
        scrollAreaOffset < clientHeight + 2000
      ) {
        setBg3Translate((pre) => ({
          ...pre,
          x: -50 + (150 * (scrollAreaOffset - clientHeight)) / 2000,
        }));
        setBg7Translate((pre) => ({
          ...pre,
          x: 100 - (100 * (scrollAreaOffset - clientHeight)) / 2000,
        }));

        setTitleStyle({
          scale: 30 - (29 * (scrollAreaOffset - clientHeight)) / 2000,
          opacity: 0 + (scrollAreaOffset - clientHeight) / 2000,
        });
      } else if (scrollAreaOffset >= clientHeight + 2000) {
        setTitleStyle({ opacity: 1, scale: 1 });
        setBg3Translate((pre) => ({
          x: 100,
          y: 0,
        }));
        setBg7Translate((pre) => ({
          x: 0,
          y: -70,
        }));
      }
    } else {
      setTitleStyle({ opacity: 0, scale: 1 });
      setIsSticky(false);
    }
  }, [currentScrollArea, clientHeight]);

  return (
    <Container>
      <Content isSticky={isStikcy}>
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
