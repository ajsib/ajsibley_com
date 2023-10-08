import React, { useState, useEffect, useCallback } from 'react';
import CardGrid from '../../CardGrid';
import T1B from '../pages/templates/t1b';
import T1F from '../pages/templates/t1f';
import { Box } from '@mui/system';
import { motion, useAnimation } from 'framer-motion';

const Home = ({ cardsData, loadMoreCards, isLoading, hasMore }) => {
  const [cards, setCards] = useState([]);
  const controls = useAnimation();

  const createCards = (posts) => {
    if (!posts) {
      return [];
    }
    return posts.map((post) => {
      const {
        front: { headline, hook, callToAction, emoji },
        back: { authorName, paragraph, yearOfStudy, program },
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

      return {
        front: frontComponent,
        back: backComponent,
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
    controls.start({ y: [100, -10, 0], opacity: [0, 1], transition: { type: 'spring', damping: 20, stiffness: 502 } });
  }, [controls]);

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

  return (
    <div style={{ textAlign: 'center', padding: '1px', background:'#fff' }}>
      <Box sx={{ height: '20px' }}/>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <CardGrid cards={cards} />
      </motion.div>
    </div>
  );
};

export default React.memo(Home);