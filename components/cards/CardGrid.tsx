import React from 'react';
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
  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        flexDirection: 'row',
        alignItems: 'start',
        maxWidth: '400px',  // set maximum width
        margin: '0 auto'  // center the container horizontally
      }}>
      {cards.map((card, index) => (
        <Card
          key={index}
          front={card.front}
          back={card.back}
          isExpanded={card.isExpanded}
          onClick={card.onClick}
          position={index % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  );
}
