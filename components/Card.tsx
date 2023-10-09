import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  profile?: React.ReactElement;  // New prop for the profile side
  openFullScreenCard: (cardContent: React.ReactElement) => void;
  width?: string;
}

export default function Card({ front, back, profile, openFullScreenCard, width }: CardProps) {
  const [isFront, setIsFront] = useState(true);  // State to track which side is visible
  const frontCardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();  // Animation controls

  const handleSwipeRight = () => {
    openFullScreenCard(back);
  };

  const handleSwipeLeft = () => {
    controls.start({
      rotateY: [0, 180],
      transition: { duration: 0.5 }
    }).then(() => {
      setIsFront(!isFront);  // Switch the side
      controls.set({ rotateY: 0 });  // Reset the rotation
    });
  };

  const cardStyles = {
    width: width || '100%',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.20)',
    padding: '12px 10px',
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
        if (offset.x < -80) {
          handleSwipeLeft();
        }
      }}
      animate={controls} // Attach the animation controls
    >
      {isFront ? front : profile}
    </motion.div>
  );
}
