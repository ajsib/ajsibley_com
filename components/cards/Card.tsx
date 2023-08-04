import ReactCardFlip from 'react-card-flip';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  isExpanded: boolean;
  onClick: (height: number) => void; // Add the onClick prop to the CardProps interface
  position?: 'left' | 'right'; // Add the position prop to the CardProps interface
}

type CSSPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export default function Card({ front, back, isExpanded, onClick, position }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null); // Create a ref

  useEffect(() => {
    if (isExpanded) {
      const height = cardRef.current?.offsetHeight || 0;
      onClick(height); // Call onClick with the height when the card expands
    }
  }, [isExpanded, onClick]);

  const flipCard = () => setIsFlipped(!isFlipped);

  const cardStyles = {
    width: isFlipped ? '300px' : '140px',
    maxHeight: isExpanded ? '400px' : '270px', // Increase maxHeight when expanded
    minHeight: '180px',
    borderRadius: '15px',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'width 0.5s, height 0.5s, max-height 0.5s, min-height 0.5s, float 0.5s',
    position: 'relative' as CSSPosition,
    padding: '10px',
    margin: '1px',
    // float: position, // Set the float property based on the position prop
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <motion.div
        ref={cardRef} // Assign the ref to the motion.div
        style={cardStyles}
        whileTap={{ scale: 0.95 }}
        onTap={() => {
          onClick(isExpanded ? 0 : cardRef.current?.offsetHeight || 0); // Pass the height to onClick when the card is tapped
          flipCard(); // Flip the card
        }}
      >
        {front}
      </motion.div>

      <motion.div
        style={cardStyles}
        whileTap={{ scale: 0.95 }}
        onTap={() => {
          onClick(isExpanded ? 0 : cardRef.current?.offsetHeight || 0); // Pass the height to onClick when the card is tapped
          flipCard(); // Flip the card
        }}
      >
        {back}
      </motion.div>
    </ReactCardFlip>
  );
}
