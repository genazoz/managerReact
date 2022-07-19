import React from "react";

import styled from "styled-components";
import theme from "../../theme";
import {Link, useLocation} from "react-router-dom";
import Building from '../../img/Building.svg'

const AsideEl = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 224px;
  height: 100vh;

  background: #F7F7F7;
`;
const Header = styled.header`
  padding: 20px 0;

  text-align: center;
`;
const List = styled.ul`
`;
const Title = styled.p`
  margin: 0 0 2px 0;

  font-size: ${theme.fontSizes.L};
  font-weight: 700;
  line-height: 160%;
  text-transform: uppercase;
`;
const Subtitle = styled.p`
  line-height: 160%;
  font-size: ${theme.fontSizes.S};
  text-transform: uppercase;
`;
const Button = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 12px 16px;

  font-weight: 600;
  color: ${theme.colors.green};
  line-height: 20px;

  cursor: pointer;
  background: #EEEEEE;

  img {
    margin: 0 12px 0 0;
  }

  ${props => props.isActive && `background: #EEEEEE;`}
`

export const Aside = () => {
  const location = useLocation();

  return (
    <AsideEl>
      <Header>
        <Title>
          Честный агент
        </Title>
        <Subtitle>
          Менеджер процесса
        </Subtitle>
      </Header>
      <List>
        <li>
          <Link to={'/organizations'}>
            <Button isActive={location.pathname === `/organizations`}>
              <img src={Building} alt="Building Icon"/>
              Организации
            </Button>
          </Link>
        </li>
      </List>
    </AsideEl>
  );
}
