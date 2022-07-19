import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import {Button} from "../Button";
import {Input} from "../Input";
import {ContactType} from "../../redux/slices/contactsSlice";
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

type FormType = {
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
}
type PropsType = {
  data: ContactType;
  changeInfo: (formData: FormType) => void;
}

export const ContactForm: React.FC<PropsType> = ({data, changeInfo}) => {
  const contactDataFiltered = {
    lastname: data.lastname,
    firstname: data.firstname,
    patronymic: data.patronymic,
    phone: data.phone,
    email: data.email,
  };
  const [editMainInfo, setEditMainInfo] = React.useState(false);
  const [formData, setFormData] = React.useState(contactDataFiltered);
  const [lastnameError, setLastnameError] = React.useState<string>('');
  const [firstnameError, setFirstnameError] = React.useState<string>('');
  const [patronymicError, setPatronymicError] = React.useState<string>('');
  const [phoneError, setPhoneError] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');

  const firstnameHandler = (e: any) => {
    const value = e.target.value.length < 3 ? 'Имя должно быть не короче 3-х символов' : '';
    setFirstnameError(value);
  }
  const lastnameHandler = (e: any) => {
    const value = e.target.value.length < 3 ? 'Фамилия должнф быть не короче 3-х символов' : '';
    setLastnameError(value);
  }
  const patronymicHandler = (e: any) => {
    const value = e.target.value.length < 2 ? 'Отчество должно быть не короче 2-х символов' : '';
    setPatronymicError(value);
  }
  const phoneHandler = (e: any) => {
    const value = e.target.value.length !== 11 ? 'Телефон должен быть равен 11-ти символам' : '';
    setPhoneError(value);
  }
  const emailHandler = (e: any) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const email = e.target.value;
    const valid = reg.test(email);
    const value = !valid ? 'Email введен неверно' : '';
    setEmailError(value)
  }
  const onSubmitForm = (e: any) => {
    e.preventDefault();

    changeInfo(formData);
  };
  const handle = (e: any) => {
    const inputId = e.target.id;
    const data: any = formData;

    switch (inputId) {
      case 'lastname':
        lastnameHandler(e);
        break;
      case 'firstname':
        firstnameHandler(e);
        break;
      case 'patronymic':
        patronymicHandler(e);
        break;
      case 'phone':
        phoneHandler(e);
        break;
      case 'email':
        emailHandler(e);
        break;
    }
    data[inputId] = e.target.value;

    setFormData(data);
  }
  const toggleEditMode = () => {
    if (editMainInfo) {
      setFormData(contactDataFiltered);

      setFirstnameError('');
      setLastnameError('');
      setPatronymicError('');
      setPhoneError('');
      setEmailError('');
    }
    setEditMainInfo(!editMainInfo)
  }

  return (
    <>
      <Title>
        Контактные данные
        <img src={Edit} alt="Edit Icon" onClick={toggleEditMode}/>
      </Title>
      {!editMainInfo ? (
        <Infos>
          <Info>
            <InfoTitle>ФИО:</InfoTitle>
            <InfoText>{data.lastname} {data.firstname} {data.patronymic}</InfoText>
          </Info>
          <Info>
            <InfoTitle>Телефон:</InfoTitle>
            <InfoText>{data.phone.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5')}</InfoText>
          </Info>
          <Info>
            <InfoTitle>Эл. почта:</InfoTitle>
            <InfoText><a href="mailto:grigoriev@funeral.com">{data.email}</a></InfoText>
          </Info>
        </Infos>
      ) : (
        <Form onSubmit={onSubmitForm}>
          <Input id={'firstname'} title={firstnameError ? firstnameError : 'Имя'} text={formData.firstname}
                 isError={Boolean(firstnameError)} onChange={(e) => handle(e)}/>
          <Input id={'lastname'} title={lastnameError ? lastnameError : 'Фамилия'} text={formData.lastname}
                 isError={Boolean(lastnameError)} onChange={(e) => handle(e)}/>
          <Input id={'patronymic'} title={patronymicError ? patronymicError : 'Отчество'} type={'text'}
                 isError={Boolean(patronymicError)}
                 text={formData.patronymic} onChange={(e) => handle(e)}/>
          <Input id={'phone'} title={phoneError ? phoneError : 'Телефон'}
                 text={formData.phone} isError={Boolean(phoneError)} onChange={(e) => handle(e)}/>
          <Input id={'email'} title={emailError ? emailError : 'Email'} text={formData.email}
                 isError={Boolean(emailError)} onChange={(e) => handle(e)}/>
          {!lastnameError && !firstnameError && !patronymicError && !phoneError && !emailError &&
            <Button text={'Сохранить'} icon={AddIcon}/>}
        </Form>
      )}
    </>
  );
}
