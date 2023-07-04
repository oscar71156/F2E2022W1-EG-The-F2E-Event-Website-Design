import styled from "styled-components";
import iconCharacterf2e from "../assets/icon/character/character_f2e.png";
import iconCharacterUI from "../assets/icon/character/character_ui.png";
import iconCharacterTeam from "../assets/icon/character/character_team.png";
import JoinButton from "./Join";

import PageTitle from "./PageTitle";
import { useState, useEffect, useContext } from "react";
import LayoutContext from "../contexts/Layout";
const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: calc(200vh + 900px);
    width: 100%;
  }
`;

const FixedPageTitle = styled(PageTitle)`
  @media screen and (min-width: 1200px) {
    top: 0;
    position: fixed;
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
    transition: opacity ${(props) => (props.isShow ? "2s" : "0.5s")};
    position: fixed;
    top: 240px;
    left: 50%;
    transform: translateX(-50%);
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
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition: opacity 0.5s, transform 1s;
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

const F2E = styled(ATopic)`
  transform: translateX(${(props) => (props.isShow ? 0 : "200%")});
  @media screen and (min-width: 1200px) {
    transform: none;
    opacity: 1;
  }
`;

const UI = styled(ATopic)`
  transform: translateX(${(props) => (props.isShow ? 0 : "-200%")});
  @media screen and (min-width: 1200px) {
    transform: none;
    opacity: 1;
  }
`;

const Team = styled(ATopic)`
  transform: translateX(${(props) => (props.isShow ? 0 : "200%")});
  @media screen and (min-width: 1200px) {
    transform: none;
    opacity: 1;
  }
`;

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
  const [isShowContent, setIsShowContent] = useState(false); //for big screen
  const [isShowF2E, setIShowF2E] = useState(false); //for small screen
  const [isShowUI, setIsShowUI] = useState(false); //for small screen
  const [isShowTeam, setIsShowTeam] = useState(false); //for small screen
  const { clientHeight, currentScrollArea, screenWidth } =
    useContext(LayoutContext);

  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;

    if (scrollAreaName === "thisYearTopic") {
      if (screenWidth < 1200) {
        let showTitle = false,
          showF2E = false,
          showUI = false,
          showTeam = false;
        if (scrollAreaOffset >= 100 && scrollAreaOffset < 400) {
          showTitle = true;
        } else if (scrollAreaOffset >= 400 && scrollAreaOffset < 700) {
          showTitle = true;
          showF2E = true;
        } else if (scrollAreaOffset >= 700 && scrollAreaOffset < 1000) {
          showTitle = true;
          showF2E = true;
          showUI = true;
        } else if (scrollAreaOffset > 1000) {
          showTitle = true;
          showF2E = true;
          showUI = true;
          showTeam = true;
        }
        setIsShowTitle(showTitle);
        setIShowF2E(showF2E);
        setIsShowUI(showUI);
        setIsShowTeam(showTeam);
      } else {
        /**
         * 100vh Title出現
         * 100vh+600 show conetent
         * 200vh++600 hide all
         */
        let showTitle = false,
          showContent = false;
        if (
          scrollAreaOffset > clientHeight &&
          scrollAreaOffset <= clientHeight + 600
        ) {
          showTitle = true;
        } else if (
          scrollAreaOffset >= clientHeight + 600 &&
          scrollAreaOffset < 2 * clientHeight + 600
        ) {
          showTitle = true;
          showContent = true;
        }
        setIsShowTitle(showTitle);
        setIsShowContent(showContent);
      }
    }
  }, [clientHeight, currentScrollArea, screenWidth]);
  return (
    <Container id="thisYearTopic">
      <FixedPageTitle
        titleText="本屆主題:互動式網頁設計"
        secondTitleText="以下兩個角色進行攜手合作"
        isShow={isShowTitle}
      />
      <Content isShow={isShowContent}>
        <F2E isShow={isShowF2E}>
          <ImageContainer>
            <Imagef2e src={iconCharacterf2e} />
          </ImageContainer>
          <Description>
            <JoinButton isShowHand />
            <CharacterTitle>前端工程師</CharacterTitle>
          </Description>
        </F2E>
        <UI isShow={isShowUI}>
          <Description>
            <JoinButton />
            <CharacterTitle>UI設計師</CharacterTitle>
          </Description>
          <ImageContainer>
            <ImageUI src={iconCharacterUI} />
          </ImageContainer>
        </UI>
        <Team isShow={isShowTeam}>
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
