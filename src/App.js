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
import LayoutContext from "./contexts/Layout";
const ScrollCon = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  ${
    "" /* overflow-y: ${(props) => (props.readyStatus > 4 ? "auto" : "hidden")}; */
  }
  ${"" /* overflow-y: hidden; */}
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  /*scrollbar-width: none;*/
  /* Firefox */
`;

const AppCon = styled.div`
  background-color: var(--secondary-color-default);
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const App = () => {
  const [questionEnviousMX, setQuestionEnviousMX] = useState(-120);
  const [questionWishOpacity, setQuestionWishOpacity] = useState(0);
  const [questionComplexMX, setQuestionComplexMX] = useState(120);
  const [topicf2eX, setTopicf2eX] = useState(120);
  const [topicUIX, setTopicUIX] = useState(-120);
  const [topicTeamX, setTopicTeamX] = useState(120);
  const [topic1Style, setTopic1Style] = useState({
    opacity: 1,
    positionY: 120,
  });
  const [topic2Style, setTopic2Style] = useState({
    opacity: 1,
    positionY: 120,
  });
  const [topic3Style, setTopic3Style] = useState({
    opacity: 1,
    positionY: 120,
  });

  const profileImageRef = useRef(null);

  const scrollRef = useRef(null);

  const [currentScrollTop, setCurrentScrollTop] = useState(0);
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
      ref={scrollRef}
      readyStatus={readyStatus}
      // onWheel={ttGetWheel.bind(null, scrollRef)}
      onScroll={(e) => {
        const currentScrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        ttGetScrollPosition(currentScrollTop, clientHeight);
        // console.log(
        //   "currentScrollTop",
        //   currentScrollTop,
        //   "scrollheight",
        //   e.target.scrollHeight,
        //   "clientHeight",
        //   e.target.clientHeight
        // );
      }}
    >
      <AppCon>
        <Competition />
        <Menu />
        <Header />

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
