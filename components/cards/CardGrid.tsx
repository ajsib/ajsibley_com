// CardGrid.tsx file
import React, { useState } from 'react';
import Card from './Card';
import usePrevious from './hooks/hooks';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  isExpanded: boolean;
  onClick: (height: number) => void;
  position?: 'left' | 'right';
  zIndex?: number;
}

interface CardGridProps {
  cards: CardProps[];
}

export default function CardGrid({ cards }: CardGridProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [leftZIndex, setLeftZIndex] = useState(1);
  const [rightZIndex, setRightZIndex] = useState(1);
  const prevExpandedCard = usePrevious(expandedCard);

  // Split the cards into two separate columns
  const leftColumnCards = cards.filter((_, i) => i % 2 === 0);
  const rightColumnCards = cards.filter((_, i) => i % 2 !== 0);

  const handleCardClick = (index: number, position: 'left' | 'right', height: number) => {
    // Check if the clicked card is the currently expanded card
    const isCurrentlyExpanded = expandedCard === index;

    // If the card is already expanded and is clicked again, collapse it
    if (isCurrentlyExpanded && height <= 80) {
      setExpandedCard(null);
      if (position === 'left') {
        setTimeout(() => setLeftZIndex(1), 500);
      } else {
        setRightZIndex(1);
      }
      return; // Early return as we've already handled this scenario
    }

    // If another card was previously expanded and it's different from the currently clicked one, collapse it
    if (prevExpandedCard !== null && prevExpandedCard !== index) {
      collapseCard(prevExpandedCard);
    }

    // Logic for expanding a card
    if (height > 80) {
      setExpandedCard(index);
      if (position === 'left') {
        setLeftZIndex(3);
        setRightZIndex(1);
      } else {
        setLeftZIndex(1);
        setRightZIndex(3);
      }
    }
};

  // Create a separate function to handle the collapsing of a card.
  const collapseCard = (index: number) => {
    // For now, we'll just set the state to null which should "close" the card.
    // However, more complex logic can be added here if necessary.
    setExpandedCard(null);
  };
  

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      margin: '0 auto',
      gap: '4px',
      position: 'relative',
    }}>
      <div style={{
        width: '161px',
        height: '100%', // Set to the fixed height
        display: 'flex',
        gap: '1px',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-start',
        zIndex: leftZIndex,
        transition: 'all 0.5s ease-in-out', // Add transition
      }}>
        {leftColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            isExpanded={expandedCard === index * 2}
            onClick={(height: number) => handleCardClick(index * 2, 'left', height)}
            position="left"
            zIndex={expandedCard === index * 2 ? 3 : 1}
          />
        ))}
      </div>
      <div style={{
        width: '161px',
        height: '100%', // Set to the fixed height
        display: 'flex',
        gap: '1px',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-end',
        zIndex: rightZIndex,
        transition: 'all 0.5s ease-in-out', // Add transition
      }}>
        {rightColumnCards.map((card, index) => (
          <Card
            key={index}
            front={card.front}
            back={card.back}
            isExpanded={expandedCard === index * 2 + 1}
            onClick={(height: number) => handleCardClick(index * 2 + 1, 'right', height)}
            position="right"
            zIndex={expandedCard === index * 2 + 1 ? 3 : 3}
          />
        ))}
      </div>
    </div>
  );
}