import styled from "styled-components";
import PageTitle from "./PageTitle";
import iconEnvious from "../assets/icon/question_1.png";
import iconWish from "../assets/icon/question_2.png";
import iconComplex from "../assets/icon/question_3.png";
import iconBgDecorate9 from "../assets/icon/bg/bg_decorate_09.png";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  background-color: red;
  @media screen and (min-width: 1200px) {
    position: relative;
    top: 0;
    /**Three role types animations(3*300) + reserve spave for showing Competiton(600) */
    height: calc(100vh + 1200px);

    /**cut overflow part */
    clip-path: inset(0 0 0 0);

    ${
      "" /* > * {
      top: 0;
      position: ${(props) => (props.isChildSticky ? "fixed" : "relative")};
    } */
    }
  }
`;

const QuestionsCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 60px;
  @media screen and (min-width: 1200px) {
    top: ${(props) => (props.isSticky ? "130px" : 0)};
    padding-top: 100px;
    flex-direction: row;
    justify-content: center;
  }
`;

const Question = styled.div`
  transition: transform 1.2s, opacity 1s 0.5s;
  ${"" /* opacity: ${(props) => (props.isShow ? 1 : 0)}; */}
  @media screen and (min-width: 1200px) {
    transition: transform 1s, opacity 1s 0.2s;
    flex: 1;
    max-width: 412px;
    text-align: center;
    margin: 0 10px;
  }
`;
const QuestionEnvious = styled(Question)`
  ${"" /* transform: translateX(${(props) => (props.isShow ? 0 : -150)}%); */}
  @media screen and (min-width: 1200px) {
    transform: translateX(${(props) => (props.isShow ? 0 : -150)}%);
    perspective-origin: right center;
    perspective: 900px;
  }
`;
const QuestionWish = styled(Question)``;
const QuestionComplex = styled(Question)`
  ${"" /* transform: translateX(${(props) => (props.isShow ? 0 : 150)}%); */}
  @media screen and (min-width: 1200px) {
    perspective-origin: left center;
    perspective: 900px;
  }
`;

const QuestionText = styled.h4`
  margin: 0;
  text-align: center;
  color: var(--highlight-color-default);
  padding: 8.5px 0px;
  @media screen and (min-width: 1200px) {
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  width: 335px;
  height: 262px;
  display: inline-block;
  @media screen and (min-width: 1200px) {
    width: 100%;
    height: auto;
  }
`;

const ImageEnvious = styled(Image)`
  @media screen and (min-width: 1200px) {
    transform: rotateY(45deg);
    transform-origin: right bottom;
  }
`;
const ImageComplex = styled(Image)`
  @media screen and (min-width: 1200px) {
    transform: rotateY(-45deg);
    transform-origin: left bottom;
  }
`;

const ImageBgDecorate9 = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;
    width: 150px;
    position: fixed;
    bottom: 0;
    top: initial;
  }
`;

const LBgD9 = styled(ImageBgDecorate9)`
  display: none;
  @media screen and (min-width: 1430px) {
    display: block;
    visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
    left: calc(50vw - 450px);
    bottom: -20px;
    transform: translateX(${(props) => props.tStyle.XOffset}px)
      translateY(${(props) => props.tStyle.YOffset}px)
      scale(${(props) => props.tStyle.scale});
  }
`;

const RBgD9 = styled(ImageBgDecorate9)`
  display: none;
  @media screen and (min-width: 1430px) {
    visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
    display: block;
    right: calc(50vw - 450px);
    bottom: -20px;
    transform: translateX(${(props) => props.tStyle.XOffset}px)
      translateY(${(props) => props.tStyle.YOffset}px)
      scale(${(props) => props.tStyle.scale});
  }
`;

/**
  Height: 100vh + 300*3px + 300px
  
  100vh=> show title and zoom out Competition
  
  300*3 => for each three roles types showingss

  300 => preserve space for showing Competitison and make content disappear
 */

const Botheryou = () => {
  const [isShowTitle, setIsShowTitle] = useState(false);
  const [isShowEnvious, setIsShowEnvious] = useState(false);
  const [isShowWish, setIsShowWish] = useState(false);
  const [isShowComplex, setIsShowComplex] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [LBgD9TStyle, setLBgD9TStyle] = useState({
    XOffset: 0,
    YOffset: 0,
    scale: 1,
  });
  const [isLBgVisible, setIsLBgVisible] = useState(false);
  const [RBgD9TStyle, setRBgD9TStyle] = useState({
    XOffset: 0,
    YOffset: 0,
    scale: 1,
  });
  const [isRBgVisible, setIsRBgVisible] = useState(false);

  const { clientHeight, currentScrollArea, screenWidth } =
    useContext(LayoutContext);

  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (scrollAreaName === "botherYou") {
      if (screenWidth < 1200) {
        let showTitle = false,
          showEnvious = false,
          showWish = false,
          showComplex = false;
        // if (scrollAreaOffset >= 10 && scrollAreaOffset < 400) {
        //   showTitle = true;
        // } else if (scrollAreaOffset >= 400 && scrollAreaOffset < 700) {
        //   showTitle = true;
        //   showEnvious = true;
        // } else if (scrollAreaOffset >= 700 && scrollAreaOffset < 1000) {
        //   showTitle = true;
        //   showEnvious = true;
        //   showWish = true;
        // } else if (scrollAreaOffset >= 1000) {
        showTitle = true;
        showEnvious = true;
        showWish = true;
        showComplex = true;
        // }
        setIsShowTitle(showTitle);
        setIsShowEnvious(showEnvious);
        setIsShowComplex(showComplex);
        setIsShowWish(showWish);
      } else {
        /**
         *
         * scrollAreaOffset
         * 2/3vh => show title
         * 300+vh => show Envious Area
         * 600+vh => show Wish Area
         * 900+vh => show Complext Area
         */
        setIsSticky(true);
        if (scrollAreaOffset < (clientHeight / 3) * 2) {
          setIsShowTitle(false);
        } else if (scrollAreaOffset >= (clientHeight / 3) * 2) {
          setIsShowTitle(true);
        }
        if (scrollAreaOffset < clientHeight + 300) {
          setIsShowEnvious(false);
          setIsShowWish(false);
          setIsShowComplex(false);
          setIsLBgVisible(true);
          setIsRBgVisible(true);
          setLBgD9TStyle({ XOffset: 0, YOffset: 0, scale: 1 });
          setRBgD9TStyle({ XOffset: 0, YOffset: 0, scale: 1 });
        } else if (
          scrollAreaOffset >= clientHeight + 300 &&
          scrollAreaOffset < clientHeight + 600
        ) {
          setIsShowEnvious(true);

          setLBgD9TStyle({ XOffset: 100, YOffset: 5, scale: 0.5 });
          setRBgD9TStyle({ XOffset: -100, YOffset: 5, scale: 0.5 });
        } else if (
          scrollAreaOffset >= clientHeight + 600 &&
          scrollAreaOffset < clientHeight + 900
        ) {
          setIsShowWish(true);
          setLBgD9TStyle({ XOffset: 200, YOffset: -10, scale: 0.5 });
          setRBgD9TStyle({ XOffset: -200, YOffset: -10, scale: 0.5 });
          setIsLBgVisible(true);
          setIsRBgVisible(true);
        } else if (scrollAreaOffset >= clientHeight + 900) {
          setIsLBgVisible(false);
          setIsRBgVisible(false);
          setIsShowEnvious(true);
          setIsShowWish(true);
          setIsShowComplex(true);
        }
      }
    } else {
      setIsSticky(false);
    }
  }, [clientHeight, currentScrollArea, screenWidth]);
  return (
    <Container isChildSticky={isSticky} id="botherYou">
      <PageTitle isShow={isShowTitle} titleText={"你是否也有以下困擾？"} />
      <QuestionsCon isSticky={isSticky}>
        <QuestionEnvious isShow={isShowEnvious}>
          <QuestionText>羨慕別人的酷酷網頁動畫?</QuestionText>
          <ImageEnvious src={iconEnvious} />
        </QuestionEnvious>
        <QuestionWish isShow={isShowWish}>
          <QuestionText>滿足不了同事的許願?</QuestionText>
          <Image src={iconWish} />
        </QuestionWish>
        <QuestionComplex isShow={isShowComplex}>
          <QuestionText>動畫技能數太雜無從下手?</QuestionText>
          <ImageComplex src={iconComplex} />
        </QuestionComplex>
      </QuestionsCon>
      <LBgD9
        src={iconBgDecorate9}
        tStyle={LBgD9TStyle}
        isVisible={isLBgVisible}
      />
      <RBgD9
        src={iconBgDecorate9}
        tStyle={RBgD9TStyle}
        isVisible={isRBgVisible}
      />
    </Container>
  );
};

export default Botheryou;
