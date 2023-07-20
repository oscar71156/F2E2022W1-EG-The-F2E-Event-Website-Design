import styled from "styled-components";
import JoinButton from "./Join";
import iconLogo from "../assets/icon/logo.png";
import { useEffect, useContext, useState } from "react";
import LayoutContext from "../contexts/Layout";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    height: 100vh;
  }
`;

const Title = styled.h2`
  color: var(--highlight-color-default);
  text-align: center;
`;
const SignUpBTNWrapper = styled.div`
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition: opacity ${(props) => (props.isShow ? "1s" : "0s")}
    ${(props) => (props.isShow ? "1s" : "0s")};
`;

const ImageBigLogo = styled.img`
  width: 226px;
  height: auto;
  transform: translateY(${(props) => (props.isShow ? 0 : "500")}px);
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition-property: opacity, transform;
  transition-duration: 0.5s, 1s;
  @media screen and (min-width: 601px) {
    width: 520px;
  }
`;

function SignUp() {
  const [isShowBigLogo, setIsShowBigLogo] = useState(false);
  const [isShowBTN, setIsShowBTN] = useState(false);
  const { clientHeight, currentScrollArea, screenWidth } =
    useContext(LayoutContext);
  useEffect(() => {
    const { name: scrollAreaName, offset: scrollAreaOffset } =
      currentScrollArea;
    let showBigLogo = false;
    let showBTN = false;
    if (scrollAreaName === "signUp") {
      if (screenWidth < 1200) {
        if (scrollAreaOffset >= clientHeight / 2) {
          showBigLogo = true;
          showBTN = true;
        }
      } else {
        if (scrollAreaOffset >= clientHeight / 2) {
          showBigLogo = true;
          showBTN = true;
        }
      }
    }
    setIsShowBigLogo(showBigLogo);
    setIsShowBTN(showBTN);
  }, [currentScrollArea, clientHeight]);
  return (
    <Container id="signUp">
      <ImageBigLogo src={iconLogo} isShow={isShowBigLogo} />
      <SignUpBTNWrapper isShow={isShowBTN}>
        <JoinButton isShowHand />
        <Title>立即報名</Title>
      </SignUpBTNWrapper>
    </Container>
  );
}

export default SignUp;
