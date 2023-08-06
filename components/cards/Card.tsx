import ReactCardFlip from 'react-card-flip';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  isExpanded: boolean;
  onClick: (height: number) => void;
  position?: 'left' | 'right';
  zIndex?: number;
}

export default function Card({ front, back, isExpanded, onClick, position, zIndex }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    let cardHeight = 0;

    if (isFlipped) {
      cardHeight = backCardRef.current?.offsetHeight || 0;
    } else {
      cardHeight = frontCardRef.current?.offsetHeight || 0;
    }

    if (isExpanded) {
      onClick(cardHeight);
    }
  }, [isExpanded, isFlipped, onClick]);

  const cardStyles = {
    width: isFlipped ? '303px' : '140px',
    maxHeight: isExpanded ? '400px' : '300px', // Back to being controlled
    minHeight: '200px', // Back to being controlled
    borderRadius: '15px',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'width 0.3s, float 0.3s', // Animation speed increased
    position: 'relative' as 'relative',
    padding: '10px',
    margin: '1px',
    backgroundColor: '#fff',
    zIndex: zIndex,
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <motion.div
        ref={frontCardRef}
        style={cardStyles}
        layout
        whileTap={{ scale: 0.95 }}
        onTap={() => {
          onClick(isExpanded ? 0 : frontCardRef.current?.offsetHeight || 0);
          flipCard();
        }}
        animate={{ scale: 1 }} 
        transition={{ duration: 0.3 }} // Animation speed increased
      >
        {front}
      </motion.div>

      <motion.div
        ref={backCardRef}
        style={cardStyles}
        layout
        whileTap={{ scale: 0.95 }}
        onTap={() => {
          onClick(isExpanded ? 0 : backCardRef.current?.offsetHeight || 0);
          flipCard();
        }}
        animate={{ scale: 1 }} 
        transition={{ duration: 0.3 }} // Animation speed increased
      >
        {back}
      </motion.div>
    </ReactCardFlip>
  );
}
