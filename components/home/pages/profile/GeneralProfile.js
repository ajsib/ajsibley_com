import React, {useState, useEffect} from 'react';
import ProfileCard from './ProfileCard';
import TabsCard from './TabsCard';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled, Box } from '@mui/system';
import CardGrid from '../../../CardGrid';
import T1B from '../templates/t1b';
import T1F from '../templates/t1f';
import T1P from '../templates/t1p';

const ProfileCardContainer = styled(Box)`
  position: relative;
  top: 70px;
  margin: auto;
  width: 80%;
  z-index: 1;
`;

const TabsCardContainer = styled(Box)`
  z-index: 2;
  margin-top: 90px;
`;

const GeneralProfile = ({
  profileData,
  setActiveProfile,
  handleReload,
  selectedTab,
  setSelectedTab,
  data,
  setUserProfileOpen
}) => {

  const [cards, setCards] = useState([]);
  const { _id, name, program, yearOfStudy, bio, username, dateJoined, postInfo, network } = profileData;

  const userInfo = {
    _id,
    name,
    program,
    yearOfStudy,
    bio,
    username,
    dateJoined,
    userEmoji: '', // This can be added as per your requirement
    yearOfStudyString: yearOfStudy.toString(), // Assuming yearOfStudy is a number
  };

  useEffect(() => {
    const createdCards = createCards(data);
    setCards(createdCards);
  }, [data]);

  const createCards = (posts) => {
    if (!posts) {
      return [];
    }
    return posts.map((post) => {
      const {
        front: { headline, hook, callToAction, emoji },
        back: { authorName, paragraph, yearOfStudy, program },
        authorProfile: { username, authorID },
      } = post;

      const backComponent = (
        <T1B
          headline={headline}
          author={authorName}
          program={program}
          yearOfStudy={yearOfStudy}
          description={paragraph}
        />
      );

      const frontComponent = (
        <T1F
          header={headline}
          hook={hook}
          callToAction={callToAction}
          emoji={emoji}
        />
      );

      const profileComponent = (
        <T1P
          author={authorName}
          username={username}
          program={program}
          yearOfStudy={yearOfStudy}
          authorID={authorID}
          setActiveProfile={setActiveProfile}
        />
      );

      return {
        front: frontComponent,
        back: backComponent,
        profile: profileComponent,
        hasRight: true,
        hasLeft: false,
      };
    });
  };

  const handleBackClick = () => {
    handleReload(); // Call handleReload when going back
    setUserProfileOpen(false); // Close the user profile
    setActiveProfile(null);
  };
  
  return (
    <div>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBackClick}
        style={{ 
        position: 'absolute',  // or 'absolute' if you want it relative to the nearest positioned ancestor
        top: '115px', 
        left: '20px',  // <-- 10 pixels from the left edge
        zIndex: 3 
        }}
        >
    Back
</Button>
      
      {/* ProfileCard Component */}
      <ProfileCardContainer>
        <ProfileCard userInfo={userInfo} canEdit={false} />
      </ProfileCardContainer>

      {/* TabsCard Component */}
      <TabsCardContainer>
        <TabsCard
          selectedTab={selectedTab}
           setSelectedTab={setSelectedTab}
           data={data}
        />
      </TabsCardContainer>

      {/* We want to put the cardgrid here */}
      <CardGrid cards={cards} />
    </div>
  );
};

export default GeneralProfile;
