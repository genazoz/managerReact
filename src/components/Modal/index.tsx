import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div<{ isActive: boolean }>`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background: transparent;
  pointer-events: none;

  transition: .2s background-color;

  ${props => props.isActive && `
    pointer-events: all;
    background: rgba(0,0,0,.5);
  `}
`;
const Content = styled.div<{ isActive: boolean }>`
  transform: translateY(-100vh);

  transition: .4s transform;

  ${props => props.isActive && `
    transform: translateY(0);
  `}
`

type ModalProps = {
  active: boolean;
  setActive: Function;
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
  return (
    <ModalWrapper onClick={() => setActive(false)} isActive={active}>
      <Content onClick={(e) => e.stopPropagation()} isActive={active}>
        {children}
      </Content>
    </ModalWrapper>
  );
}
