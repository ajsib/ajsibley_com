// ./pages/profile-setup/cards/b1.js
import React from 'react';
import styled from '@emotion/styled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  font-family: 'Georgia', serif;
  margin: 0;
`;

const Headline = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
  text-align: center;
`;

const Separator = styled.hr`
  width: 80%;
  border: 0.5px solid #777;
  margin: 5px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #777;
  margin: 2px 0;
  text-align: justify;
  line-height: 1.2;
`;

const CallToAction = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #333;
`;

const BasicInfoPage = () => {
  return (
    <CardContainer>
      <Headline>Basic Info</Headline>
      <Separator />
      <Description>
        Name*: <br />
        Program*:  <br />
        Year of Study*: <br />
        Bio*:
      </Description>
      <CallToAction>
        <ArrowForwardIcon style={{ color: '#7393B3' }} /> Tap the card!
      </CallToAction>
    </CardContainer>
  );
};

export default BasicInfoPage;
