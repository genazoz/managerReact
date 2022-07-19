import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import {Button} from "../Button";
import {Input} from "../Input";
import {OrganizationType} from "../../redux/slices/organizationsSlice";
import Edit from "../../img/Edit.svg";

const AddIcon = (<svg width="16" height="16" viewBox="0 0 16 16" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd"
        d="M1.90002 7.99999C1.90002 7.66862 2.16865 7.39999 2.50002 7.39999H13.5C13.8314 7.39999 14.1 7.66862 14.1 7.99999C14.1 8.33136 13.8314 8.59999 13.5 8.59999H2.50002C2.16865 8.59999 1.90002 8.33136 1.90002 7.99999Z"/>
  <path fillRule="evenodd" clipRule="evenodd"
        d="M8.00002 1.89999C8.3314 1.89999 8.60002 2.16862 8.60002 2.49999V13.5C8.60002 13.8314 8.3314 14.1 8.00002 14.1C7.66865 14.1 7.40002 13.8314 7.40002 13.5V2.49999C7.40002 2.16862 7.66865 1.89999 8.00002 1.89999Z"/>
</svg>)

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 0 32px 0;
`;
const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 0 32px 0;
`;
const Title = styled.p`
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;

  font-weight: 300;
  font-size: ${theme.fontSizes.L};
  text-transform: uppercase;

  img {
    margin: 0 0 0 12px;

    cursor: pointer;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
`;
const InfoTitle = styled.span`
  width: 150px;
  margin: 0 12px 0 0;

  font-weight: 300;
  color: #3B3B3B;
  letter-spacing: 0.25px;
`;
const InfoText = styled.span`
  color: #3B3B3B;
  letter-spacing: 0.25px;

  a {
    color: ${theme.colors.green}
  }
`;

type Contract = {
  no: string;
}
type FormType = {
  name: string;
  shortName: string;
  businessEntity: string;
  contract: Contract;
  type: string[];
}
type PropsType = {
  data: OrganizationType;
  changeInfo: (formData: FormType) => void;
}

export const OrganizationForm: React.FC<PropsType> = ({data, changeInfo}) => {
  const organizationDataFiltered = {
    name: data.name,
    shortName: data.shortName,
    businessEntity: data.businessEntity,
    contract: {
      no: data.contract.no,
    },
    type: data.type
  };
  const [editMainInfo, setEditMainInfo] = React.useState(false);
  const [formData, setFormData] = React.useState(organizationDataFiltered);
  const [nameError, setNameError] = React.useState<string>('');
  const [shortNameError, setShortNameError] = React.useState<string>('');
  const [businessEntityError, setBusinessEntityError] = React.useState<string>('');
  const [noError, setNoError] = React.useState<string>('');
  const [typeError, setTypeError] = React.useState<string>('');

  const shortNameHandler = (e: any) => {
    const value = e.target.value.length < 3 ? 'Название должно быть не короче 3-х символов' : '';
    setShortNameError(value);
  }
  const nameHandler = (e: any) => {
    const value = e.target.value.length < 3 ? 'Название должно быть не короче 3-х символов' : '';
    setNameError(value);
  }
  const businessEntityHandler = (e: any) => {
    const value = e.target.value.length < 2 ? 'Название должно быть не короче 2-х символов' : '';
    setBusinessEntityError(value);
  }
  const noHandler = (e: any) => {
    const value = e.target.value < 1 ? 'Номер не может быть меньше одного' : '';
    setNoError(value);
  }
  const typeHandler = (e: any) => {
    const variants = [
      'agent',
      'contractor'
    ]
    const inputValues = e.target.value.split(', ');

    inputValues.forEach((cur: string) => {
      const findedValues = variants.map((item: string) => item === cur);
      const findedEl = findedValues.find((item: boolean) => item);

      const value = !findedEl ? `Типа "${cur}" не существует. Пример типа: ${[...variants].join(', ')}` : '';
      setTypeError(value)
    })
  }
  const onSubmitForm = (e: any) => {
    e.preventDefault();

    changeInfo(formData);
  };
  const handle = (e: any) => {
    const inputId = e.target.id;
    const data: any = formData;

    switch (inputId) {
      case 'name':
        nameHandler(e);
        data[inputId] = e.target.value;
        break;
      case 'shortName':
        shortNameHandler(e);
        data[inputId] = e.target.value;
        break;
      case 'businessEntity':
        businessEntityHandler(e);
        data[inputId] = e.target.value;
        break;
      case 'no':
        noHandler(e);
        data['contract'][inputId] = e.target.value;
        break;
      case 'type':
        typeHandler(e);
        data[inputId] = e.target.value.split(', ');
        break;
    }

    setFormData(data);
  }
  const toggleEditMode = () => {
    if (editMainInfo) {
      setFormData(organizationDataFiltered);

      setShortNameError('');
      setNameError('');
      setBusinessEntityError('');
      setNoError('');
      setTypeError('');
    }
    setEditMainInfo(!editMainInfo)
  }
  const getFormattedIssueDate = () => {
    const issue_date = data.contract.issue_date;

    if (!issue_date)
      return '';

    const date = new Date(issue_date.split('T')[0]).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    return date;
  }

  return (
    <>
      <Title>
        Общая информация
        <img src={Edit} alt="Edit Icon" onClick={toggleEditMode}/>
      </Title>
      {!editMainInfo ? (
        <Infos>
          <Info>
            <InfoTitle>Полное название:</InfoTitle>
            <InfoText>{data.name}</InfoText>
          </Info>
          <Info>
            <InfoTitle>Договор:</InfoTitle>
            <InfoText>{`${data.contract.no} от ${getFormattedIssueDate()}`}</InfoText>
          </Info>
          <Info>
            <InfoTitle>Форма:</InfoTitle>
            <InfoText>{data.businessEntity}</InfoText>
          </Info>
          <Info>
            <InfoTitle>Тип:</InfoTitle>
            <InfoText>{[...data.type].join(', ')}</InfoText>
          </Info>
        </Infos>
      ) : (
        <Form onSubmit={onSubmitForm}>
          <Input id={'shortName'} title={shortNameError ? shortNameError : 'Название'} text={formData.shortName}
                 isError={Boolean(shortNameError)} onChange={(e) => handle(e)}/>
          <Input id={'name'} title={nameError ? nameError : 'Полное название'} text={formData.name}
                 isError={Boolean(nameError)} onChange={(e) => handle(e)}/>
          <Input id={'no'} title={noError ? noError : 'Номер договора'} type={'number'} isError={Boolean(noError)}
                 text={formData.contract.no} onChange={(e) => handle(e)}/>
          <Input id={'businessEntity'} title={businessEntityError ? businessEntityError : 'Форма'}
                 text={formData.businessEntity} isError={Boolean(businessEntityError)} onChange={(e) => handle(e)}/>
          <Input id={'type'} title={typeError ? typeError : 'Тип'} text={[...formData.type].join(', ')}
                 isError={Boolean(typeError)} onChange={(e) => handle(e)}/>
          {!shortNameError && !nameError && !noError && !businessEntityError && !typeError &&
            <Button text={'Сохранить'} icon={AddIcon}/>}
        </Form>
      )}
    </>
  );
}
