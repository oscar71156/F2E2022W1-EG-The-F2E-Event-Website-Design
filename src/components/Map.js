import { useContext } from "react";
import LayoutContext from "../contexts/Layout";
import Icon from "../assets/icons";

import styled from "styled-components";
import iconCurrentPosition from "../assets/map_now.gif";

import layout from "../layout";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;
    position: fixed;
    left: 40px;
    bottom: 40px;
  }
`;

/**
 * currentPositoin:
 * startScreen: 2px, 52px
 * botherYou: 44px,1px
 * thisYearTopic: 114px, 12px
 * comingTopic: 194px, 12px
 * scheduleDate: 183px, 62px
 * dissatisfactory, rules: 129px, 87px
 * sponsors: 84px, 122px
 * finish: 29px, 107px
 */
const ImageCurrentPosition = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(${(props) => props.currentPosition.x}px)  translateY(${(props) => props.currentPosition.y}px);
  transition-duration:.1s;
`;
function Map() {
  const { currentScrollArea } = useContext(LayoutContext);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  console.log('currentPosition',currentPosition)
  useEffect(() => {
    const { name: scrollAreaName } = currentScrollArea;
    if(layout[scrollAreaName]){
      const {mapPosition}=layout[scrollAreaName];
      console.log('mapPosition',mapPosition)
      setCurrentPosition((pre)=>({...pre,...mapPosition}));
    }
  }, [currentScrollArea]);
  return (
    <Container>
      <Icon.RaceMap />
      <ImageCurrentPosition src={iconCurrentPosition} currentPosition={currentPosition} />
    </Container>
  );
}

export default Map;
