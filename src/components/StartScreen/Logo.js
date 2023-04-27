import styled from "styled-components";
import iconLogoText from "../../assets/icon/logo_text.png";
import iconLogo from "../../assets/icon/logo.png";

const LogoText = styled.h1`
  display: block;
  background-color: var(--highlight-color-default);
  color: white;
  padding: 8px 40px;
  width: max-content;
  margin: 0 auto;
  border-radius: 100px;
  text-align: center;
  line-height: 125%;
`;
const TitleLogo = styled.img`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;
    height: 21.9vh;
    margin-top: 5vh;
  }
`;

const Container = styled.div`
  text-align: center;
  @media screen and (min-width: 1200px) {
    display: block;
    width: min-content;
    position: fixed;
    margin: 0 auto;
    right: 0;
    left: 0;
    top: 0;
  }
`;
const ImageBigLogoM = styled.img`
  padding: 32px 0 16px;
  height: 23.2vh;
  ${"" /* for header space in mobile */}
  margin-top: 60px;
  @media screen and (min-width: 1200px) {
    display: none;
    margin-top: 0;
  }
  @media screen and (min-width: 600px) {
    height: 40vh;
  }
`;

function Logo({className}) {
  return (
    <Container className={className}>
      <ImageBigLogoM src={iconLogo} />
      <TitleLogo src={iconLogoText} />
      <LogoText>互動式網頁設計</LogoText>
    </Container>
  );
}
export default Logo;
