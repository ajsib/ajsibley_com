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
  const [leftZIndex, setLeftZIndex] = useState(1);
  const [rightZIndex, setRightZIndex] = useState(1);

  // Split the cards into two separate columns
  const leftColumnCards = cards.filter((_, i) => i % 2 === 0);
  const rightColumnCards = cards.filter((_, i) => i % 2 !== 0);

  const handleCardClick = (index: number, position: 'left' | 'right', height: number) => {
    if (height > 80) {
      setExpandedCard(index);
      if (position === 'left') {
        setLeftZIndex(3);
        setRightZIndex(1);
      } else {
        setLeftZIndex(1);
        setRightZIndex(3);
      }
    } else {
      setExpandedCard(null);
      if (position === 'left') {
        setTimeout(() => setLeftZIndex(1), 500); // Apply a delay when collapsing the left column
      } else {
        setLeftZIndex(1);
      }
      setRightZIndex(1);
    }
  };

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
        zIndex: leftZIndex // expandedCard !== null && expandedCard % 2 === 0 ? 2 : 1  // If expanded card is in left column, increase its zIndex
         }}>
        {leftColumnCards.map((card, index) => (
          <Card
          key={index}
          front={card.front}
          back={card.back}
          isExpanded={expandedCard === index * 2}
          onClick={(height: number) => handleCardClick(index * 2, 'left', height)}
          position="left"
          zIndex={expandedCard === index * 2 ? 2 : 1} // Corrected zIndex prop
        />
        ))}
      </div>
      <div style={{
         width: '161px', 
         display: 'flex', 
         flexDirection: 'column', 
         position: 'relative',  // Add a relative position here
         alignItems: 'flex-end',
         zIndex: rightZIndex //expandedCard !== null && expandedCard % 2 !== 0 ? 2 : 1  // If expanded card is in right column, increase its zIndex
         }}>
        {rightColumnCards.map((card, index) => (
        <Card
          key={index}
          front={card.front}
          back={card.back}
          isExpanded={expandedCard === index * 2 + 1}
          onClick={(height: number) => handleCardClick(index * 2 + 1, 'right', height)}
          position="right"
          zIndex={expandedCard === index * 2 + 1 ? 2 : 1} // Corrected zIndex prop
        />
        ))}
      </div>
    </div>
  );
}