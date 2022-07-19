import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import theme from "../../theme";
import Long from "../../img/Long.svg";
import Rotation from "../../img/Rotation.svg";
import Linked from "../../img/Linked.svg";
import Delete from "../../img/Delete.svg";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  width: 100%;
  height: 72px;
  padding: 0 40px;

  border-bottom: 1px solid #E5E5E5;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  height: 72px;

  font-size: ${theme.fontSizes.L};
  color: ${theme.colors.green};
  font-weight: 600;
  line-height: 20px;
  text-transform: uppercase;

  background: transparent;
  border: unset;
  cursor: pointer;

  img {
    margin: 0 16px 0 0;
  }
`
const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
const IcoButton = styled.button`
  margin: 0;
  padding: 0;

  cursor: pointer;
  border: unset;
  background-color: unset;
`

export const OrganizationHeader: React.FC<{ onDelete: () => void }> = ({onDelete}) => {
  return (
    <Header>
      <Link to={'/organizations'}>
        <Button>
          <img src={Long} alt="Long Icon"/>
          К списку организаций
        </Button>
      </Link>
      <ButtonsWrapper>
        <IcoButton>
          <img src={Rotation} alt="Rotation Icon"/>
        </IcoButton>
        <IcoButton>
          <img src={Linked} alt="Linked Icon"/>
        </IcoButton>
        <IcoButton onClick={() => onDelete()}>
          <img src={Delete} alt="Delete Icon"/>
        </IcoButton>
      </ButtonsWrapper>
    </Header>
  );
}
