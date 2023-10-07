// CardGrid.tsx
import React, { useState }  from 'react';
import Card from './Card';
import FullScreenCard from './FullScreenCard';
import { AnimatePresence } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
}

interface CardGridProps {
  cards: CardProps[];
}

export default function CardGrid({ cards }: CardGridProps) {
  const [activeCard, setActiveCard] = useState<React.ReactElement | null>(null);
  const leftColumnCards = cards.filter((_, i) => i % 2 === 0);
  const rightColumnCards = cards.filter((_, i) => i % 2 !== 0);

  const openFullScreenCard = (cardContent: React.ReactElement) => {
    setActiveCard(cardContent);
  };

  const closeFullScreenCard = () => {
    setActiveCard(null);
  };

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '380px', 
        margin: '0 auto',
        position: 'relative',
        maxWidth: '380px',
      }}>
      <div style={{ 
        width: '45%',
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-start',
      }}>
        {leftColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            openFullScreenCard={openFullScreenCard}
          />
        ))}
      </div>
      <div style={{flex: 0.25}}></div>
      <div style={{
        width: '45%',
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-end',
      }}>
        {rightColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            openFullScreenCard={openFullScreenCard}
          />
        ))}
      </div>
      <AnimatePresence mode='wait'>
        {activeCard && (
          <FullScreenCard content={activeCard} closeCard={closeFullScreenCard} />
        )}
      </AnimatePresence>
    </div>
  );
}
