import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const B2 = ({ formData, handleInputChange }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmation = () => {
    // Update formData to include a "terms" field indicating acceptance
    handleInputChange({ ...formData, terms: 'accepted' });
    setIsConfirmed(true);
  };

  return (
    <Box margin="20px">
      <Typography variant="body1">
        Terms and Conditions: <br /> <br />
        Headline is NOT affiliated with Queen&apos;s University. <br /> <br />
        Headline is a social media platform created by a student to help connect the Queen&apos;s community with our own app.
        <br /> <br /> Any derogatory, racist, sexist, or otherwise offensive content will NOT be tolerated. <br /> <br />
        Moral of the story: be a decent human, and treat others how you would like to be treated. <br /> <br />
      </Typography>
      
      <Box textAlign="center" margin="20px">
        {isConfirmed ? (
          <>
            <Typography variant="body2" color="success">
              Confirmed! Swipe to collapse.
            </Typography>
            <CheckCircleOutlineIcon color="success" />
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleConfirmation}>
            I Understand
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default B2;
