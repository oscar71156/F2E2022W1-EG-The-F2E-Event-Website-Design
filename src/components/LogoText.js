import styled from "styled-components";

const Text = styled.h1`
  display: block;
  background-color: var(--highlight-color-default);
  color: white;
  padding: 8px 40px;
  width: max-content;
  margin: 0 auto;
  border-radius: 100px;
  text-align: center;
  line-height: 125%;
  ${'' /* @media screen and (min-width: 1200px) {
    transform: translateY(-50px);
  } */}
`;

const LogoText = ({className}) => {
  return <Text className={className}>互動式網頁設計</Text>;
};

export default LogoText;
