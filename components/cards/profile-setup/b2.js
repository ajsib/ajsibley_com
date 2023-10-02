import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import clubsList from './clubsList'; // Make sure clubsList is an array of your clubs
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const B2 = ({ formData, handleInputChange }) => {
  const [localData, setLocalData] = useState(formData);
  const [selectedClubs, setSelectedClubs] = useState(formData.clubsAndOrgs ? formData.clubsAndOrgs.split(',') : []);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getDefaultPrefix = (type) => {
    const defaultPrefixes = {
      LinkedIn: "https://linkedin.com/in/",
      GitHub: "https://github.com/",
      Instagram: "@",
      Twitter: "@",
      Linktree: "https://linktr.ee/",
      Vsco: "https://vsco.co/",
    };
    return defaultPrefixes[type] || "";
  };

  const handleSubmit = () => {
    const updatedData = { ...localData, clubsAndOrgs: selectedClubs.join(',') };
    handleInputChange(updatedData);
    setIsFormSubmitted(true);
  };

  const handleContactInfoChange = (e) => {
    const prefix = getDefaultPrefix(localData.contactType);
    if (e.target.value.startsWith(prefix)) {
      setLocalData({ ...localData, contactInfo: e.target.value });
    }
  };

  return (
    <Box margin="20px">
      <Autocomplete
        multiple
        options={clubsList}
        value={selectedClubs}
        onChange={(_, newValue) => setSelectedClubs(newValue)}
        renderInput={(params) => <TextField {...params} label="Organizations/Clubs" fullWidth margin="normal" />}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Contact Link Type</InputLabel>
        <Select
          value={localData.contactType || ''}
          onChange={(e) => setLocalData({ ...localData, contactType: e.target.value })}
        >
          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
          <MenuItem value="GitHub">GitHub</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="Twitter">Twitter</MenuItem>
          <MenuItem value="Linktree">Linktree</MenuItem>
          <MenuItem value="Vsco">Vsco</MenuItem>
        </Select>
      </FormControl>

      {localData.contactType && (
        <TextField
          label="Contact Link"
          fullWidth
          margin="normal"
          value={localData.contactInfo || getDefaultPrefix(localData.contactType)}
          onChange={handleContactInfoChange}
        />
      )}

      <Box textAlign="center" margin="20px">
        {isFormSubmitted ? (
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
    </Box>
  );
};

export default B2;
