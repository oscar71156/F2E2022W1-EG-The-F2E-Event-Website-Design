import styled from "styled-components";
import LogoText from "../LogoText";
import iconLogoText from "../../assets/icon/logo_text.png";
const TitleImage = styled.img`
  display: block;
  width: 133px;
  height: 46px;
  margin-top: 8px;
  @media screen and (min-width: 1200px) {
    width: 680px;
    height: 236px;
    margin-top: 44px;
  }
`;

const LogoTextL = styled(LogoText)`
  display: none;
  @media screen and (min-width: 1200px) {
    display: block;
  }
`;

const Container = styled.div`
  display: none;
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

function Logo({ className }) {
  return (
    <Container className={className}>
      <TitleImage src={iconLogoText} />
      <LogoTextL />
    </Container>
  );
}
export default Logo;
