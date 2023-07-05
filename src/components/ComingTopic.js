import styled from "styled-components";
import PageTitle from "./PageTitle";
import iconWeek1 from "../assets/icon/week_1.png";
import iconWeek2 from "../assets/icon/week_2.png";
import iconWeek3 from "../assets/icon/week_3.png";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(200vh + 700px);
    position: relative;
  }
`;

const FixedPageTitle = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    top: 0;
    position: fixed;
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

    /**Wiat for competition animation compeletely */
    transform: translateY(100vh);
  }
  @media screen and (min-width: 1800px) {
    padding: 0 240px;
  }
`;

const Week = styled.div`
  text-align: center;
  margin: 20px 0;
  opacity: ${(props) => props.opacity};
  transition: opacity 1.5s;
  @media screen and (min-width: 1200px) {
    transition: none;
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
    let showTitle = false,
      week1Opa = 0,
      week2Opa = 0,
      week3Opa = 0;
    if (scrollAreaName === "comingTopic") {
      if (screenWidth < 1200) {
        if (scrollAreaOffset >= 100 && scrollAreaOffset < 400) {
          showTitle = true;
        } else if (scrollAreaOffset >= 400 && scrollAreaOffset < 900) {
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
      } else {
        /**
         *  scrollAreaOffset
         *  100vh => show title(height 350px)
         *  100vh + WeeksPart/4 =>  start to show week1
         *  100vh + WeeksPart*3/4 => show week1 compeletely
         *  100vh + WeeksPart + titleMarginBottom(40)  => start to hide week1
         *  100vh + WeeksPart+ titleMarginBottom(40) + title/2 => hide week1 compeletely
         *
         *  week1 + 260 (height of one week) => week2 + 260 (height of one week) => week3
         *
         *  100vh + WeeksPart + 3 * 260 (height of one week)  => show title(height 350px)
         *
         *  WeeksPart(the remaining part which weeks would be showed): 100vh - 350(title height)
         */

        const weeksPartHeight = clientHeight - 350;
        const pageTitleHeight = 350;
        const pageTitleMarginBH = 40;
        const oneWeekHeight = 260;
        if (
          scrollAreaOffset >= clientHeight &&
          scrollAreaOffset < clientHeight + weeksPartHeight + 3 * oneWeekHeight
        ) {
          showTitle = true;
        }

        const week1StartEmergePoint = clientHeight + weeksPartHeight / 4;
        const week1EndEmergePoint = clientHeight + (weeksPartHeight * 3) / 4;
        const week1StartFadePoint =
          clientHeight + weeksPartHeight + pageTitleMarginBH;
        const week1EndFadePoint =
          clientHeight +
          weeksPartHeight +
          pageTitleMarginBH +
          pageTitleHeight / 2;

        if (
          scrollAreaOffset >= week1StartEmergePoint &&
          scrollAreaOffset < week1EndEmergePoint
        ) {
          week1Opa =
            (scrollAreaOffset - week1StartEmergePoint) /
            (week1EndEmergePoint - week1StartEmergePoint);
        } else if (
          scrollAreaOffset >= week1EndEmergePoint &&
          scrollAreaOffset < week1StartFadePoint
        ) {
          week1Opa = 1;
        } else if (
          scrollAreaOffset >= week1StartFadePoint &&
          scrollAreaOffset < week1EndFadePoint
        ) {
          week1Opa =
            1 -
            (scrollAreaOffset - week1StartFadePoint) /
              (week1EndFadePoint - week1StartFadePoint);
        }

        const week2StartEmergePoint = week1StartEmergePoint + oneWeekHeight;
        const week2EndEmergePoint = week1EndEmergePoint + oneWeekHeight;
        const week2StartFadePoint = week1StartFadePoint + oneWeekHeight;
        const week2EndFadePoint = week1EndFadePoint + oneWeekHeight;
        if (
          scrollAreaOffset >= week2StartEmergePoint &&
          scrollAreaOffset < week2EndEmergePoint
        ) {
          week2Opa =
            (scrollAreaOffset - week2StartEmergePoint) /
            (week2EndEmergePoint - week2StartEmergePoint);
        } else if (
          scrollAreaOffset >= week2EndEmergePoint &&
          scrollAreaOffset < week2StartFadePoint
        ) {
          week2Opa = 1;
        } else if (
          scrollAreaOffset >= week2StartFadePoint &&
          scrollAreaOffset < week2EndFadePoint
        ) {
          week2Opa =
            1 -
            (scrollAreaOffset - week2StartFadePoint) /
              (week2EndFadePoint - week2StartFadePoint);
        }

        const week3StartEmergePoint = week2StartEmergePoint + oneWeekHeight;
        const week3EndEmergePoint = week2EndEmergePoint + oneWeekHeight;
        const week3StartFadePoint = week2StartFadePoint + oneWeekHeight;
        const week3EndFadePoint = week2EndFadePoint + oneWeekHeight;
        if (
          scrollAreaOffset >= week3StartEmergePoint &&
          scrollAreaOffset < week3EndEmergePoint
        ) {
          week3Opa =
            (scrollAreaOffset - week3StartEmergePoint) /
            (week3EndEmergePoint - week3StartEmergePoint);
        } else if (
          scrollAreaOffset >= week3EndEmergePoint &&
          scrollAreaOffset < week3StartFadePoint
        ) {
          week3Opa = 1;
        } else if (
          scrollAreaOffset >= week3StartFadePoint &&
          scrollAreaOffset < week3EndFadePoint
        ) {
          week3Opa =
            1 -
            (scrollAreaOffset - week3StartFadePoint) /
              (week3EndFadePoint - week3StartFadePoint);
        }
      }
    }
    setIsShowTitle(showTitle);
    setWeek1Opacity(week1Opa);
    setWeek2Opacity(week2Opa);
    setWeek3Opacity(week3Opa);
  }, [clientHeight, currentScrollArea, screenWidth]);

  return (
    <Container id="comingTopic">
      <FixedPageTitle
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
