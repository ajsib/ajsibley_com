// ProfilePage.js
import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import ProfileCard from './profile/ProfileCard';
import TabsCard from './profile/TabsCard';

const ProfileCardContainer = styled(Box)`
  position: fixed;
  top: 120px;
  margin: auto;
  z-index: 1;
`;

const TabsCardContainer = styled(Box)`
  z-index: 2;
  margin-top: 380px;
`;

const ProfilePage = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
    <ProfileCardContainer>
      <ProfileCard/>
    </ProfileCardContainer>
    <TabsCardContainer>
      <TabsCard />
    </TabsCardContainer>
    </Box>
  );
};

export default ProfilePage;
