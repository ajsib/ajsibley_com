import React from 'react';
import styled from '@emotion/styled';

const BackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  font-family: 'Georgia', serif;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
  text-align: center;
`;

const Content = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 5px;
  text-align: center;
  line-height: 1.4; 
`;

const Footer = styled.div`
  font-size: 12px;
  color: #555;
  text-align: center;
  border-top: 0.5px solid #777;
  padding: 5px;
`;

const SwipeIndicator = styled.div`
  font-size: 10px;
  color: #999;
  text-align: right;
  width: 100%;
  padding-right: 5px;
`;

const B3 = () => {
  return (
    <BackContainer>
      <Subtitle>📍 Connect Locally</Subtitle>
      <Content>
        Break free from the digital bubble and immerse yourself in local happenings. From art exhibitions to street parties, find your crowd.
      </Content>
      <Footer>
        Ready to explore your city? <strong>Join now!</strong>
      </Footer>
      <SwipeIndicator>Swipe left to collapse ↩️</SwipeIndicator>
    </BackContainer>
  );
};

export default B3;
