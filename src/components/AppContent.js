import styled from "styled-components";
import { useRef, useContext, useCallback } from "react";
import Competition from "../components/Competition";
import { throttle } from "../utilities";
import Header from "../components/Header/Header";
import Botheryou from "../components/Botheryou";
import ThisYearTopic from "../components/ThisYearTopic";
import ComingTopic from "../components/ComingTopic";
import ScheduleDate from "../components/ScheduleDate";
import Dissatisfactory from "../components/Dissatisfactory";
import Rules from "../components/Rules";
import Sponsors from "../components/Sponsors";
import Finish from "../components/Finish";
import SignUp from "../components/SignUp";
import StartScreen from "../components/StartScreen/StartScreen";
import Menu from "../components/Menu/Menu";
import Map from "../components/Map";
import JoinButton from "./Join";
import LayoutContext from "../contexts/Layout";
const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;

  /**Make content dont exceed the window*/
  overflow-x: hidden;
`;

const Container = styled.div`
  background-color: var(--secondary-color-default);
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EmptySlot = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(100vh - 900px);
    position: sticky;
    top: calc(100vh - 300px);
    right: 0;
    z-index: -1;
  }
`;

const FixedJoinBTN = styled(JoinButton)`
  display: none;
  @media screen and (min-width: 1200px) {
    position: fixed;
    display: flex;
    width: min-content;
    right: 40px;
    bottom: 40px;
  }
`;

/***
 * Header+EmptySlot+Competition=100vh(initialScreen)
 */
const AppContent = () => {
  const scrollRef = useRef(null);
  const thisYearTopicRef = useRef(null);
  const { setClientHeight, setScrollTop, setScrollContent } =
    useContext(LayoutContext);

  // const ttGetWheel = useCallback(
  //   throttle((readyStatus) => {
  //     console.log("ttGetWheel", this);
  //     if (readyStatus < 5) {
  //       changeReadyStatus(readyStatus + 1);
  //     }
  //   }, 1000),
  //   []
  // );

  const ttGetWheel = () => {
    console.log("ttGetWheel");
  };
  // throttle(function (scrollRef) {
  //   const currentScrollTop=scrollRef.current.scrollTop
  //   console.log("ttGetWheel", currentScrollTop);

  //   scrollRef.current.scrollTo(0,currentScrollTop+100);
  //   // if (readyStatus < 5) {
  //   //   changeReadyStatus(readyStatus + 1);
  //   // }
  // });

  const ttGetScrollPosition = useCallback(
    throttle((currentScrollTop, clientHeight) => {
      setScrollTop(currentScrollTop);
      setClientHeight(clientHeight);
    }, 0),
    []
  );

  return (
    <ScrollContainer
      id="scrollArea"
      // onWheel={ttGetWheel.bind(null, scrollRef)}
      onScroll={(e) => {
        const currentScrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        ttGetScrollPosition(currentScrollTop, clientHeight);
      }}
    >
      <Container ref={setScrollContent}>
        <Header />
        <EmptySlot />
        <Competition />
        <FixedJoinBTN isShowHand />
        <Menu />
        <Map />
        <StartScreen />
        <Botheryou />
        <ThisYearTopic />
        <ComingTopic />
        <ScheduleDate />
        <Dissatisfactory />
        <Rules />
        <Sponsors />
        <Finish />
        <SignUp />
      </Container>
    </ScrollContainer>
  );
};
export default AppContent;
