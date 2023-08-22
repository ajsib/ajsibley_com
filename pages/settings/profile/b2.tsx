import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { TextField, Chip } from '@mui/material';

const CardContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Georgia', serif;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const Headline = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: center;
`;

const Body = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: #777;
  margin: 15px 0;
  text-align: justify;
`;

const interestsOptions = [
  { label: 'Tech 💻', value: 'Tech' },
  { label: 'Parties 🎉', value: 'Parties' },
  { label: 'Sports ⚽', value: 'Sports' },
  { label: 'Music 🎵', value: 'Music' },
  { label: 'Arts 🎨', value: 'Art' },
  { label: 'Gaming 🎮', value: 'Gaming' },
  { label: 'Reading 📚', value: 'Reading' },
  { label: 'Cooking 🍳', value: 'Cooking' }
];

interface BackCard2Props {
  onFieldChange: (field: string, value: string) => void;
  existingFields: { hobbies: string };
}

const BackCard2: React.FC<BackCard2Props> = ({ onFieldChange, existingFields }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    const hobbiesArray = existingFields.hobbies ? existingFields.hobbies.split(', ') : [];
    setSelectedInterests(hobbiesArray);
  }, [existingFields.hobbies]);

  const handleInterestClick = (interest: { label: string; value: string }) => {
    let newInterests = [...selectedInterests];
    if (newInterests.includes(interest.value)) {
      newInterests = newInterests.filter((i) => i !== interest.value);
    } else {
      newInterests.push(interest.value);
    }
    setSelectedInterests(newInterests);
    onFieldChange('hobbies', newInterests.join(', '));
  };


  return (
    <CardContainer>
      <Headline>💭 Just start typing ...</Headline>
      <Body> Click what you click with! then tell us some more! </Body>
      <ChipContainer>
        {interestsOptions.map(interest => (
          <Chip
            key={interest.value}
            label={interest.label}
            clickable
            color={selectedInterests.includes(interest.value) ? 'primary' : 'default'}
            onClick={() => handleInterestClick(interest)}
          />
        ))}
      </ChipContainer>
    </CardContainer>
  );
};

export default BackCard2;
