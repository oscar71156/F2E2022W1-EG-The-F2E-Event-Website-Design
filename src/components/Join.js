import styled from "styled-components";
import Icon from "../assets/icons";

import iconJoinHand from "../assets/btn_joinHand.gif";

const JoinButtonCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IconBTNJoin = styled(Icon.BTNJoin)`
  display: block;
  margin-top: 10px;
`;

const ScheduleGIFImage = styled.img`
  height: 71px;
  width: auto;
  visibility: ${(props) => (props.isShowHand ? "visible" : "hidden")};
`;

const JoinButton = ({ isShowHand = false,className }) => {
  return (
    <JoinButtonCon className={className}>
      <ScheduleGIFImage src={iconJoinHand} isShowHand={isShowHand} />
      <a href="https://2022.thef2e.com/signup" target="_blank" rel="noreferrer">
        <IconBTNJoin />
      </a>
    </JoinButtonCon>
  );
};

export default JoinButton;
