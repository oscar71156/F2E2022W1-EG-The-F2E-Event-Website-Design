import styled from "styled-components";
import iconTalking from "../assets/icon/bg/bg_talking.png";
const Container = styled.div`
  /**make margin top valid,  block will  Collapsing margins*/
  display: inline-block;
  color: var(--primary-color-default);
  width: 100%;
  position: relative;
  margin: 40px auto;
  z-index: 0;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition: opacity 1s;
  transition-timing-function: ease-in;
  @media screen and (min-width: 1200px) {
    height: max-content;
    text-align: center;
    /**For on top of content when scrolling */
    z-index: 1;
  }
`;
const Title = styled.h2`
  margin: 0 auto;
  text-align: center;
  padding: 5px 0 15px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    background-image: url(${iconTalking});
    height: 150%;
    width: 140%;
    left: -20%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    top: -10px;
    z-index: -1;
    @media screen and (min-width: 1200px) {
      left: 0;
      width: 100%;
    }
  }
  @media screen and (min-width: 1200px) {
    width: ${(props) => (props.titleLength + 4) * 60 + "px"};
    margin-top: 40px;
    padding: 0;
  }
`;

const SecondTitle = styled.h5`
  color: var(--secondary-color-dark);
  text-align: center;
`;

function PageTitle({
  titleText = "",
  secondTitleText = "",
  isShow = true,
  className,
}) {
  const showSecondText = () => {
    return { __html: secondTitleText };
  };

  return (
    <Container className={className} isShow={isShow}>
      <Title titleLength={titleText.length}>{titleText}</Title>
      {secondTitleText && (
        <SecondTitle dangerouslySetInnerHTML={showSecondText()} />
      )}
    </Container>
  );
}

export default PageTitle;
