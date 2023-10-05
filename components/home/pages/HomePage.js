import React, { useState, useEffect, useCallback } from 'react';
import CardGrid from '../../CardGrid';
import T1B from '../pages/templates/t1b';
import T1F from '../pages/templates/t1f';
import box from '@mui/material';
import { Box } from '@mui/system';

const Home = ({ cardsData, loadMoreCards, isLoading, hasMore }) => {
  const [cards, setCards] = useState([]);

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
      document.documentElement.offsetHeight - 200
    ) {
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

  return (
    <div style={{ textAlign: 'center', padding: '1px' }}>
      <Box sx={{ height: '20px' }}/>
      <CardGrid cards={cards} />

    </div>
  );
};

export default React.memo(Home);
