// CardGrid.tsx
import React, { useState }  from 'react';
import Card from './Card';
import FullScreenCard from './FullScreenCard';
import { AnimatePresence } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  width ?: string;
}

interface CardGridProps {
  cards: CardProps[];
}

export default function CardGrid({ cards }: CardGridProps) {
  const [activeCard, setActiveCard] = useState<React.ReactElement | null>(null);
  const leftColumnCards = cards.filter((_, i) => i % 2 === 0);
  const rightColumnCards = cards.filter((_, i) => i % 2 !== 0);
  const cardWidth = '100%';  // <--- This changes the width of the card

  const openFullScreenCard = (cardContent: React.ReactElement) => {
    setActiveCard(cardContent);
  };

  const closeFullScreenCard = () => {
    setActiveCard(null);
  };

  return (
    <div 
        // 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '93%', // this changes the width of the card grid parent div
          margin: '0 auto',
          position: 'relative',
          maxWidth: '450px',
        }}>
      <div 
        style={{ 
          width: '40%',  // this changes the width of the left column div
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
          // position: 'relative',
          alignItems: 'flex-end',
        }}>
        {leftColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            openFullScreenCard={openFullScreenCard}
            width={cardWidth}
          />
        ))}
      </div>
      <div style={{width: '15px'}}></div>
      <div
        style={{
          width: '40%',  // this changes the width of the right column div
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
          // position: 'relative',
          alignItems: 'flex-start',
        }}>
        {rightColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            openFullScreenCard={openFullScreenCard}
            width={cardWidth}
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