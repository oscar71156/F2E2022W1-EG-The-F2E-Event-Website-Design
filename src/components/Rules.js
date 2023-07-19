import styled from "styled-components";
import { useContext, useEffect, useState, useMemo } from "react";
import LayoutContext from "../contexts/Layout";
import iconAwardLight from "../assets/icon/award_light.png";
import iconAwardTrophy from "../assets/icon/award_trophy.png";

import PageTitle from "./PageTitle";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: 550vh;
  }
`;

const FixedPageTitle = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    top: 0;
    position: fixed;
  }
`;
const Content = styled.div`
  padding: 40px 20px 60px;
  width: 100%;

  @media screen and (min-width: 600px) {
    padding: 40px 0 60px;
    width: fit-content;
    margin: 0 auto;
  }

  @media screen and (min-width: 1200px) {
    margin: 40px auto 0;
    position: fixed;
    top: 150px;
    left: 50%;
    width: 100%;
    max-width: 1200px;
    transform: translateX(calc(${(props) => "-50% + " + props.tStyle.x}));
    opacity: ${(props) => props.tStyle.opacity};
  }
`;

const TrophyContainer = styled.div`
  height: auto;
  width: 100%;
  aspect-ratio: 1;
  max-width: 375px;
  min-width: 200px;
  margin: 0 auto;
  background-image: url(${iconAwardLight});

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(${(props) => props.rotateDeg}deg);
  opacity: ${(props) => props.opacity};

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
    padding: 0 26px;
  }
  @media screen and (min-width: 1200px) {
    display: inline-block;
    opacity: 1;
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

const Award = styled.div`
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition: opacity ${(props) => (props.isShow ? "1s" : 0)};
  @media screen and (min-width: 1200px) {
    opacity: 1;
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

const ContentleftOutsideOffset = "-50vw - 50%";
const ContentRightOutsideOffset = "50vw + 50%";

const Rules = () => {
  const {
    currentScrollArea,
    clientHeight,
    screenWidth,
    getScreenInforByName,
    checkIsBelow,
  } = useContext(LayoutContext);
  const [contentStyle, setContentStyle] = useState({
    opacity: 0,
    x: ContentleftOutsideOffset,
  });

  const [isShowTitle, setIsShowTitle] = useState(false);
  const [isShowReview, setIsShowReview] = useState(false);
  const [isShowAward, setIsShowAward] = useState(false);
  const [trophyRotateDeg, setTrophyRotateDeg] = useState(0);
  const [trophyOpacity, setTrophyOpacity] = useState(0);

  const isBelowCurrentArea = useMemo(
    () => checkIsBelow("rules"),
    [checkIsBelow]
  );

  /*
    In latop screen
      100vh show title
      150vh ~ 450vh 
        content x(tStyle.x) -50vw-50% => 50vh+50%
        trophyRotate four turns
      150vh ~ 300vh
        content fade in => opacity 0->1
      300vh ~ 450vh
        content fade out=> opacity 1->0
      550vh(outside)
        hide title
   */
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    let showTitle = false,
      showReviewM = false,
      showAwardM = false,
      trophyOpaM = 0,
      contentTStyle = { opacity: 0, x: ContentleftOutsideOffset },
      trophyRotateDegT = 0;
    if (scrollAreaName === "rules") {
      if (screenWidth < 1200) {
        const { height: scrollAreaHeight } = getScreenInforByName("rules");
        if (scrollAreaOffset > 0 && scrollAreaOffset < scrollAreaHeight) {
          trophyRotateDegT = (scrollAreaOffset * scrollAreaHeight) / 7200;
        }
        if (scrollAreaOffset > 100 && scrollAreaOffset <= 420) {
          showTitle = true;
          trophyOpaM = (scrollAreaOffset - 100) / 320;
        } else if (scrollAreaOffset > 420 && scrollAreaOffset <= 640) {
          showTitle = true;
          trophyOpaM = 1;
          showReviewM = true;
        } else if (scrollAreaOffset > 640) {
          showTitle = true;
          trophyOpaM = 1;
          showReviewM = true;
          showAwardM = true;
        }
      } else {
        if (
          scrollAreaOffset > clientHeight &&
          scrollAreaOffset <= (clientHeight * 3) / 2
        ) {
          showTitle = true;
        } else if (
          scrollAreaOffset > (clientHeight * 3) / 2 &&
          scrollAreaOffset <= (clientHeight * 9) / 2
        ) {
          showTitle = true;
          trophyRotateDegT =
            (((scrollAreaOffset - (clientHeight * 3) / 2) / clientHeight) *
              360 *
              4) /
            3;
          const contentStyleXNum =
            -50 +
            (100 * (scrollAreaOffset - (clientHeight * 3) / 2)) /
              clientHeight /
              3;

          let contentOpacity = 0;
          if (
            scrollAreaOffset > (clientHeight * 3) / 2 &&
            scrollAreaOffset <= clientHeight * 3
          ) {
            contentOpacity =
              0 +
              (((scrollAreaOffset - (clientHeight * 3) / 2) / clientHeight) *
                2) /
                3;
          } else {
            contentOpacity =
              1 -
              (((scrollAreaOffset - clientHeight * 3) / clientHeight) * 2) / 3;
          }
          contentTStyle = {
            ...contentTStyle,
            opacity: contentOpacity,
            x: `${contentStyleXNum}% + ${contentStyleXNum}vw`,
          };
        } else if (scrollAreaOffset > (clientHeight * 9) / 2) {
          contentTStyle = {
            ...contentTStyle,
            opacity: 0,
            x: ContentRightOutsideOffset,
          };
        }
      }
    } else {
      if (screenWidth < 1200) {
        if (isBelowCurrentArea) {
          showTitle = true;
          trophyOpaM = 1;
          showReviewM = true;
          showAwardM = true;
        }
      } else {
        if (isBelowCurrentArea) {
          contentTStyle = {
            opacity: 0,
            x: ContentRightOutsideOffset,
          };
        } else {
        }
        contentTStyle = {
          opacity: 0,
          x: ContentleftOutsideOffset,
        };
      }
    }
    setIsShowTitle(showTitle);
    setTrophyOpacity(trophyOpaM);
    setIsShowReview(showReviewM);
    setIsShowAward(showAwardM);
    setContentStyle(contentTStyle);
    setTrophyRotateDeg(trophyRotateDegT);
  }, [currentScrollArea, clientHeight, screenWidth]);
  return (
    <Container id="rules">
      <FixedPageTitle titleText="還有比賽等著你!" isShow={isShowTitle} />
      <Content tStyle={contentStyle}>
        <TrophyContainer rotateDeg={trophyRotateDeg} opacity={trophyOpacity} />
        <Description>
          <Award isShow={isShowReview}>
            <AwardTitle>評審機制</AwardTitle>
            <AwardDetail>
              初選： 將由六角學院前端、UI 評審進行第一波篩選。
              <br />
              決選： 由六角學院與贊助廠商討論，進行最後篩選，並於 12/30(五)
              由評審進行直播公布名單！
            </AwardDetail>
          </Award>
          <Award isShow={isShowAward}>
            <AwardTitle>獎項</AwardTitle>
            <AwardItems>
              <AwardItem>初選佳作 共六十位 數位獎狀</AwardItem>
              <AwardItem>個人企業獎 共六位 NTD 3,000 /位</AwardItem>
              <AwardItem>團體企業獎 共三組 NTD 10,000 /組</AwardItem>
              <AwardItem>以上皆提供完賽數位獎狀</AwardItem>
            </AwardItems>
          </Award>
        </Description>
      </Content>
    </Container>
  );
};

export default Rules;
