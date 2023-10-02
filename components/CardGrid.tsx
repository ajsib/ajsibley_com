// CardGrid.tsx
import React, { useState }  from 'react';
import Card from './Card';
import FullScreenCard from './FullScreenCard';

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
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      paddingLeft: '-3px',  
      paddingRight: '11px',
    }}>
      <div style={{ 
        width: '50%',
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-start',
      }}>
        {leftColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            openFullScreenCard={openFullScreenCard}  // Passing the prop here
          />
        ))}
      </div>
      <div style={{
        width: '50%',
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-end',
      }}>
        {rightColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            openFullScreenCard={openFullScreenCard}  // Passing the prop here
          />
        ))}
      </div>
      {activeCard && (
        <FullScreenCard content={activeCard} closeCard={closeFullScreenCard} />
      )}
    </div>
  );
}