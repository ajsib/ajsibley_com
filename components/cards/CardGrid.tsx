import React, { useState } from 'react';
import Card from './Card';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  isExpanded: boolean;
  onClick: (height: number) => void;
  position?: 'left' | 'right';
}

interface CardGridProps {
  cards: CardProps[];
}

export default function CardGrid({ cards }: CardGridProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Split the cards into two separate columns
  const leftColumnCards = cards.filter((_, i) => i % 2 === 0);
  const rightColumnCards = cards.filter((_, i) => i % 2 !== 0);

   return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '99%',
      margin: '0 auto'
    }}>
      <div style={{ width: '50%' }}>
        {leftColumnCards.map((card, index) => (
          <Card
            key = {index}
            front={card.front}
            back={card.back}
            isExpanded={expandedCard === index * 2}
            onClick={(height: number) => {
              if (height > 270) {
                setExpandedCard(prevExpandedCard => prevExpandedCard === index * 2 ? null : index * 2); // Toggle the expanded card
              }
            }}
            position="left"
          />
        ))}
      </div>
      <div style={{ width: '50%' }}>
        {rightColumnCards.map((card, index) => (
          <Card
            key = {index}
            front={card.front}
            back={card.back}
            isExpanded={expandedCard === index * 2 + 1}
            onClick={(height: number) => {
              if (height > 270) {
                setExpandedCard(prevExpandedCard => prevExpandedCard === index * 2 + 1 ? null : index * 2 + 1); // Toggle the expanded card
              }
            }}
            position="right"
          />
        ))}
      </div>
    </div>
  );
}
