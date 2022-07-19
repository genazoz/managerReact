import React, {ReactElement} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import theme from "../../theme";

const ButtonEl = styled.button<{theme: string, fullwidth: boolean, disabled: boolean }>`
  position: relative;
  
  display: flex;
  align-items: center;
  justify-content: center;

  width: 400px;
  height: 35px;
  padding: 12px;

  font-size: calc(${theme.fontSizes.M} * 0.85);
  font-weight: 600;
  line-height: 160%;
  text-transform: uppercase;
  color: ${theme.colors.green};

  cursor: pointer;
  border: 1px solid #E5E5E5;
  background: transparent;
  
  transition: .1s border-color, .1s color;
  
  svg {
    position: absolute;
    left: 12px;
    fill: #82B284;

    transition: .1s fill;
  }
  
  @media (max-width: ${theme.media.tab}) {
    padding: 2px 50px 0 50px;
  }
  
  &:hover {
    color: #98C88C;
    
    border-color: #CDCDCD;

    svg {
      fill: #98C88C;
    }
  }
  &:active {
    color: #58A742;
    
    border-color: #CDCDCD;
    
    svg {
      fill: #58A742;
    }
  }
`;

type ButtonProps = {
  text: string | ReactElement;
  icon: string | ReactElement;
  type?: string;
  href?: string;
  theme?: string;
  fullwidth?: boolean;
  disabled?: boolean;
}

export const Button:React.FC<ButtonProps> = ({
  text,
  icon = '',
  type = "div",
  href = '',
  theme = "dark",
  fullwidth = false,
  disabled = false
}) => {
  return (
    <>
      {type === "link" && !disabled ? (
        <Link to={href} >
          <ButtonEl theme={theme} fullwidth={fullwidth} disabled={disabled}>
            {icon}
            {text}
          </ButtonEl>
        </Link>
      ) : (
        <ButtonEl theme={theme} fullwidth={fullwidth} disabled={disabled}>
          {icon}
          {text}
        </ButtonEl>
      )}
    </>
  );
}
