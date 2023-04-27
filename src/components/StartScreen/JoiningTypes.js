import styled from "styled-components";
import Icon from "../../assets/icon/icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 23px;
  margin-bottom: 23px;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    z-index: 2;
    /**make width change with screenHeight(like ImageBgStart) */
    width: 90vh;
    max-width: 800px;
  }
`;

const JoiningRole = styled.div`
  margin-bottom: 20px;
  @media screen and (min-width: 1200px) {
    /**For parent justify-content: space-between => center RoleUX*/
    width: 130px;
    margin-bottom: 0;
  }
`;

const IconUser = styled(Icon.User)`
  display: block;
  margin-right: 5px;
`;

const JoiningRoleName = styled.span`
  display: block;
  color: var(--primary-color-default);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  @media screen and (min-width: 1200px) {
    font-size: 24px;
  }
`;
const JoiningRoleNumber = styled.div`
  background-color: var(--primary-color-default);
  width: 100px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  margin: 8px auto 0;
  padding: 3px 0;
`;

const JoiningTypes = ({ className }) => {
  return (
    <Container id="joiningType" className={className}>
      <JoiningRole>
        <JoiningRoleName>前端工程師</JoiningRoleName>
        <JoiningRoleNumber>
          <IconUser />
          920
        </JoiningRoleNumber>
      </JoiningRole>
      <JoiningRole>
        <JoiningRoleName>UI設計者</JoiningRoleName>
        <JoiningRoleNumber>
          <IconUser />
          110
        </JoiningRoleNumber>
      </JoiningRole>
      <JoiningRole>
        <JoiningRoleName>團體組</JoiningRoleName>
        <JoiningRoleNumber>
          <IconUser />
          41
        </JoiningRoleNumber>
      </JoiningRole>
    </Container>
  );
};

export default JoiningTypes;
