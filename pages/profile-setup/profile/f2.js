import React from 'react';
import styled from '@emotion/styled';
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Complete
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Required not filled
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'; // Optional not filled

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

const FrontCard2 = ({ requiredFilled, optionalFilled }) => {
  const getCardStatus = () => {
    if (!requiredFilled) return { icon: <ErrorOutlineIcon style={{ color: 'red' }} />, text: 'Incomplete' };
    if (requiredFilled && !optionalFilled) return { icon: <WarningRoundedIcon style={{ color: 'green' }} />, text: 'Add Optional' };
    return { icon: <DoneAllIcon style={{ color: 'blue' }} />, text: 'Complete' }; // All fields filled
  };

  const status = getCardStatus();

  return (
    <CardContainer>
      <Headline>What are your hobbies?</Headline>
      <Separator />
      <Description>
        We will suggest you communities based on your hobbies
      </Description>
      <CallToAction>
         {status.icon} {status.text}
      </CallToAction>
    </CardContainer>
  );
};

export default FrontCard2;
