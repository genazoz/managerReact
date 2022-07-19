import React from "react";
import styled from "styled-components";
import theme from "../theme";

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 auto;

  font-size: 100px;
  color: ${theme.colors.green};
`;

function Home() {
  return (
    <Main>
      Главная
    </Main>
  );
}

export default Home;
