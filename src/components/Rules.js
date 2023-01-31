import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import LayoutContext from "../contexts/Layout";
import iconAwardLight from "../assets/award_light.png";
import iconAwardTrophy from "../assets/award_trophy.png";

import PageTitle from "./PageTitle";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: 300vh;
  }
`;

const StickyPageTitle = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    top: 0;
    position: ${(props) => (props.isSticky ? "sticky" : "relative")};
  }
`;
const Content = styled.div`
  padding: 40px 20px 60px;
  width: 100%;

  @media screen and (min-width: 600px) {
    padding: 40px 0 60px;
    width: min-content;
    margin: 0 auto;
  }
  @media screen and (min-width: 1200px) {
    width: max-content;
    margin: 40px auto 0;
    position: ${(props) => (props.isSticky ? "sticky" : "relative")};
    position: sticky;
    top: 200px;
    transform: translateX(${(props) => props.tStyle.x}px);
    opacity: ${(props) => props.tStyle.opacity};
  }
`;

const TrophyContainer = styled.div`
  height: 375px;
  width: 375px;
  margin: 0 auto;
  background-image: url(${iconAwardLight});

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(${(props) => props.rotateDeg}deg);
  &::before {
    content: "";
    height: 100%;
    width: 100%;
    display: block;
    background-image: url(${iconAwardTrophy});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: rotate(${(props) => -props.rotateDeg}deg);
    @media screen and (min-width: 1200px) {
      transform: none;
    }
  }
  @media screen and (min-width: 600px) {
    box-sizing: content-box;
    padding: 0 51px;
  }
  @media screen and (min-width: 1200px) {
    display: inline-block;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  @media screen and (min-width: 1200px) {
    display: inline-block;
    vertical-align: top;
  }
`;

const AwardTitle = styled.h4`
  letter-spacing: 0.05em;
  font-weight: 700;
  font-size: 32px;
  color: var(--highlight-color-default);
  margin: 24px 0;
`;
const AwardDetail = styled.p`
  color: var(--primary-color-default);
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  letter-spacing: 0.05em;
  margin: 0;
`;

const AwardItems = styled.ol`
  color: var(--primary-color-default);
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  letter-spacing: 0.05em;
  margin: 0;
  padding-left: 30px;
`;
const AwardItem = styled.li``;

const Rules = () => {
  const { currentScrollArea, clientHeight, screenWidth, getScreenInforByName } =
    useContext(LayoutContext);
  const [contentStyle, setContentStyle] = useState({
    opacity: 0,
    x: -300,
  });
  const [trophyRotateDeg, setTrophyRotateDeg] = useState(0);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    if (scrollAreaName === "rules") {
      if (screenWidth > 1200) {
        setIsSticky(true);
        if (scrollAreaOffset < clientHeight / 2) {
          setContentStyle({ opacity: 0, x: -300 });
          setTrophyRotateDeg(0);
        } else if (
          scrollAreaOffset >= clientHeight / 2 &&
          scrollAreaOffset < (clientHeight * 3) / 2
        ) {
          setContentStyle({
            opacity: 0 + (scrollAreaOffset - clientHeight / 2) / clientHeight,
            x:
              -300 +
              (300 * (scrollAreaOffset - clientHeight / 2)) / clientHeight,
          });
          setTrophyRotateDeg(
            ((scrollAreaOffset - clientHeight / 2) / clientHeight) * 720
          );
        } else if (
          scrollAreaOffset >= (clientHeight * 3) / 2 &&
          scrollAreaOffset < clientHeight * 2
        ) {
          setContentStyle({
            opacity: 1,
            x: 0,
          });
          setTrophyRotateDeg(0);
        } else if (
          scrollAreaOffset >= clientHeight * 2 &&
          scrollAreaOffset < clientHeight * 3
        ) {
          setContentStyle({
            opacity: 1 - (scrollAreaOffset - clientHeight * 2) / clientHeight,
            x: 0 + (300 * (scrollAreaOffset - clientHeight * 2)) / clientHeight,
          });
          setTrophyRotateDeg(
            ((scrollAreaOffset - clientHeight * 2) / clientHeight) * 720
          );
        } else {
          setContentStyle({
            opacity: 0,
            x: 0,
          });
          setTrophyRotateDeg(0);
        }
      } else {
        const { scrollStart, scrollEnd } = getScreenInforByName("rules");
        const currentScrollAreaHeight = scrollEnd - scrollStart;
        if (
          scrollAreaOffset > 0 &&
          scrollAreaOffset < currentScrollAreaHeight
        ) {
          setTrophyRotateDeg(
            (scrollAreaOffset * currentScrollAreaHeight) / 7200
          );
        }
      }
    } else {
      if (screenWidth > 1200) {
        setIsSticky(false);
        setContentStyle({
          opacity: 0,
          x: 0,
        });
      } else {
      }
    }
  }, [currentScrollArea, clientHeight, screenWidth]);
  return (
    <Container id="rules">
      <StickyPageTitle titleText="還有比賽等著你!" isSticky={isSticky} />
      <Content tStyle={contentStyle} isSticky={isSticky}>
        <TrophyContainer rotateDeg={trophyRotateDeg} />
        <Description>
          <AwardTitle>評審機制</AwardTitle>
          <AwardDetail>
            初選： 將由六角學院前端、UI 評審進行第一波篩選。
            <br />
            決選： 由六角學院與贊助廠商討論，進行最後篩選，並於 12/30(五)
            由評審進行直播公布名單！
          </AwardDetail>
          <AwardTitle>獎項</AwardTitle>
          <AwardItems>
            <AwardItem>初選佳作 共六十位 數位獎狀</AwardItem>
            <AwardItem>個人企業獎 共六位 NTD 3,000 /位</AwardItem>
            <AwardItem>團體企業獎 共三組 NTD 10,000 /組</AwardItem>
            <AwardItem>以上皆提供完賽數位獎狀</AwardItem>
          </AwardItems>
        </Description>
      </Content>
    </Container>
  );
};

export default Rules;
