import styled from "styled-components";
import { useRef } from "react";
import iconBTNUser from "../../../assets/icon/button/btn_user.png";
import iconBTNUserH from "../../../assets/icon/button/btn_user_h.png";
import iconBTNUserP from "../../../assets/icon/button/btn_user_p.png";

const Button = styled.button`
  background: transparent;
  cursor: pointer;
  margin: 12px 8px;
  padding: 0;
  right: 0;
  top: 0;
  z-index: 2;
  @media screen and (min-width: 800px) {
    /**right side with 40px+8px => left side  MenuFake width */
    margin-right: 8px;
  }

  @media screen and (min-width: 1200px) {
    align-self: flex-start;
    margin-top: 30px;
    /**right side with 80px+15px => left side  MenuFake width */
    margin-right: 15px;
    position: fixed;
  }

  @media screen and (min-width: 1800px) {
    margin-top: 30px;
    /**right side with 80px+20px => left side  MenuFake width */
    margin-right: 20px;
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 40px;
  height: 40px;
  @media screen and (min-width: 1200px) {
    width: 80px;
    height: 80px;
  }
`;
const Profile = () => {
  const profileImageRef = useRef(null);
  return (
    <Button
      onMouseEnter={() => (profileImageRef.current.src = iconBTNUserH)}
      onMouseLeave={() => (profileImageRef.current.src = iconBTNUser)}
      onMouseDown={() => (profileImageRef.current.src = iconBTNUserP)}
      onMouseUp={() => (profileImageRef.current.src = iconBTNUserH)}
    >
      <a href="https://2022.thef2e.com/users" target="_blank" rel="noreferrer">
        <Image ref={profileImageRef} src={iconBTNUser} />
      </a>
    </Button>
  );
};

export default Profile;
