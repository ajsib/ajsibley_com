import React, { useState, useEffect, useCallback } from 'react';
import CardGrid from '../../CardGrid';
import T1B from '../pages/templates/t1b';
import T1F from '../pages/templates/t1f';
import T1P from '../pages/templates/t1p';
import { Box } from '@mui/system';
import { motion, useAnimation } from 'framer-motion';
import GeneralProfile from '../pages/profile/GeneralProfile';

const Home = ({ cardsData, loadMoreCards, isLoading, hasMore, selectedTab, setSelectedTab, data, setProfileId, setUserProfileOpen }) => {
  const [cards, setCards] = useState([]);
  const controls = useAnimation();
  const [activeProfile, setActiveProfile] = useState(null);
  const [reload, setReload] = useState(false);

  const createCards = (posts) => {
    if (!posts) {
      return [];
    }
    return posts.map((post) => {
      const {
        _id,
        front: { headline, hook, callToAction, emoji },
        back: { authorName, paragraph, yearOfStudy, program },
        authorProfile: { username, authorID },
      } = post;

      setProfileId(post.authorProfile.authorID);

      const backComponent = (
        <T1B
          headline={headline}
          author={authorName}
          program={program}
          yearOfStudy={yearOfStudy}
          description={paragraph}
          postId={_id}
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
        hasLeft: true,
      };
    });
  };

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 800) {
      loadMoreCards();
    }
  }, [isLoading, hasMore, loadMoreCards]);

  useEffect(() => {
    if (!cardsData.length && !isLoading && hasMore) {
      loadMoreCards();
    } else {
      setCards(createCards(cardsData));
    }
  }, [cardsData, isLoading, hasMore, loadMoreCards]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleReload = () => {
    setReload(!reload);
  }

  useEffect(() => {
    if (!cardsData.length && !isLoading && hasMore) {
      loadMoreCards();
    } else {
      setCards(createCards(cardsData));
    }
    controls.start({ y: [100, -10, 0], opacity: [0, 1], transition: { type: 'spring', damping: 20, stiffness: 502 } });
    
  
  }, [isLoading, reload]);
  

  return (
    <div style={{ textAlign: 'center', padding: '1px', background: '#fff' }}>
      {activeProfile ? (
        setUserProfileOpen(true),
        <GeneralProfile 
          profileData={activeProfile} 
          setActiveProfile={setActiveProfile} 
          handleReload={handleReload} 
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          data={data}
          setUserProfileOpen={setUserProfileOpen}
        />
      ) : (
        <>
          <Box sx={{ height: '20px' }} />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={controls}
          >
            <CardGrid cards={cards} />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default React.memo(Home);