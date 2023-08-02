// Grid.tsx
import { motion } from 'framer-motion';
import Card from './Card';
import { useFlip } from './useFlip';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
}

interface GridProps {
  cards: CardProps[];
}

export default function Grid({ cards }: GridProps) {
  const { flipCard } = useFlip();

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1px',
  };

  const handleDrag = (event: MouseEvent, info: { point: { x: number; y: number; }; }) => {
    // Flip the card when it's dragged more than 30 pixels
    if (info.point.x > 30) {
      flipCard();
    }
  };

  return (
    <motion.div style={gridStyles}>
      {cards.map((card, index) => (
        <motion.div key={index} onDrag={handleDrag}>
          <Card front={card.front} back={card.back} />
        </motion.div>
      ))}
    </motion.div>
  );
}
