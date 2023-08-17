import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TextField, Button, Chip } from '@mui/material';

const CardContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Georgia', serif;
`;

const FieldContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
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

const BackCard2 = ({ onFieldChange }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest.value)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest.value));
    } else {
      setSelectedInterests([...selectedInterests, interest.value]);
    }
    onFieldChange('interests', selectedInterests.join(', '));
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
      <FieldContainer>
        <TextField
          fullWidth
          label="The floor is yours!"
          variant="outlined"
          placeholder="e.g. Interested in AI, Robotics ..."
          value={additionalDetails}
          onChange={(e) => {
            setAdditionalDetails(e.target.value);
            onFieldChange('details', e.target.value);
          }}
        />
      </FieldContainer>
      <Button variant="contained" color="primary" onClick={() => { /* Code to submit and update the front card */ }}>
        Save
      </Button>
    </CardContainer>
  );
};

export default BackCard2;
