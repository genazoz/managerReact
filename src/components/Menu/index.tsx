import React from "react";

import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import Home from '../../img/Home.svg'
import Vector from '../../img/Vector.svg'
import Search from '../../img/Search.svg'
import Settings from '../../img/Settings.svg'
import Chat from '../../img/Chat.svg'
import Exit from '../../img/Exit.svg'

const MenuEl = styled.div`
  position: relative;
  
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 48px;
  height: 100vh;

  background: #82B284;

  cursor: auto;

  transition: 1s transform cubic-bezier(0.85, 0.01, 0.2, 0.99);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Header = styled(Wrapper)`
`;
const Footer = styled(Wrapper)`
`;
const Button = styled.div<{isActive?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;

  cursor: pointer;
  
  &:hover {
    background: #A4C7A5;
  }
  
  ${props => props.isActive && `background: #A4C7A5;`}
`

export const Menu = () => {
  const location = useLocation();

  return (
    <MenuEl>
      <Header>
        <Link to={'/'}>
          <Button isActive={location.pathname === `/`}>
            <img src={Home} alt="Home Icon"/>
          </Button>
        </Link>
        <Link to={'/organizations'}>
          <Button isActive={location.pathname.indexOf('organizations') !== -1}>
            <img src={Vector} alt="Vector Icon"/>
          </Button>
        </Link>
        <Link to={'/search'}>
          <Button isActive={location.pathname === `/search`}>
            <img src={Search} alt="Search Icon"/>
          </Button>
        </Link>
      </Header>
      <Footer>
        <Link to={'/settings'}>
          <Button isActive={location.pathname === `/settings`}>
            <img src={Settings} alt="Settings Icon"/>
          </Button>
        </Link>
        <Link to={'/messenger'}>
          <Button isActive={location.pathname === `/messenger`}>
            <img src={Chat} alt="Chat Icon"/>
          </Button>
        </Link>
        <Link to={'/exit'}>
          <Button isActive={location.pathname === `/exit`}>
            <img src={Exit} alt="Exit Icon"/>
          </Button>
        </Link>
      </Footer>
    </MenuEl>
  );
}
