import React from 'react';
import styled from '@emotion/styled';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'; // Importing thumb-down icon

const CardContainer = styled.div`
  height: 210px;
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

const F4 = () => {
  return (
    <CardContainer>
      <Headline>Say No to Clickbait 🚫</Headline>
      <Separator />
      <Description>
        Tired of social media manipulating you with engineered content?
      </Description>
      <CallToAction>
         <ThumbDownAltIcon style={{ color: '#D9534F' }}/> Choose authenticity!
      </CallToAction>
    </CardContainer>
  );
};

export default F4;
