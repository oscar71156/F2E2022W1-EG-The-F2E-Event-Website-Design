import styled from "styled-components";
import PageTitle from "./PageTitle";
import iconWeek1 from "../assets/icon/week_1.png";
import iconWeek2 from "../assets/icon/week_2.png";
import iconWeek3 from "../assets/icon/week_3.png";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 1040px);
    position: relative;
  }
`;

const StickyPageTitle = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    top: 0;
    position: sticky;
  }
`;

const Weeks = styled.div`
  @media screen and (min-width: 1200px) {
    position: static;
    flex-direction: column;

    display: flex;
    width: 100%;
    padding: 0 40px;
    margin: 0 auto 100px;
    padding: 0 200px;

    /**For delay scroll disappearing */
    transform: translateY(130px);
  }
  @media screen and (min-width: 1800px) {
    padding: 0 240px;
  }
`;

const Week = styled.div`
  text-align: center;
  margin: 20px 0;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s;
  @media screen and (min-width: 1200px) {
    transition: opacity 0.1s;
    margin: 0;
    text-align: left;
  }
`;

const Week1 = styled(Week)`
  @media screen and (min-width: 1200px) {
    align-self: flex-start;
  }
`;

const Week2 = styled(Week)`
  @media screen and (min-width: 1200px) {
    align-self: flex-end;
    text-align: right;

    /* for image order */
    display: flex;
    align-items: center;
  }
`;

const Week3 = styled(Week)`
  @media screen and (min-width: 1200px) {
    align-self: flex-start;
  }
`;

const ImageWeek = styled.img`
  width: auto;
  height: 135px;
  margin: 4px 0;
  @media screen and (min-width: 1200px) {
    display: inline-block;
    height: 190px;
    &.imageWeek2 {
      order: 1;
    }
  }
`;
const WeekContent = styled.div`
  @media screen and (min-width: 1200px) {
    display: inline-block;
  }
`;

const WeekTitle = styled.h2`
  color: var(--highlight-color-default);
  margin: 4px 0;
`;
const WeekName = styled.h3`
  color: var(--primary-color-default);
  margin: 4px 0;
`;

const Keywords = styled.div`
  display: inline-block;
  width: 100%;
  @media screen and (min-width: 1200px) {
    display: inline-block;
  }
`;

const Keyword = styled.span`
  display: block;
  font-size: 18px;
  color: var(--secondary-color-dark);
  line-height: 140%;
  font-weight: 700;
  border: 2px solid currentcolor;
  border-radius: 60px;
  width: fit-content;
  padding: 4px 24px;
  margin: 5px auto;
  @media screen and (min-width: 1200px) {
    display: inline-block;
  }
`;

const WeekBTN = styled.button`
  background-color: var(--secondary-color-dark);
  border-radius: 60px;
  padding: 4px 24px;
  font-size: 18px;
  color: white;
  font-family: inherit;
  margin: 10px 0;
`;

const ComingTopic = () => {
  const [isShowTitle, setIsShowTitle] = useState(false);
  const [week1Opacity, setWeek1Opacity] = useState(1);
  const [week2Opacity, setWeek2Opacity] = useState(1);
  const [week3Opacity, setWeek3Opacity] = useState(1);

  const { clientHeight, currentScrollArea, screenWidth } =
    useContext(LayoutContext);

  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    if (scrollAreaName === "comingTopic") {
      if (screenWidth < 1200) {
        let showTitle = false,
          week1Opa = 0,
          week2Opa = 0,
          week3Opa = 0;

        if (scrollAreaOffset > 10 && scrollAreaOffset < 500) {
          showTitle = true;
        } else if (scrollAreaOffset >= 500 && scrollAreaOffset < 900) {
          showTitle = true;
          week1Opa = 1;
        } else if (scrollAreaOffset >= 900 && scrollAreaOffset < 1200) {
          showTitle = true;
          week1Opa = 1;
          week2Opa = 1;
        } else if (scrollAreaOffset >= 1200) {
          showTitle = true;
          week1Opa = 1;
          week2Opa = 1;
          week3Opa = 1;
        }
        setIsShowTitle(showTitle);
        setWeek1Opacity(week1Opa);
        setWeek2Opacity(week2Opa);
        setWeek3Opacity(week3Opa);
      } else {
        if (
          scrollAreaOffset >= (3 * clientHeight) / 4 &&
          scrollAreaOffset <= clientHeight + 1040
        ) {
          setIsShowTitle(true);
        }

        if (scrollAreaOffset < clientHeight) {
          setWeek1Opacity(0);
          setWeek2Opacity(0);
          setWeek3Opacity(0);
        } else if (
          scrollAreaOffset >= clientHeight &&
          scrollAreaOffset <= clientHeight + 260
        ) {
          setWeek1Opacity(
            (260 * (scrollAreaOffset - clientHeight)) / clientHeight
          );
        } else if (
          scrollAreaOffset >= clientHeight + 260 &&
          scrollAreaOffset <= clientHeight + 520
        ) {
          setWeek1Opacity(
            1 - (260 * (scrollAreaOffset - clientHeight - 260)) / clientHeight
          );
          setWeek2Opacity(
            (260 * (scrollAreaOffset - clientHeight - 260)) / clientHeight
          );
        } else if (
          scrollAreaOffset >= clientHeight + 520 &&
          scrollAreaOffset <= clientHeight + 780
        ) {
          setWeek2Opacity(
            (1 - 520 * (scrollAreaOffset - clientHeight - 520)) / clientHeight
          );
          setWeek3Opacity(
            (520 * (scrollAreaOffset - clientHeight - 520)) / clientHeight
          );
        } else if (
          scrollAreaOffset >= clientHeight + 780 &&
          scrollAreaOffset <= clientHeight + 1040
        ) {
          setWeek3Opacity(
            (1 - 780 * (scrollAreaOffset - clientHeight - 780)) / clientHeight
          );
        }
      }
    } else {
      if (screenWidth < 1200) {
      } else {
        setIsShowTitle(false);
        setWeek1Opacity(0);
        setWeek2Opacity(0);
        setWeek3Opacity(0);
      }
    }
  }, [clientHeight, currentScrollArea, screenWidth]);

  return (
    <Container id="comingTopic">
      <StickyPageTitle
        titleText="年度最強合作，三大主題來襲"
        secondTitleText="各路廠商強強聯手<br/>共同設計出接地氣的網頁互動挑戰關卡"
        isShow={isShowTitle}
      />
      <Weeks>
        <Week1 opacity={week1Opacity}>
          <ImageWeek src={iconWeek1} />
          <WeekContent>
            <WeekTitle>WEEK 1</WeekTitle>
            <WeekName>The F2E 活動網站設計</WeekName>
            <Keywords>
              <Keyword>Parallax Scrolling</Keyword>
              <Keyword>#板塊設計</Keyword>
            </Keywords>
            <WeekBTN>查看關卡細節</WeekBTN>
          </WeekContent>
        </Week1>
        <Week2 opacity={week2Opacity}>
          <ImageWeek className="imageWeek2" src={iconWeek2} />
          <WeekContent>
            <WeekTitle>WEEK 2</WeekTitle>
            <WeekName>今晚，我想來點點簽</WeekName>
            <Keywords>
              <Keyword>Canvas</Keyword>
              <Keyword>#凱鈿行動科技</Keyword>
            </Keywords>
            <WeekBTN>查看關卡細節</WeekBTN>
          </WeekContent>
        </Week2>
        <Week3 opacity={week3Opacity}>
          <ImageWeek className="week3" src={iconWeek3} />
          <WeekContent>
            <WeekTitle>WEEK 3</WeekTitle>
            <WeekName>Scrum 新手村</WeekName>
            <Keywords>
              <Keyword>JS draggable</Keyword>
              <Keyword>#鈦坦科技</Keyword>
            </Keywords>
            <WeekBTN>查看關卡細節</WeekBTN>
          </WeekContent>
        </Week3>
      </Weeks>
    </Container>
  );
};
export default ComingTopic;
