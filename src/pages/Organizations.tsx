import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {fetchOrganizations} from "../redux/slices/organizationsSlice";
import {organizationsSelector} from "../redux/slices/organizationsSlice";

import {Loader, OrganizationA} from "../components";
import theme from "../theme";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`
const Content = styled.div`
  position: relative;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  margin: auto;
  padding: 60px 0 120px 0;
  
  font-size: 30px;
  color: ${theme.colors.green};
  font-weight: 700;

  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    display: block;
    width: auto;
    padding: 0 70px;

    font-size: 80px;
    color: white;

    border: 10px solid ${theme.colors.green};
    box-shadow: 0 0 0 10px white;
    transform: skew(-10deg) rotate(-10deg);

    @media (max-width: ${theme.media.mob}) {
      padding: 8px 8px 2px 8px;

      font-size: 40px;
    }
  }
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: column;
  width: 100%;
  height: max-content;
  gap: 24px;
  padding: 24px 40px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  width: 100%;
  height: 72px;
  padding: 0 40px;

  border-bottom: 1px solid #E5E5E5;
`;
const Title = styled.button`
  display: flex;
  align-items: center;

  font-size: ${theme.fontSizes.L};
  color: #222222;
  font-weight: 600;
  line-height: 20px;
  text-transform: uppercase;

  background: transparent;
  border: unset;
`

function OrganizationsPage() {
  const dispatch = useAppDispatch();
  const {items, status} = useSelector(organizationsSelector);

  React.useEffect(() => {
    dispatch(fetchOrganizations())
  }, []);

  return (
    <Wrapper>
      <Content>
        {status === 'error' ? (<ErrorInfo>Произошла ошибка</ErrorInfo>) : (
          <>
            {status === 'loading' ? <Loader/> : (
              <>
                <Header>
                  <Title>
                    Список организаций
                  </Title>
                </Header>
                <List>
                  {items.map((organizationData) => (
                    <OrganizationA key={organizationData.id} item={organizationData}/>))}
                </List>
              </>
            )}
          </>)}
      </Content>
    </Wrapper>
  );
}

export default OrganizationsPage;
