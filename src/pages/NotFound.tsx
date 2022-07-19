import React from "react";
import styled from "styled-components";
import theme from "../theme";

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  pointer-events: none;
`;
const Logo = styled.a`
  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;

  font-size: calc(16px + 12px);


  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    display: block;
    width: auto;
    padding: 0 70px;

    font-size: 200px;
    color: ${theme.colors.green};

    @media (max-width: ${theme.media.mob}) {
      padding: 8px 8px 2px 8px;
    }
  }
`;

function CardPage() {
  return (
    <Wrapper>
      <Logo>
        <span>404</span>
      </Logo>
    </Wrapper>
  );
}

export default CardPage;
