// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../../utils/userProfile/UserInfo';
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
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const { profile, user } = getUserInfo();
    if (profile && user) {
      setUserInfo({
        name: profile.name,
        username: user.username,
        program: profile.program,
        yearOfStudy: profile.yearOfStudy,
        yearOfStudyString: profile.yearOfStudyString,
        bio: profile.bio,
        userEmoji: profile.programEmoji,
        dateJoined: user.dateJoinedHR
      });
    }
  }, []);

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
      <ProfileCard userInfo={userInfo} />
    </ProfileCardContainer>
    <TabsCardContainer>
      <TabsCard />
    </TabsCardContainer>
    </Box>
  );
};

export default ProfilePage;
