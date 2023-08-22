import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Chip, TextField } from '@mui/material';

const FieldContainer = styled.div`
  margin: 10px 0;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
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

interface Fields {
  hobbies?: string;
  additionalHobby?: string;
}

interface HobbiesProps {
  existingFields: Fields;
  handleFieldChange: (updatedFields: Fields, progressColor: 'red' | 'green' | 'blue') => void;
}

const Hobbies: React.FC<HobbiesProps> = ({ existingFields, handleFieldChange }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(existingFields.hobbies ? existingFields.hobbies.split(', ') : []);

  const updateField = () => {
    const updatedFields = {
      hobbies: selectedInterests.join(', '),
      additionalHobby: existingFields.additionalHobby
    };
    let progressColor: 'red' | 'green' | 'blue' = 'red';
    if (selectedInterests.length >= 2) {
      progressColor = existingFields.additionalHobby ? 'blue' : 'green';
    }
    handleFieldChange(updatedFields, progressColor);
  };

  const handleInterestClick = (interest: { label: string; value: string }) => {
    const newInterests = selectedInterests.includes(interest.value) ?
      selectedInterests.filter((i) => i !== interest.value) :
      [...selectedInterests, interest.value];
    setSelectedInterests(newInterests);
    updateField();
  };

  const handleExtraTextChange = (text: string) => {
    existingFields.additionalHobby = text;
    updateField();
  };

  return (
    <>
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

      <FieldContainer>
        <TextField
          fullWidth
          label="The floor is yours"
          variant="outlined"
          value={existingFields.additionalHobby}
          onChange={(e) => handleExtraTextChange(e.target.value)}
        />
      </FieldContainer>
    </>
  );
};

export default Hobbies;
