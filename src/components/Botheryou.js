import styled from "styled-components";
import PageTitle from "./PageTitle";
import iconEnvious from "../assets/question_1.png";
import iconWish from "../assets/question_2.png";
import iconComplex from "../assets/question_3.png";
import iconBgDecorate9 from "../assets/bg_decorate_09.png";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: 100vh;
    position: relative;
    top: 0;
    /**Three role types animations(3*300) + reserve spave for showing Competiton(600) */
    height: calc(100vh + 1200px);

    /**cut overflow part */
    clip-path: inset(0 0 0 0);

    > * {
      top: 0;
      position: ${(props) => (props.isChildSticky ? "sticky" : "relative")};
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
  @media screen and (min-width: 1200px) {
    flex: 1;
    max-width: 412px;
    text-align: center;
    margin: 0 10px;
    transition: transform 1s, opacity 1s 0.2s;
    opacity: ${(props) => (props.isShow ? 1 : 0)};
  }
`;
const QuestionEnvious = styled(Question)`
  @media screen and (min-width: 1200px) {
    transform: translateX(${(props) => (props.isShow ? 0 : -150)}%);
    perspective-origin: right center;
    perspective: 900px;
  }
`;
const QuestionWish = styled(Question)``;
const QuestionComplex = styled(Question)`
  @media screen and (min-width: 1200px) {
    transform: translateX(${(props) => (props.isShow ? 0 : 150)}%);
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
  left: 200px;
  @media screen and (min-width: 1430px) {
    left: 0;
  }
`;

const RBgD9 = styled(ImageBgDecorate9)`
  right: 0;
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
  const { clientHeight, currentScrollArea } =
    useContext(LayoutContext);

  /**
   *
   * scrollAreaOffset
   * 2/3vh => show title
   * 300+vh => show Envious Area
   * 600+vh => show Wish Area
   * 900+vh => show Complext Area
   */
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (scrollAreaName === "botherYou") {
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
      } else if (
        scrollAreaOffset >= clientHeight + 300 &&
        scrollAreaOffset < clientHeight + 600
      ) {
        setIsShowEnvious(true);
      } else if (
        scrollAreaOffset >= clientHeight + 600 &&
        scrollAreaOffset < clientHeight + 900
      ) {
        setIsShowWish(true);
      } else if (scrollAreaOffset >= clientHeight + 900) {
        setIsShowEnvious(true);
        setIsShowWish(true);
        setIsShowComplex(true);
      }
    } else {
      setIsSticky(false);
    }
  }, [ clientHeight, currentScrollArea]);
  return (
    <Container isChildSticky={isSticky}>
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
      <LBgD9 src={iconBgDecorate9} />
      <RBgD9 src={iconBgDecorate9} />
    </Container>
  );
};

export default Botheryou;
