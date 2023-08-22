import React from 'react';
import styled from '@emotion/styled';
import { TextField, Button, Autocomplete } from '@mui/material';

const CardContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Georgia', serif;
`;

const FieldContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const Footer = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: #777;
  margin: 15px 0;
  text-align: justify;
`;

interface BackCard1Props {
  onFieldChange: (field: string, value: string) => void;
  existingFields: {
    name: string;
    age: string;
    major: string;
    university: string;
  };
}

const BackCard1: React.FC<BackCard1Props> = ({ onFieldChange, existingFields }) => {
  const handleFieldChange = (field: string, value: string) => {
    onFieldChange(field, value);
  };

  const universityOptions = ["Queen's 🇷🇴", "Western", "Carleton", "uOttawa", "Guelph", "Laurier", "Waterloo", "McMaster"];
  const majorOptions = ["ArtSci", "Engineering", "Commerce", "CompSci", "Kinesiology", "Life Sci", "Health Sci", "Nursing", "Other"];

  return (
    <CardContainer>
      <FieldContainer>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          placeholder="Enter your first name"
          value={existingFields.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
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
          onChange={(e) => handleFieldChange('age', e.target.value)}
          type="number"
        />
      </FieldContainer>

      <FieldContainer>
        <Autocomplete
          fullWidth
          options={majorOptions}
          value={existingFields.major}
          onChange={(_, newValue) => handleFieldChange('major', newValue || '')}
          renderInput={(params) => <TextField {...params} label="Major (Optional)" variant="outlined" />}
        />
      </FieldContainer>

      <FieldContainer>
        <Autocomplete
          fullWidth
          options={universityOptions}
          value={existingFields.university}
          onChange={(_, newValue) => handleFieldChange('university', newValue || '')}
          renderInput={(params) => <TextField {...params} label="University" variant="outlined" />}
        />
      </FieldContainer>
    
    <Footer> Swipe left when complete 👆⬅️ 📱 </Footer>



    </CardContainer>
  );
};

export default BackCard1;
