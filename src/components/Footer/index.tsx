import React from "react";
import styled from "styled-components";

import theme from "../../theme";

const FooterEl = styled.footer<{ isFull: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  width: 100%;
  height: 128px;
  margin: auto 0 0;
  padding: 35px 64px;

  font-family: ${theme.fonts.NotoSans};
  color: #B9B9B9;

  border-top: 1px solid #E5E5E5;
  
  a {
    color: #B9B9B9;
  }

  ${(props) => props.isFull && `width: 100%; `};
}
`;

export const Footer: React.FC<{ isFull?: boolean }> = ({isFull = false}) => {
  return (
    <FooterEl isFull={isFull}>
      <span>© 1992 - 2020 Честный Агент © Все права защищены.</span>
      <a href="tel:84951502112" target="_blank" rel="noopener noreferrer">
        8 (495) 150-21-12
      </a>
    </FooterEl>
  );
}
