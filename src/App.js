import styled from "styled-components";

import {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import Competition from "./components/Competition";
import competitionContext from "./contexts/Competiton";
import { throttle } from "./utilities";
import Header from "./components/Header/Header";
import Botheryou from "./components/Botheryou";
import ThisYearTopic from "./components/ThisYearTopic";
import ComingTopic from "./components/ComingTopic";
import ScheduleDate from "./components/ScheduleDate";
import Dissatisfactory from "./components/Dissatisfactory";
import Rules from "./components/Rules";
import Sponsors from "./components/Sponsors";
import Finish from "./components/Finish";
import SignUp from "./components/SignUp";
import StartScreen from "./components/StartScreen/StartScreen";
import Menu from "./components/Menu/Menu";
import Map from './components/Map';
import LayoutContext from "./contexts/Layout";
const ScrollCon = styled.div`
  height: 100vh;
  overflow-y: auto;

  /**Make content dont exceed the window*/
  overflow-x: hidden;
`;

const AppCon = styled.div`
  background-color: var(--secondary-color-default);
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const App = () => {
  const scrollRef = useRef(null);

  const { changeReadyStatus, readyStatus } = useContext(competitionContext);
  const { setClientHeight, setScrollTop } = useContext(LayoutContext);

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
    <ScrollCon
      id="scrollArea"
      ref={scrollRef}
      readyStatus={readyStatus}
      // onWheel={ttGetWheel.bind(null, scrollRef)}
      onScroll={(e) => {
        const currentScrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        ttGetScrollPosition(currentScrollTop, clientHeight);
        console.log("onScroll");
      }}
    >
      <AppCon>
        <Header />
        <Competition />
        <Menu />

        <Map/>
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
      </AppCon>
    </ScrollCon>
  );
};
export default App;
