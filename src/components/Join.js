import styled from "styled-components";
import iconJoinHand from "../assets/btn_joinHand.gif";
import iconJoinBTN from "../assets/btn_join.png";
import iconJoinBTNH from "../assets/btn_join_h.png";
const JoinButtonCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageBTNJoin = styled.img`
  display: block;
  margin-top: 10px;
  width: 103px;
`;

const ScheduleGIFImage = styled.img`
  height: 71px;
  width: auto;
  visibility: ${(props) => (props.isShowHand ? "visible" : "hidden")};
`;

const JoinButton = ({ isShowHand = false, className }) => {
  return (
    <JoinButtonCon className={className}>
      <ScheduleGIFImage src={iconJoinHand} isShowHand={isShowHand} />
      <a href="https://2022.thef2e.com/signup" target="_blank" rel="noreferrer">
        <ImageBTNJoin
          src={iconJoinBTN}
          onMouseEnter={(e) => (e.target.src = iconJoinBTNH)}
          onMouseLeave={(e) => (e.target.src = iconJoinBTN)}
        />
      </a>
    </JoinButtonCon>
  );
};

export default JoinButton;
