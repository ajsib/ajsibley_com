import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CardProps {
  front: React.ReactElement;
  back?: React.ReactElement;
  profile?: React.ReactElement;  // New prop for the profile side
  openFullScreenCard: (cardContent: React.ReactElement) => void;
  width?: string;
  hasRight?: boolean;
  hasLeft?: boolean;
}

export default function Card({ front, back, profile, openFullScreenCard, width, hasRight, hasLeft }: CardProps) {
  const [isFront, setIsFront] = useState(true);  // State to track which side is visible
  const [isMounted, setIsMounted] = useState(false);  // State to track if the component is mounted
  const [frontIsVisible, setFrontIsVisible] = useState(true);  // State to track if the front side is visible
  const frontCardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();  // Animation controls

  useEffect(() => {
    setIsMounted(true);  // Set the mounted flag to true when the component mounts

    return () => {
      setIsMounted(false);  // Reset the mounted flag when the component unmounts
    };
  }, []);

  const handleSwipeRight = () => {
    if (!isMounted || !back) return;  // Exit function if component is not mounted
    openFullScreenCard(back);
  };

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!frontCardRef.current) return;
  
    const rect = frontCardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    if (frontIsVisible) {
      if (x > rect.width / 2 - 40 && hasRight) {
        handleSwipeRight();
      } else if (x < rect.width / 2 + 40 && hasLeft) {
        handleSwipeLeft();
      }
    } else {
      // Only trigger swipe left for the bottom half of the card
      if (y > rect.height / 2 && hasLeft) {
        handleSwipeLeft();
      }
    }
  };

  const handleSwipeLeft = () => {
    setFrontIsVisible(!frontIsVisible); 
    if (!isMounted) return;  // Exit function if component is not mounted

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
      // drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      // whileDrag={{ scale: 0.95 }}
      // onDragEnd={(e, { offset }) => {
      //   if (offset.x > 80 && hasRight) {
      //     handleSwipeRight();
      //   }
      //   if (offset.x < -80 && hasLeft) {
      //     handleSwipeLeft();
      //   }
      // }}
      animate={controls} 
      onClick={handleTap}
      whileTap={{ scale: 0.90}}
    >
      {isFront ? front : profile}
    </motion.div>
  );
}
