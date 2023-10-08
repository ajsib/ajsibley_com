// Card.tsx
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  openFullScreenCard: (cardContent: React.ReactElement) => void; // Declare the new prop
  width: string;
}

export default function Card({ front, back,  openFullScreenCard, width }: CardProps) {
  const frontCardRef = useRef<HTMLDivElement>(null);

  const handleSwipeRight = () => {
    openFullScreenCard(back);   // <--- This method should come from CardGrid
  }

  // Remove the minHeight property and add padding for aesthetic spacing
  const cardStyles = {
    width: width,
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.20)',
    padding: '12px 10px',
    margin: '1px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    // maxWidth: '200px',
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