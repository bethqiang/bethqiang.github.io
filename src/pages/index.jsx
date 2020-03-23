import React from 'react';
import styled from 'styled-components';

import indexImg from '../../static/index-page-photo.jpg';
import Layout from '../components/Layout';

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 75px;
  margin-bottom: 60px;
`;

const IndexImg = styled.img`
  height: 250px;
  width: 250px;
  border-radius: 50%;
`;

const NameContainer = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;

const TextContainer = styled.div`
  text-align: center;
`;

const OmbreDivider = styled.div`
  height: 4px;
  width: 400px;
  background-image: linear-gradient(to right, ${(props) => props.theme.colors.pink}, ${(props) => props.theme.colors.purple});
  margin: 20px auto;
`;

function IndexPage() {
  return (
    <Layout>
      <ImgContainer>
        <IndexImg src={indexImg} />
      </ImgContainer>
      <NameContainer>
        <h1>Beth Qiang</h1>
      </NameContainer>
      <TextContainer>
        <p>Software Engineer</p>
        <p>Currently in Durham, North Carolina</p>
      </TextContainer>
      <OmbreDivider />
      <TextContainer>
        <p>My site is currently under construction.</p>
        <p>Please excuse the mess and visit again soon!</p>
        <p>If you need me, I can be reached at beth@bethqiang.com.</p>
      </TextContainer>
    </Layout>
  );
}

export default IndexPage;
