import styled from "styled-components";
import { useRef, memo } from "react";

const Item = styled.li`
  padding: 40px 0;
  + li {
    padding: 20px;
  }
`;
const AnchorTag = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  :active img {
    transform: scale(0.833);
  }
`;
const Text = styled.span`
  color: var(--secondary-color-default);
  font-szie: 18px;
  line-height: 160%;
  font-weight: 500;
  letter-spacing: 0.05em;
`;

const Image = styled.img`
  width: 60px;
  height: auto;
  margin-bottom: 4px;
`;

const MenuItem = ({ title, url, image, imageH }) => {
  const imageRef = useRef(null);
  return (
    <Item
      onMouseOver={() => (imageRef.current.src = imageH)}
      onMouseLeave={() => (imageRef.current.src = image)}
    >
      <AnchorTag href={url} target="_blank">
        <Image src={image} ref={imageRef} />
        <Text>{title}</Text>
      </AnchorTag>
    </Item>
  );
};

export default memo(MenuItem);
