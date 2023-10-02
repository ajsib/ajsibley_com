import React, { useState } from 'react';
import CardGrid from '../../components/CardGrid';
import FullScreenCard from '../../components/FullScreenCard';
import F1 from '../../components/cards/profile-setup/f1';
import B1 from '../../components/cards/profile-setup/b1';
import F2 from '../../components/cards/profile-setup/f2';
import B2 from '../../components/cards/profile-setup/b2';
import { Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { submitProfile } from '../../components/profile-setup-submit'

// Define styled components
const PageContainer = styled.div`
  font-family: 'Georgia', serif;
  margin: 20px;
`;

const PageTitle = styled.h1`
  font-size: 23px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: center;
`;

const WelcomeDescription = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0px 0;
  text-align: center;
  line-height: 1.4;
`;

const SubmitButtonContainer = styled(Box)`
  margin-top: 3rem;
  text-align: center;
`;

const ProfileSetup = () => {

  type FormData = {
    name: string;
    program: string;
    yearOfStudy: string;
    bio: string;
    clubsAndOrgs: string;
    contactInfo: string;
    [key: string]: string;
  };

  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    program: '',
    yearOfStudy: '',
    bio: '',
    clubsAndOrgs: '',
    contactInfo: ''
  });

  const handleInputChange = (newData: React.SetStateAction<{ name: string; program: string; yearOfStudy: string; bio: string; clubsAndOrgs: string; contactInfo: string; }>) => {
    setFormData({ ...formData, ...newData });
  };

  const checkRequiredFields = () => {
    // Add all required fields here
    const requiredFields = ['name', 'program', 'yearOfStudy', 'bio'];
    return requiredFields.every(field => Boolean(formData[field]));
  };

  const cards = [
    { front: <F1 />, back: <B1 formData={formData} handleInputChange={handleInputChange} /> },
    { front: <F2 />, back: <B2 formData={formData} handleInputChange={handleInputChange} /> },
  ];

  return (
    <PageContainer>
      <PageTitle>Profile Setup</PageTitle>
      <ReactMarkdown> --- </ReactMarkdown>
      <WelcomeDescription>
        Here we will get you started with a basic Profile! <br />
        Don't worry, you can always edit your profile later. <br />
      </WelcomeDescription>
      <CardGrid cards={cards} />
      <SubmitButtonContainer>
        {checkRequiredFields() ? (
          <Button variant="contained" color="primary" onClick={() => submitProfile(formData)}>
            Build Profile
          </Button>
        ) : (
          <Typography variant="body1" color="error">
            Please Complete all Required Fields.
          </Typography>
        )}
      </SubmitButtonContainer>
    </PageContainer>
  );
};

export default ProfileSetup;