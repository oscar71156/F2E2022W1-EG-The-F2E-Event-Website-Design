import styled from "styled-components";
import iconLoading from "../assets/icon/loading_2x.gif";

const Container = styled.div`
  position: fixed;
  width: calc(100vw + 100px);
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: var(--secondary-color-default);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  width: 250px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10px;
    border: 1px solid var(--primary-color-default);
    border-radius: 20px;
    box-sizing: border-box;
  }
  &::after {
    @keyframes progressBar {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    background-color: var(--primary-color-default);
    border-radius: 20px;
    box-sizing: border-box;
    animation-name: progressBar;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  > img {
    width: 190px;
    display: block;
    margin: 0 auto;
  }
  @media screen and (min-width: 1200px) {
    width: 500px;
    &::before,
    &::after {
      height: 16px;
    }
    > img {
      width: 250px;
    }
  }
`;

///研究picture tag
function LoadingPage() {
  return (
    <Container>
      <Loading>
        <img srcSet={`${iconLoading} 1x`} />
      </Loading>
    </Container>
  );
}

export default LoadingPage;
