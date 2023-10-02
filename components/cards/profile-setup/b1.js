import React, { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Counter = styled('div')`
  font-size: 12px;
  color: grey;
`;

const FormContainer = styled('div')`
  margin: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
`;

const B1 = ({ formData, handleInputChange }) => {
  const [localData, setLocalData] = useState(formData);
  const [charCount, setCharCount] = useState(formData.bio.length);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const isFormValid = () => {
    // Check if all fields are filled
    return localData.name && localData.program && localData.yearOfStudy && localData.bio;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }

    handleInputChange(localData);
    setIsFormSubmitted(true); // Set the state to true to show message
  };

  const majorOptions = [
    'ArtSci',
    'Engineering',
    'Commerce',
    'CompSci',
    'Kin',
    'Life Sci',
    'Health Sci',
    'Nursing',
    'Con Ed',
  ];

  return (
    <FormContainer>
      <StyledTextField
        fullWidth
        label="Name"
        value={localData.name}
        color={localData.name ? 'success' : 'error'}
        onChange={(e) => {
          const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setLocalData({ ...localData, name: value });
        }}
      />

      <Autocomplete
        fullWidth
        options={majorOptions}
        value={localData.program}
        color={localData.program ? 'success' : 'error'}
        onChange={(_, newValue) => setLocalData({ ...localData, program: newValue })}
        renderInput={(params) => (
          <StyledTextField {...params} label="Program" color={localData.program ? 'success' : 'error'} />
        )}
      />

      {localData.program === 'Other' && (
        <StyledTextField
          fullWidth
          label="Specify Other"
          value={localData.programOther}
          color={localData.programOther ? 'error ' : 'error'}
          onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setLocalData({ ...localData, programOther: value });
          }}
        />
      )}

      <Box textAlign="center" marginBottom="20px">
        <Typography variant="body2" color="#777">
          Year of Study:
        </Typography>
        <Grid container spacing={2}>
          {(isSmallScreen ? [['1', '2', '3'], ['4', '5', 'Grad']] : [['1', '2', '3', '4', '5', 'Grad']]).map(
            (row, rowIndex) => (
              <Grid container item spacing={2} key={rowIndex}>
                {row.map((year) => (
                  <Grid item xs={isSmallScreen ? 4 : 2} key={year}>
                    <Button
                      variant={localData.yearOfStudy === year ? 'contained' : 'outlined'}
                      onClick={() => setLocalData({ ...localData, yearOfStudy: year })}
                    >
                      {year}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            )
          )}
        </Grid>
      </Box>

      <Box marginBottom="0px">
        <StyledTextField
          fullWidth
          label="Bio"
          multiline
          minRows={3}
          value={localData.bio}
          color={charCount > 0 ? 'success' : 'error'}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 150) {
              setLocalData({ ...localData, bio: value });
              setCharCount(value.length);
            }
          }}
        />
        <Counter>{`${charCount}/150`}</Counter>
      </Box>

<Box textAlign="center" marginBottom="20px">
        {!isFormValid() ? (
          <Typography variant="body2" color="error">
            Please Complete All Fields!
          </Typography>
        ) : isFormSubmitted ? (
          <>
            <Typography variant="body2" color="success">
              Submitted! Swipe left to collapse.
            </Typography>
            <ArrowBackIcon color="success" />
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </FormContainer>
  );
};

export default B1;
