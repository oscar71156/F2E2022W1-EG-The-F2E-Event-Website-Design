import styled from "styled-components";
import iconCharacterf2e from "../assets/character_f2e.png";
import iconCharacterUI from "../assets/character_ui.png";
import iconCharacterTeam from "../assets/character_team.png";
import JoinButton from "./Join";

import PageTitle from "./PageTitle";
import { useState, useEffect, useContext } from "react";
import LayoutContext from "../contexts/Layout";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 900px);
    width: 100%;
    position: relative;
    > * {
      top: 0;
      position: ${(props) => (props.isChildSticky ? "sticky" : "relative")};
      transform: translateY(${(props) => (props.isChildSticky ? 0 : "900px")});
    }
  }
`;

const Content = styled.div`
  margin: 40px 20px 60px;
  @media screen and (min-width: 1200px) {
    display: flex;
    align-items: center;
    height: calc(100vh - 740px);
    min-height: 220px;
    width: 87.17%;
    max-width: calc(1430px * 0.8717);
    justify-content: space-around;
    margin: 0 auto;
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    transition: opacity 2s;
    top: ${(props) => (props.isSticky ? "240px" : 0)};
  }

  @media screen and (min-width: 1800px) {
    width: calc(0.8717 * 74.48vw);
  }
`;

const ATopic = styled.div`
  display: flex;
  + div {
    margin: 20px 0;
  }
  @media screen and (min-width: 1200px) {
    display: inline-block;
    margin: 0;
    width: 250px;
    padding: 20px 0;
    + div {
      margin: 0;
    }
  }
`;

const F2E = styled(ATopic)``;

const UI = styled(ATopic)``;

const Team = styled(ATopic)``;

const CharacterTitle = styled.h4`
  color: var(--primary-color-default);
  margin: 16px 0 0;
`;
const ImageContainer = styled.div`
  flex: 1;
  text-align: center;
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const Imagef2e = styled.img`
  width: auto;
  height: 270px;
`;

const ImageUI = styled.img`
  width: auto;
  height: 255px;
  @media screen and (min-width: 601px) {
    width: 132px;
    height: 198px;
  }
`;

const ImageTeam = styled.img`
  width: auto;
  height: 238px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ThisYearTopic = () => {
  const [isShowTitle, setIsShowTitle] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { clientHeight, currentScrollArea } = useContext(LayoutContext);

  /**
   * 1. 過視窗3/4時，Title出現
   * 2. 完整視窗時，show conetent
   */
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    if (scrollAreaName === "thisYearTopic") {
      setIsSticky(true);
      if (scrollAreaOffset < (clientHeight * 3) / 4) {
        setIsShowTitle(false);
        setIsShowContent(false);
      } else if (
        scrollAreaOffset >= (clientHeight * 3) / 4 &&
        scrollAreaOffset < clientHeight
      ) {
        setIsShowTitle(true);
      } else if (scrollAreaOffset >= clientHeight) {
        setIsShowContent(true);
        setIsShowTitle(true);
      }
    } else {
      setIsSticky(false);
    }
  }, [clientHeight, currentScrollArea]);
  return (
    <Container isChildSticky={isSticky}>
      <PageTitle
        titleText="本屆主題:互動式網頁設計"
        secondTitleText="以下兩個角色進行攜手合作"
        isShow={isShowTitle}
      />
      <Content isSticky={isSticky} isShow={isShowContent}>
        <F2E>
          <ImageContainer>
            <Imagef2e src={iconCharacterf2e} />
          </ImageContainer>
          <Description>
            <JoinButton isShowHand />
            <CharacterTitle>前端工程師</CharacterTitle>
          </Description>
        </F2E>
        <UI>
          <Description>
            <JoinButton />
            <CharacterTitle>UI設計師</CharacterTitle>
          </Description>
          <ImageContainer>
            <ImageUI src={iconCharacterUI} />
          </ImageContainer>
        </UI>
        <Team>
          <ImageContainer>
            <ImageTeam src={iconCharacterTeam} />
          </ImageContainer>
          <Description>
            <JoinButton />
            <CharacterTitle>團體組(UI+前端)</CharacterTitle>
          </Description>
        </Team>
      </Content>
    </Container>
  );
};

export default ThisYearTopic;
