// CardGrid.tsx file
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
      alignItems: 'center',
      width: '100%',
      margin: '0 auto',
      gap: '4px',  // to create a space of 4px between left and right column
      position: 'relative',  // Add a relative position here
    }}>
      <div style={{
         width: '161px',
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',  // Add a relative position here
        alignItems: 'flex-start',
        zIndex: 3// expandedCard !== null && expandedCard % 2 === 0 ? 2 : 1  // If expanded card is in left column, increase its zIndex
         }}>
        {leftColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            isExpanded={expandedCard === index * 2}
            onClick={(height: number) => {
              if (height > 270) {
                setExpandedCard(index * 2);
              } else {
                setExpandedCard(null);
              }
            }}
            position="left"
          />
        ))}
      </div>
      <div style={{
         width: '161px', 
         display: 'flex', 
         flexDirection: 'column', 
         position: 'relative',  // Add a relative position here
         alignItems: 'flex-end',
         zIndex: 2 //expandedCard !== null && expandedCard % 2 !== 0 ? 2 : 1  // If expanded card is in right column, increase its zIndex
         }}>
        {rightColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            isExpanded={expandedCard === index * 2 + 1}
            onClick={(height: number) => {
              if (height > 270) {
                setExpandedCard(index * 2 + 1);
              } else {
                setExpandedCard(null);
              }
            }}
            position="right"
          />
        ))}
      </div>
    </div>
  );
}