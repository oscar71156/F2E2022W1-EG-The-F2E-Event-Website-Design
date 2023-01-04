import styled from "styled-components";
import { useContext } from "react";
import LayoutContext from "../../contexts/Layout";
import iconTrafficLightFrame from "../../assets/ready_frame.png";
import iconLightGreen from "../../assets/ready_1.png";
import iconLightOrange from "../../assets/ready_2.png";
import iconLightRed from "../../assets/ready_3.png";
const TrafficLightCon = styled.div`
  position: absolute;
  height: max-content;
  margin: auto 0;
  right: 0;
  bottom: 200px;
  @media screen and (min-width: 1431px) {
    top: 0;
    bottom: 0;
    top: -10%;
    position: fixed;
    visibility: ${(props) => (props.readyStatus > 3 ? "hidden" : "visible")};
    right: ${(props) => props.scrollBarWidth}px;
  }
  @media screen and (min-width: 1200px) {
    display: block;
  }
`;

const Title = styled.span`
  display: block;
  font-size: 13px;
  line-height: 140%;
  font-weight: 700;
  color: var(--highlight-color-default);
  transform: translateX(29px);
  letter-spacing: 0.05em;
  @media screen and (min-width: 1200px) {
    font-size: 32px;
  }
`;
const TraficLightFrame = styled.div`
  width: 120px;
  height: 48px;
  position: relative;
  background-image: url(${iconTrafficLightFrame});
  background-size: contain;
  background-repeat: no-repeat;
  @media screen and (min-width: 1200px) {
    width: 275px;
    height: 108px;
  }
`;

const ImageLight = styled.img`
  height: 19px;
  width: 19px;
  position: absolute;
  top: 15px;
  @media screen and (min-width: 1200px) {
    top: 33px;
    width: 44px;
    height: 44px;
  }
`;

const ImageLightRed = styled(ImageLight)`
  left: 16px;

  @media screen and (min-width: 1200px) {
    left: 37px;
    opacity: ${(props) =>
      props.readyStatus === 1 || props.readyStatus === 0 ? 1 : 0};
  }
`;
const ImageLightOrange = styled(ImageLight)`
  left: 44px;
  @media screen and (min-width: 1200px) {
    left: 101px;
    opacity: ${(props) =>
      props.readyStatus === 2 || props.readyStatus === 0 ? 1 : 0};
  }
`;
const ImageLightGreen = styled(ImageLight)`
  left: 72px;
  @media screen and (min-width: 1200px) {
    left: 166px;
    opacity: ${(props) =>
      props.readyStatus >= 3 || props.readyStatus === 0 ? 1 : 0};
  }
`;

const TrafficLight = ({ runningState = 0 }) => {
  const { scrollBarWidth } = useContext(LayoutContext);
  const getTitle = () => {
    if (runningState < 3) {
      return "READY!";
    } else if (runningState >= 3) {
      return "GO!!";
    }
  };
  return (
    <TrafficLightCon readyStatus={runningState} scrollBarWidth={scrollBarWidth}>
      <Title>{getTitle()}</Title>
      <TraficLightFrame>
        <ImageLightRed src={iconLightRed} readyStatus={runningState} />
        <ImageLightOrange src={iconLightOrange} readyStatus={runningState} />
        <ImageLightGreen src={iconLightGreen} readyStatus={runningState} />
      </TraficLightFrame>
    </TrafficLightCon>
  );
};

export default TrafficLight;
