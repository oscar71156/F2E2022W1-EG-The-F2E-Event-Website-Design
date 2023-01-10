import styled from "styled-components";
import JoinButton from "./Join";
import iconLogo from "../assets/logo.png";
import { useEffect, useContext, useState } from "react";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    height: calc(100vh + 1000px);
  }
`;

const Content = styled.div`
  @media screen and (min-width: 1200px) {
    opacity: ${(props) => props.tStyle.opacity};

    transform: translateY(500px);
  }
`;
const Title = styled.h2`
  color: var(--highlight-color-default);
  text-align: center;
`;

const ImageBigLogo = styled.img`
  width: 226px;
  height: auto;
  @media screen and (min-width: 601px) {
    width: 520px;
  }
`;

function SignUp() {
  const [contentTStyle, setContentTStyle] = useState({ opacity: 0 });
  const { clientHeight, currentScrollArea } = useContext(LayoutContext);

  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    if (scrollAreaName === "signUp") {
      if (scrollAreaOffset >= 200 + clientHeight) {
        setContentTStyle((pre) => ({
          ...pre,
          opacity: 0 + (scrollAreaOffset - clientHeight - 200) / 400,
        }));
      }
    }
  }, [currentScrollArea, clientHeight]);
  return (
    <Container id="signUp">
      <Content tStyle={contentTStyle}>
        <ImageBigLogo src={iconLogo} />
        <JoinButton isShowHand />
        <Title>立即報名</Title>
      </Content>
    </Container>
  );
}

export default SignUp;
