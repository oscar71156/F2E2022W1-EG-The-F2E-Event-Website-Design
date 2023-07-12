import styled from "styled-components";
import iconDateStart from "../assets/icon/date_start.png";
import iconDateUpload from "../assets/icon/date_upload.png";
import iconDateLine from "../assets/icon/date_line.png";
import iconWeekLine from "../assets/icon/date_weekLine.png";
import PageTitle from "./PageTitle";
import JoinButton from "./Join";
import { useContext, useEffect, useState, useMemo } from "react";
import LayoutContext from "../contexts/Layout";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(200vh + 2500px);
  }
`;

const PageTitleM = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;
const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (min-width: 1200px) {
    transform: translateY(100px) translateX(-50%);
    position: fixed;
    top: 0;
    left: 50%;
  }
  @media screen and (min-width: 1800px) {
    transform: translateY(20px) translateX(-50%);
  }
`;

const Schedules = styled.div`
  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: space-around;
  }
`;

const ActionTitle = styled.h2`
  color: var(--highlight-color-default);
  margin: 15px 0 12px;
`;

const Date = styled.div`
  display: inline-block;
  background-color: var(--primary-color-default);
  color: white;
  line-height: 140%;
  font-weight: 700;
  padding: 8px 28px;
  border-radius: 50px;
`;

const Information = styled.h5`
  color: var(--secondary-color-dark);
  margin: 12px 0 0;
`;

const InfoAdditional = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--highlight-color-default);
`;

const DateLine = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;
    width: ${(props) => props.width}%;
    height: 100px;
    transform: translateY(65px);
    overflow: hidden;
  }
`;

const ImageDateLine = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;
    height: 100%;
  }
`;

const Schedule = styled.div`
  padding: 60px 0 20px;
  text-align: center;
  opacity: ${(props) => props.opacity};
  transition: opacity ${(props) => (props.opacity === 0 ? "0.5s" : "1.5s")};
  @media screen and (min-width: 1200px) {
    display: inline-block;
    position: relative;
    transition: none;
    /**originHeight*/
    opacity: initial;
    > * {
      opacity: ${(props) => props.opacity};
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      left: 0;
      margin: 0 auto;
      width: 32px;
      height: 140px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: cover;
      height: ${(props) => props.originHeight}px;
    }
  }
`;
const Signup = styled(Schedule)`
  @media screen and (min-width: 1200px) {
    position: relative;
    transform: translateY(${(props) => 150 - props.originHeight}px);

    &::after {
      background-image: url(${iconWeekLine});
      transform: translateY(40px);
    }
  }
`;

const Start = styled(Schedule)`
  @media screen and (min-width: 1200px) {
    transform: translateY(${(props) => 105 - props.originHeight}px);
    position: relative;

    &::after {
      background-image: url(${iconWeekLine});
    }
  }
`;

const ImageDateStart = styled.img`
  /**
  For align
  the same heigh as joinBTN
 */
  height: 140px;
  width: 140px;
  object-fit: contain;
  object-position: bottom;
  /**
  For align
 */
  display: block;
  margin: 0 auto;
`;

const Upload = styled(Schedule)`
  @media screen and (min-width: 1200px) {
    position: relative;
    transform: translateY(${(props) => 171 - props.originHeight}px);

    &::after {
      background-image: url(${iconWeekLine});
      background-size: 100%;
    }
  }
`;

const ImageDateUpload = styled.img`
  /**
  For align
  the same heigh as joinBTN
 */
  height: 140px;
  width: 140px;
  object-fit: contain;
  object-position: bottom;
  /**
  For align
 */
  display: block;
  margin: 0 auto;
`;

const ScheduleDate = () => {
  const [dateLineWidth, setDateLineWidth] = useState(0);
  const [isShowTitle, setIsShowTitle] = useState(false);
  const [signUpOriginHeight, setSignUpOriginHeight] = useState(0);
  const [signUpOpacity, setSignUpOpacity] = useState(0);
  const [startOriginHeight, setStartOriginHeight] = useState(0);
  const [startOpacity, setStartOpacity] = useState(0);
  const [uploadOriginHeight, setUploadOriginHeight] = useState(0);
  const [uploadOpacity, setUploadOpacity] = useState(0);

  const { currentScrollArea, clientHeight, screenWidth, checkIsBelow } =
    useContext(LayoutContext);

  /** 
   * 
   * In laptop screen
   * 1vh~ 2vh => dateLine grow
   * 2vh ~ 2vh + 300 => signUp origin grow 0=> 150
   * 2vh+300 ~ 2vh+700 => signUp opacity 0 => 1
   * 2vh+700 ~ 2vh +1000=>start origin grow 0=> 105
   * 2vh+700 ~ 2vh +1400=>start opacity 0 => 1
   * 2vh+1400 ~ 2vh +1700=>upload origin grow 0=> 171
   * 2vh+1700 ~ 2vh +2100=>upload opacity 0 => 1   */
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    let showTitle = false;
    let tDateLineWidth = 0;
    let tSignUpOriginHeight = 0;
    let tSignUpOpacity = 0;
    let tStartOriginHeight = 0;
    let tStartOpacity = 0;
    let tUploadOriginHeight = 0;
    let tUploadOpacity = 0;
    if (scrollAreaName === "scheduleDate") {
      if (screenWidth < 1200) {
        if (scrollAreaOffset >= 100 && scrollAreaOffset < 400) {
          showTitle = true;
        } else if (scrollAreaOffset >= 400 && scrollAreaOffset < 770) {
          showTitle = true;
          tSignUpOpacity = 1;
        } else if (scrollAreaOffset >= 770 && scrollAreaOffset < 1200) {
          showTitle = true;
          tSignUpOpacity = 1;
          tStartOpacity = 1;
        } else if (scrollAreaOffset >= 1200) {
          showTitle = true;
          tSignUpOpacity = 1;
          tStartOpacity = 1;
          tUploadOpacity = 1;
        }
      } else {
        if (scrollAreaOffset <= clientHeight) {
          tDateLineWidth = 0;
        } else if (
          scrollAreaOffset > clientHeight &&
          scrollAreaOffset <= 2 * clientHeight
        ) {
          const startPoint = clientHeight;
          tDateLineWidth =
            (100 * (scrollAreaOffset - startPoint)) / clientHeight;
        } else {
          tDateLineWidth = 100;
        }

        if (scrollAreaOffset <= 2 * clientHeight) {
          tSignUpOriginHeight = 0;
          tSignUpOriginHeight = 0;
          tSignUpOpacity = 0;
          tStartOriginHeight = 0;
          tStartOpacity = 0;
          tUploadOriginHeight = 0;
          tUploadOpacity = 0;
        } else if (
          scrollAreaOffset > 2 * clientHeight &&
          scrollAreaOffset <= clientHeight * 2 + 300
        ) {
          //height 0=> 150
          tSignUpOriginHeight = (scrollAreaOffset - 2 * clientHeight) * 0.5;
        } else if (
          scrollAreaOffset > 2 * clientHeight + 300 &&
          scrollAreaOffset <= clientHeight * 2 + 700
        ) {
          tSignUpOriginHeight = 150;

          //opacity 0 => 1
          tSignUpOpacity = (scrollAreaOffset - 2 * clientHeight - 300) * 0.0025;
        } else if (
          scrollAreaOffset > 2 * clientHeight + 700 &&
          scrollAreaOffset <= clientHeight * 2 + 1000
        ) {
          tSignUpOriginHeight = 150;
          tSignUpOpacity = 1;

          /**0 => 105 */
          tStartOriginHeight =
            0.35 * (scrollAreaOffset - 2 * clientHeight - 700);
        } else if (
          scrollAreaOffset > 2 * clientHeight + 1000 &&
          scrollAreaOffset <= clientHeight * 2 + 1400
        ) {
          tSignUpOriginHeight = 150;
          tSignUpOpacity = 1;
          tStartOriginHeight = 105;

          /**0=>1 */
          tStartOpacity = (scrollAreaOffset - 2 * clientHeight - 1000) * 0.0025;
        } else if (
          scrollAreaOffset > 2 * clientHeight + 1400 &&
          scrollAreaOffset <= clientHeight * 2 + 1700
        ) {
          tSignUpOriginHeight = 150;
          tSignUpOpacity = 1;
          tStartOriginHeight = 105;
          tStartOpacity = 1;

          // 0=>171
          tUploadOriginHeight =
            (scrollAreaOffset - 2 * clientHeight - 1400) * 0.57;
        } else if (
          scrollAreaOffset > 2 * clientHeight + 1700 &&
          scrollAreaOffset <= clientHeight * 2 + 2100
        ) {
          tSignUpOriginHeight = 150;
          tSignUpOpacity = 1;
          tStartOriginHeight = 105;
          tStartOpacity = 1;
          tUploadOriginHeight = 171;

          // 0=>1
          tUploadOpacity = (scrollAreaOffset - 2 * clientHeight - 1700) / 400;
        } else {
          tDateLineWidth = 100;
          tSignUpOriginHeight = 150;
          tSignUpOpacity = 1;
          tStartOriginHeight = 105;
          tStartOpacity = 1;
          tUploadOriginHeight = 171;
          tUploadOpacity = 1;
        }
      }
    } else {
      if (screenWidth < 1200 && isBelowCurrentArea) {
        showTitle = true;
        tSignUpOpacity = 1;
        tStartOpacity = 1;
        tUploadOpacity = 1;
      }
    }
    setIsShowTitle(showTitle);
    setDateLineWidth(tDateLineWidth);
    setSignUpOriginHeight(tSignUpOriginHeight);
    setSignUpOpacity(tSignUpOpacity);
    setStartOriginHeight(tStartOriginHeight);
    setStartOpacity(tStartOpacity);
    setUploadOriginHeight(tUploadOriginHeight);
    setUploadOpacity(tUploadOpacity);
  }, [currentScrollArea, clientHeight]);

  const isBelowCurrentArea = useMemo(
    () => checkIsBelow("scheduleDate"),
    [checkIsBelow]
  );
  return (
    <Container id="scheduleDate">
      <PageTitleM titleText="重要時程" isShow={isShowTitle} />
      <Content>
        <Schedules>
          <Signup originHeight={signUpOriginHeight} opacity={signUpOpacity}>
            <JoinButton isShowHand />
            <ActionTitle>SIGN UP</ActionTitle>
            <Date>10/13 - 11/6</Date>
            <Information>截止前仍可修改報名組別</Information>
          </Signup>
          <Start originHeight={startOriginHeight} opacity={startOpacity}>
            <ImageDateStart src={iconDateStart} />
            <ActionTitle>START</ActionTitle>
            <Date>10/31 - 11/28</Date>
            <Information>10/31(一)UI、團體組開賽</Information>
            <Information>11/7(一)前端組開賽</Information>
          </Start>
          <Upload originHeight={uploadOriginHeight} opacity={uploadOpacity}>
            <ImageDateUpload src={iconDateUpload} />
            <ActionTitle>UPLOAD</ActionTitle>
            <Date>10/31 - 11/28</Date>
            <Information>依賽程登錄作品</Information>
            <InfoAdditional>額外競賽: 主題豐厚獎金等著你</InfoAdditional>
          </Upload>
        </Schedules>
        <DateLine width={dateLineWidth}>
          <ImageDateLine src={iconDateLine} />
        </DateLine>
      </Content>
    </Container>
  );
};

export default ScheduleDate;
