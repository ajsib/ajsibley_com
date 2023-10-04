// Card.tsx
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  openFullScreenCard: (cardContent: React.ReactElement) => void; // Declare the new prop
}

export default function Card({ front, back,  openFullScreenCard }: CardProps) {
  const frontCardRef = useRef<HTMLDivElement>(null);

  const handleSwipeRight = () => {
    openFullScreenCard(back);   // <--- This method should come from CardGrid
  }

  // Remove the minHeight property and add padding for aesthetic spacing
  const cardStyles = {
    width: '84%',
    borderRadius: '15px',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.15)',
    padding: '10px',
    margin: '1px',
    backgroundColor: '#fff',
    overflow: 'hidden',
  };

  return (
    <motion.div
      ref={frontCardRef}
      style={cardStyles}
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileDrag={{ scale: 0.95 }}
      onDragEnd={(e, { offset }) => {
        if (offset.x > 80) {
          handleSwipeRight();
        }
      }}
    >
      {front}
    </motion.div>
  );
}