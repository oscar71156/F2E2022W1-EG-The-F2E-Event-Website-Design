import styled from "styled-components";
import { useContext } from "react";
import Competition from "../components/Competition";
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
const Container = styled.div`
  overflow:hidden;
  background-color: var(--secondary-color-default);
`;

const FixedJoinBTN = styled(JoinButton)`
  &#joinButton {
    display: none;
    @media screen and (min-width: 1200px) {
      z-index: 1;
      position: fixed;
      display: flex;
      width: min-content;
      right: 40px;
      bottom: 40px;
    }
  }
`;

const AppContent = () => {
  const { setScrollArea } = useContext(LayoutContext);
  return (
    <Container id="scrollArea" ref={setScrollArea}>
      <Header />
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
  );
};
export default AppContent;
