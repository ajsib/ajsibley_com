// Card.tsx
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
}

type CSSPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export default function Card({ front, back }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  const cardStyles = {
    maxWidth: '230px',
    maxHeight: '500px',
    minHeight: '372px',
    borderRadius: '18px',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'width 0.6s',
    position: 'relative' as CSSPosition,
    padding: '10px', 
    margin: '10px',
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <motion.div
        style={cardStyles}
        whileTap={{ scale: 0.95 }}
        onTap={flipCard}
      >
        {front}
      </motion.div>

      <motion.div
        style={cardStyles} // remove expanded maxWidth
        whileTap={{ scale: 0.95 }}
        onTap={flipCard}
      >
        {back}
      </motion.div>
    </ReactCardFlip>
  );
}
