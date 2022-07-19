import React from "react";

import {Modal} from "../Modal";
import styled from "styled-components";
import theme from "../../theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 320px;
  padding: 24px;

  background: #FFFFFF;
`
const Title = styled.p`
  margin: 0 0 16px 0;

  font-size: 20px;
  line-height: 28px;
`;
const Text = styled.p`
  margin: 0 0 50px 0;
  
  text-align: left;
  line-height: 18px;
  color: #3B3B3B;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Button = styled.button`
  margin: 0;
  padding: 0;

  font-size: ${theme.fontSizes.L};
  line-height: 20px;
  font-weight: 600;
  text-transform: uppercase;
  
  cursor: pointer;
  border: unset;
  background-color: unset;
`
const Cancel = styled(Button)`
  color: #B9B9B9;
`
const Delete = styled(Button)`
  color: ${theme.colors.green};
`

export const DeleteOrganizationModal: React.FC<{ active: boolean; setActive: Function; onDelete: () => void }> = ({active, setActive, onDelete}) => {
  return (
    <Modal active={active} setActive={setActive}>
      <Wrapper>
        <Title>
          Удалить карточку
        </Title>
        <Text>
          Отправить карточку организации в архив?
        </Text>
        <Buttons>
          <Cancel onClick={() => setActive(false)}>Отмена</Cancel>
          <Delete onClick={onDelete}>Удалить</Delete>
        </Buttons>
      </Wrapper>
    </Modal>
  );
}
