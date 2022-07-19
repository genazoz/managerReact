import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import {Button, Picture} from "../index";

const Title = styled.p`
  margin: 0 0 20px 0;

  font-weight: 300;
  font-size: ${theme.fontSizes.L};
  text-transform: uppercase;
`;
const Pictures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 0 0 20px 0;
`
const Label = styled.label`
  z-index: 1;
  display: flex;
  position: relative;
  cursor: pointer;
`
const InputFile = styled.input`
  display: none;
`
const AddIcon = (<svg width="16" height="16" viewBox="0 0 16 16" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd"
        d="M1.90002 7.99999C1.90002 7.66862 2.16865 7.39999 2.50002 7.39999H13.5C13.8314 7.39999 14.1 7.66862 14.1 7.99999C14.1 8.33136 13.8314 8.59999 13.5 8.59999H2.50002C2.16865 8.59999 1.90002 8.33136 1.90002 7.99999Z"/>
  <path fillRule="evenodd" clipRule="evenodd"
        d="M8.00002 1.89999C8.3314 1.89999 8.60002 2.16862 8.60002 2.49999V13.5C8.60002 13.8314 8.3314 14.1 8.00002 14.1C7.66865 14.1 7.40002 13.8314 7.40002 13.5V2.49999C7.40002 2.16862 7.66865 1.89999 8.00002 1.89999Z"/>
</svg>)

type Photo = {
  name: string;
  filepath: string;
  thumbpath: string;
}
type PicturesFormProps = {
  photos: Photo[];
  removePicture: (name: string) => void;
  fileRef: React.RefObject<HTMLInputElement>;
  handlerSubmit: () => void;
  onClickAddPhoto: (e: any) => void;
}

export const PicturesForm: React.FC<PicturesFormProps> = React.forwardRef(({photos, fileRef, handlerSubmit, onClickAddPhoto, removePicture}, ref) =>
  (<>
    <Title>Приложенные фото</Title>
    <InputFile id="file-loader-button" ref={fileRef} onChange={handlerSubmit} type="file"
               accept="image/png, image/gif, image/jpeg"/>
    <Pictures>
      {photos.map(obj => (
        <Picture filepath={obj.filepath} name={obj.name} removePicture={(name) => removePicture(name)}
                 key={obj.filepath}/>
      ))}
    </Pictures>
    <Label htmlFor="file-loader-button" onClick={onClickAddPhoto}>
      <Button text={'Добавить изображение'} icon={AddIcon}/>
    </Label>
  </>)
)
