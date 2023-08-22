import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import styled from '@emotion/styled';

const FieldContainer = styled.div`
  margin: 10px 0;
`;

const universityOptions = ["Queen's 🇷🇴", "Other"];
const majorOptions = ["ArtSci", "Engineering", "Commerce", "CompSci", "Kinesiology", "Life Sci", "Health Sci", "Nursing", "Other"];

interface Fields {
  name?: string;
  age?: string;
  major?: string;
  university?: string;
  hobbies?: string;
}

interface BasicInfoProps {
  existingFields: Fields;
  handleFieldChange: (updatedFields: Fields, progressColor: 'red' | 'green' | 'blue') => void; // Updated type signature
}

const BasicInfo: React.FC<BasicInfoProps> = ({ existingFields, handleFieldChange }) => {
  const updateField = (field: string, value: string) => {
    const updatedFields = { ...existingFields, [field]: value };
    let progressColor: 'red' | 'green' | 'blue' = 'red';

    if (updatedFields.name && updatedFields.university) {
      progressColor = updatedFields.age && updatedFields.major ? 'blue' : 'green';
    }

    handleFieldChange(updatedFields, progressColor);
  };

  return (
    <>
      <FieldContainer>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          placeholder="Enter your first name"
          value={existingFields.name}
          onChange={(e) => updateField('name', e.target.value)} // Use updateField here
          required
        />
      </FieldContainer>

      <FieldContainer>
        <TextField
          fullWidth
          label="Age (Optional)"
          variant="outlined"
          placeholder="Enter your age"
          value={existingFields.age}
          onChange={(e) => updateField('age', e.target.value)} // Use updateField here
          type="number"
        />
      </FieldContainer>

      <FieldContainer>
        <Autocomplete
          fullWidth
          options={majorOptions}
          value={existingFields.major}
          onChange={(_, newValue) => updateField('major', newValue || '')} // Use updateField here
          renderInput={(params) => <TextField {...params} label="Major (Optional)" variant="outlined" />}
        />
      </FieldContainer>

      <FieldContainer>
        <Autocomplete
          fullWidth
          options={universityOptions}
          value={existingFields.university}
          onChange={(_, newValue) => updateField('university', newValue || '')} // Use updateField here
          renderInput={(params) => <TextField {...params} label="University" variant="outlined" />}
        />
      </FieldContainer>
    </>
  );
};

export default BasicInfo;
