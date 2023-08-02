// useFlip.ts
import { useState } from 'react';

export const useFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  return { isFlipped, flipCard };
};
