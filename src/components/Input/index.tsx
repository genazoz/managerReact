import React from "react";
import styled from "styled-components";

const MaterialInput = styled.div`
  position: relative;

  width: 400px;
  height: 40px;
`;
const InputEl = styled.input<{ isError: boolean }>`
  width: 100%;
  height: 100%;
  padding: 10px 12px;

  &:focus ~ label,
  &:valid ~ label {
    top: 0;
    left: 8px;

    padding: 0 4px;

    font-size: 10px;
  }

  &:focus ~ span {
    border-color: #3B3B3B;
  }

  &:hover ~ span {
    border-color: #808080;
  }

  &:focus {
    border: none;
  }
`
const Border = styled.span<{ isError: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border: 1px solid #CDCDCD;
  border-radius: 2px;

  pointer-events: none;

  transition: .2s border-color;

  ${props => props.isError && 'border-color: red !important;'}
`
const Label = styled.label<{ isError: boolean }>`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 12px;

  line-height: 20px;
  color: #808080;
  text-transform: uppercase;

  pointer-events: none;
  transform: translateY(-50%);

  transition: .2s;

  ${props => props.isError && 'color: red;'}
  
  &::before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 60%;
    margin: auto;

    background: #FFFFFF;

    transition: .2s background-color;
  }
`

type propsType = {
  title: string;
  isError?: boolean;
  type?: string;
  text: string;
  id?: string;
  onChange: (e: any) => void
}

export const Input: React.FC<propsType> = ({title, isError = false, type = 'text', text, id, onChange}) => {
  const [val, setValue] = React.useState(text)

  const changeInput = (e: any) => {
    setValue(e.target.value);
    onChange(e);
  }

  return (
    <MaterialInput>
      <InputEl type={type} value={val} id={id} isError={isError} required onChange={(e) => changeInput(e)}/>
      <Label htmlFor="" isError={isError}>{title}</Label>
      <Border isError={isError}/>
    </MaterialInput>
  );
}
