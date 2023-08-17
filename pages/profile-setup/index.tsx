import React, { useState, useEffect } from 'react';
import { Container, LinearProgress } from '@mui/material';
import CardGrid from '../../components/cards/CardGrid';
import FrontCard1 from './profile/f1';
import BackCard1 from './profile/b1';
// import FrontCard2 from './profile/f2';
// import BackCard2 from './profile/b2';


interface CardData {
  front: JSX.Element;
  back: JSX.Element;
  isExpanded: boolean;
  onClick: () => void;
  requiredFilled?: boolean;
  optionalFilled?: boolean;
}

export default function ProfileSetup() {
  const [cardFields, setCardFields] = useState({
    name: '',
    age: '',
    major: '',
    university: '',
    hobbies: '',
    // ... other fields as needed
  });

  const onFieldChange = (field: string, value: string) => {
    setCardFields({
      ...cardFields,
      [field]: value
    });
  };

  const isRequiredFilled = cardFields.name !== '' && cardFields.university !== '';
  const isOptionalFilled = cardFields.age !== '' && cardFields.major !== '';

  const cardsData: CardData[] = [
    {
      front: <FrontCard1 requiredFilled={isRequiredFilled} optionalFilled={isOptionalFilled} />,
      back: <BackCard1 onFieldChange={onFieldChange} existingFields={cardFields} />, // Updated this line
      isExpanded: false, // Manage this state to control whether the card is expanded or not
      onClick: () => console.log('Card 1 clicked'),
      requiredFilled: isRequiredFilled,
      optionalFilled: isOptionalFilled,
    },
  ];
  
  

  const [cards, setCards] = useState(cardsData);

  useEffect(() => {
    // This will run whenever cardFields changes
    setCards(cardsData);
  }, [cardFields]); 

  const { progress, color } = calculateProgress(cards);

  return (
    <Container maxWidth="lg">
      <h1 style={{ fontFamily: 'Georgia', color: '#333'}}>Profile Setup</h1>
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ backgroundColor: color, height: '8px' }}
      />
      <CardGrid cards={cards} />
    </Container>
  );
}

const calculateProgress = (cards: CardData[]) => {
  let completedRequiredCards = 0;
  let completedOptionalCards = 0;

  cards.forEach(card => {
    if (card.requiredFilled) {
      completedRequiredCards++;
    }
    if (card.optionalFilled) {
      completedOptionalCards++;
    }
  });

  const totalCards = cards.length;
  const requiredCompletionPercentage = (completedRequiredCards / totalCards) * 100;
  const optionalCompletionPercentage = (completedOptionalCards / totalCards) * 100;
  const overallCompletionPercentage = (requiredCompletionPercentage + optionalCompletionPercentage) / 2;

  let color: 'red' | 'green' | 'blue' = 'red';
  if (overallCompletionPercentage >= 100) {
    color = 'blue';
  } else if (requiredCompletionPercentage === 100) {
    color = 'green';
  }

  return { progress: overallCompletionPercentage, color };
};
