import React from "react";
import styled from "styled-components";
import {OrganizationType} from "../../redux/slices/organizationsSlice";
import {Link} from "react-router-dom";

const Organization = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: max-content;
  padding: 24px 40px  ;
  
  border-radius: 15px;
  background: #f6f6f6;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;

  font-size: 18px;
  font-weight: 700;
  color: #222222;
`
const Subtitle = styled.p`
  color: #222222;
`

type OrganizationProps = {
  item: OrganizationType
}

export const OrganizationA: React.FC<OrganizationProps> = ({item}) => {
  return (
    <Link to={`/organizations/${item.id}`}>
      <Organization>
        <Title>
          Фирма:
        </Title>
        <Subtitle>
          {item.name}
        </Subtitle>
      </Organization>
    </Link>
  );
}
