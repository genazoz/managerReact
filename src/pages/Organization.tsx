import React, {useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import {useParams} from "react-router-dom";
import {OrganizationType} from "../redux/slices/organizationsSlice";
import {ContactType} from "../redux/slices/contactsSlice";
import {
  Footer,
  Loader,
  OrganizationForm,
  OrganizationHeader,
  ContactForm,
  DeleteOrganizationModal, PicturesForm
} from "../components";
import {useSelector} from "react-redux";
import {settingsSelector} from "../redux/slices/settingsSlice";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const Content = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 24px 40px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: max-content;
  margin: 0 0 32px 0;
`;
const Title = styled.h4`
  margin: 0 0 24px 0;
`;
const Br = styled.span`
  display: flex;
  width: 100%;
  height: 1px;
  margin: 0 0 32px 0;

  background: #E5E5E5;
`;

function OrganizationPage() {
  const {id} = useParams();
  const [organization, setOrganization] = React.useState<OrganizationType | null>();
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [contact, setContact] = React.useState<ContactType | null>();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const {serverUrl, token} = useSelector(settingsSelector);

  type Photo = {
    filepath: string;
    name: string;
    thumbpath: string;
  }
  type Contract = {
    no: string;
    // issue_date: string;
  }
  type OrganizationFormType = {
    name: string;
    shortName: string;
    businessEntity: string;
    contract: Contract;
    type: string[];
  }
  type ContactFormType = {
    lastname: string;
    firstname: string;
    patronymic: string;
    phone: string;
    email: string;
  }

  React.useEffect(() => {
    const fetchProduct = async () => {
      const organizationUrl = `${serverUrl}/companies/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };

      try {
        const organization = await axios.get<OrganizationType>(organizationUrl, config);
        setOrganization(organization.data);
        setPhotos(organization.data.photos)

        const contactUrl = `${serverUrl}/contacts/${organization.data.contactId}`;
        const contact = await axios.get<ContactType>(contactUrl, config);
        setContact(contact.data);
      } catch (err) {
        alert('Ошибка при запросе! Данные выведены в консоли.');
        console.log(err);
      }
    }

    fetchProduct();
  }, []);

  const handlerSubmit = async () => {
    const files = fileRef.current?.files;

    if (files) {
      const obj = files[0];
      const url = `${serverUrl}/companies/${id}/image`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      let formData = new FormData();
      formData.append("file", obj);

      try {
        const {data} = await axios.post(url, formData, config);
        setPhotos([...photos, data])
      } catch (err) {
        alert('Ошибка при запросе! Данные выведены в консоли.');
        console.log(err);
      }
    }
  }
  const onClickAddPhoto = (e: any) => {
    if (e.target !== e.currentTarget)
      e.currentTarget.click()
  }
  const updateOrganizationInfo = async (formData: OrganizationFormType) => {
    const issue_date = organization?.contract.issue_date;
    setOrganization(null);
    const jsonData = formData;
    const url = `${serverUrl}/companies/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };

    try {
      const {data} = await axios.patch(url, jsonData, config);

      if (data)
        setOrganization({
          ...data,
          contract: {no: data.contract.no, issue_date: issue_date}
        });
    } catch (err) {
      alert('Ошибка при запросе! Данные выведены в консоли.');
      console.log(err);
    }
  }
  const updateContactInfo = async (formData: ContactFormType) => {
    setContact(null);
    const jsonData = formData;
    const url = `${serverUrl}/contacts/${organization?.contactId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };

    try {
      const {data} = await axios.patch(url, jsonData, config);

      if (data)
        setContact(data);
    } catch (err) {
      alert('Ошибка при запросе! Данные выведены в консоли.');
      console.log(err);
    }
  }
  const archiveOrganization = async () => {
    const url = `${serverUrl}/companies/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    try {
      const response = await axios.delete(url, config);

      const status = response?.status;

      if (status === 200) {
        setShowModal(false);
        alert(`Успешно! Данные выведены в консоли.`)
        console.log(response)
      }
    } catch (err) {
      alert('Ошибка при запросе! Данные выведены в консоли.');
      console.log(err);
    }
  }
  const removePicture = async (name: string) => {
    const url = `${serverUrl}/companies/${id}/image/${name}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    try {
      await axios.delete(url, config);
    } catch (err) {
      alert('Ошибка при запросе! Данные выведены в консоли.');
      console.log(err);
    }
  }

  return (
    <Wrapper>
      <DeleteOrganizationModal active={showModal} setActive={setShowModal} onDelete={() => archiveOrganization()}/>
      <OrganizationHeader onDelete={() => setShowModal(true)}/>
      {!(organization && contact) ? (<Loader/>) : (
        <Content>
          <Container>
            <Title>{organization.shortName}</Title>
            <OrganizationForm data={organization} changeInfo={(formData) => updateOrganizationInfo(formData)}/>
            <ContactForm data={contact} changeInfo={(formData) => updateContactInfo(formData)}/>
            <Br/>
            <PicturesForm photos={photos} removePicture={(name) => removePicture(name)} fileRef={fileRef}
                          handlerSubmit={handlerSubmit} onClickAddPhoto={(e) => onClickAddPhoto(e)}/>
          </Container>
          <Footer/>
        </Content>
      )}
    </Wrapper>
  );
}

export default OrganizationPage;
