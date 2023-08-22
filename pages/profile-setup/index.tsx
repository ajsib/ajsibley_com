import React, { useState } from 'react';
import { Container, LinearProgress, Collapse } from '@mui/material';
import BasicInfo from './profileSections/BasicInfo';
import Hobbies from './profileSections/Hobbies';

interface Fields {
  name?: string;
  age?: string;
  major?: string;
  university?: string;
  hobbies?: string;
}

export default function ProfileSetup() {
  const [existingFields, setExistingFields] = useState<Fields>({});
  const [basicInfoProgress, setBasicInfoProgress] = useState<'red' | 'green' | 'blue'>('red');
  const [hobbiesProgress, setHobbiesProgress] = useState<'red' | 'green' | 'blue'>('red');
  const [isBasicInfoExpanded, setIsBasicInfoExpanded] = useState(true);
  const [isHobbiesExpanded, setIsHobbiesExpanded] = useState(true);

  const handleBasicInfoFieldChange = (updatedFields: Fields, progressColor: 'red' | 'green' | 'blue') => {
    setExistingFields({ ...existingFields, ...updatedFields });
    setBasicInfoProgress(progressColor);
    if (progressColor === 'blue') {
      setIsBasicInfoExpanded(false);
    }
  };

  const handleHobbiesFieldChange = (updatedFields: Fields, progressColor: 'red' | 'green' | 'blue') => {
    setExistingFields({ ...existingFields, ...updatedFields });
    setHobbiesProgress(progressColor);
    if (progressColor === 'blue') {
      setIsHobbiesExpanded(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <h1 style={{ fontFamily: 'Georgia', color: '#333' }}>Your Profile</h1>

      <h2>Back to the Basics</h2>
      <LinearProgress
        variant="determinate"
        value={basicInfoProgress === 'blue' ? 100 : basicInfoProgress === 'green' ? 50 : 0}
        style={{ backgroundColor: basicInfoProgress, height: '8px', cursor: 'pointer' }}
        onClick={() => setIsBasicInfoExpanded(!isBasicInfoExpanded)}
      />
      <Collapse in={isBasicInfoExpanded}>
        <BasicInfo existingFields={existingFields} handleFieldChange={handleBasicInfoFieldChange} />
      </Collapse>

      <h2>Your Hobbies</h2>
      <LinearProgress
        variant="determinate"
        value={hobbiesProgress === 'blue' ? 100 : hobbiesProgress === 'green' ? 50 : 0}
        style={{ backgroundColor: hobbiesProgress, height: '8px', cursor: 'pointer' }}
        onClick={() => setIsHobbiesExpanded(!isHobbiesExpanded)}
      />
      <Collapse in={isHobbiesExpanded}>
        <Hobbies existingFields={existingFields} handleFieldChange={handleHobbiesFieldChange} />
      </Collapse>
    </Container>
  );
}
