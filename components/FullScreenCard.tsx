import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FullScreenCardProps {
  content: React.ReactElement;
  closeCard: () => void;
}

const FullScreenCard: React.FC<FullScreenCardProps> = ({ content, closeCard }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cardWidth = windowWidth < 768 ? '90%' : '30%';

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyles: React.CSSProperties = {
    maxHeight: '90%',
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'auto',
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    if (offset.x > 80) {
      // Logic for like (right swipe)
      console.log("Liked!");
      closeCard();
    } else if (offset.x < -80) {
      // Logic for collapse (left swipe)
      console.log("Collapsed!");
      closeCard();
    }
  };

  return (
    <div style={overlayStyles} >
      <motion.div
        style={cardStyles}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        {content}
      </motion.div>
    </div>
  );
};

export default FullScreenCard;
