import React, { useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  isExpanded: boolean;
  onClick: () => void;
  position?: 'left' | 'right'; // Make the 'position' property required
}

interface CardGridProps {
  cards: CardProps[];
}

export default function CardGrid({ cards }: CardGridProps) {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const calculateCardPosition = (index: number) => {
    if (expandedCardIndex === null) return index;
    return index > expandedCardIndex ? index - 1 : index;
  };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2px' }}> {/* Wrap your grid in a flex container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '2px', // Set gridGap to 2px
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            style={{
              gridColumn: `span 1`,
              gridRow: `span 1`,
              position: 'relative',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              front={card.front}
              back={card.back}
              isExpanded={index === expandedCardIndex}
              onClick={() => handleCardClick(index)}
              position={calculateCardPosition(index) % 2 === 0 ? 'left' : 'right'} // Determine the position dynamically
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

