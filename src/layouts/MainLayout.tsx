import React from "react";
import {Aside , Menu} from "../components";
import {Outlet} from 'react-router-dom';
import styled from "styled-components";

function MainLayout() {
  const PageContainer = styled.div`
    display: flex;
  `;
  const Content = styled.div`
    width: 100%;
    height: 100vh;
  `;

  return (
    <>
      <PageContainer>
        <Menu/>
        <Aside />
        <Content>
          <Outlet/>
        </Content>
      </PageContainer>
    </>)
}

export default MainLayout;