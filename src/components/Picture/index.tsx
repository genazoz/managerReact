import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import Close from '../../img/Close.svg'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`
const Image = styled.div<{ filepath: string }>`
  width: 160px;
  height: 160px;
  margin: 0 0 8px 0;

  background-image: url(${props => props.filepath});
  background-size: cover;
  background-position: center;
  border-radius: 2px;
`
const Text = styled.p`
  font-size: ${theme.fontSizes.S}
`
const Title = styled(Text)`
  color: #3B3B3B;
`
const DateWrapper = styled(Text)`
  color: #808080;
`
const Remove = styled.div`
  position: absolute;
  top: 8px;
  left: 132px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;

  cursor: pointer;
  background: #D95151;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
`

type PictureType = {
  filepath: string;
  removePicture: (name: string) => void;
  name: string
}

export const Picture: React.FC<PictureType> = ({filepath, removePicture, name}) => {
  const getDate = () => {
    const today = new Date();
    const dateSrc = today.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return dateSrc;
  }

  return (
    <Wrapper>
      <Remove onClick={() => removePicture(name)}>
        <img src={Close} alt="Vector Icon"/>
      </Remove>
      <Image filepath={filepath}/>
      <Title>{name}</Title>
      <DateWrapper>{getDate()}</DateWrapper>
    </Wrapper>
  );
}
