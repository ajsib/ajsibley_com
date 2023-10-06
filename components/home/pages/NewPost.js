import React, { useState, useEffect } from 'react';
import T1F from './templates/t1f';
import T1B from './templates/t1b';
import { TextField, Container, Box, Autocomplete, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import emojiData from './emojis.json';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { getUserInfo } from '../../../utils/userProfile/UserInfo';
import apiBaseUrl from '../../../utils/apiConfig';
import styled from 'styled-components';
import { height } from '@mui/system';

// Styled component for centering cards
const T1FContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  max-width: 150px; 
  margin: auto;
  background-color: #f1f2f2;
  border-radius: 15px;
`;

const T1BContainer = styled.div` 
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: auto;
  background-color: #f1f2f2;
  border-radius: 15px;
`;

const NewPost = () => {
  const [cards, setCards] = useState([]);
  const [header, setHeader] = useState("Your Header");
  const [hook, setHook] = useState("Your Hook");
  const [callToAction, setCallToAction] = useState("Punch Line");
  const [emoji, setEmoji] = useState("👍");
  const [description, setDescription] = useState("Your Article Goes Here, feel free to \n \t \t \t type 👏\n \t \t \t your 👏 \n \t \t \t mind 👏"); // Default value
  const [loading, setLoading] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false); // New state variable for error Snackbar

  const { profile, user } = getUserInfo();
  const author = profile.name;
  const program = profile.program;
  const yearOfStudy = profile.yearOfStudy;

  async function handleClick() {
    setLoading(true);
    
    // Check for default values
    if (
      header === "Your Header" ||
      hook === "Your Hook" ||
      callToAction === "Punch Line" ||
      description === "Your Article Goes Here, feel free to \n \t \t \t type 👏\n \t \t \t your 👏 \n \t \t \t mind 👏"
    ) {
      setErrorSnack(true);
      setLoading(false);
      return;
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }
  
    try {
      const postData = {
        front: {
          headline: header,
          hook: hook,
          callToAction: callToAction,
          emoji: emoji,
        },
        back: {
          authorName: author,
          paragraph: description,
          yearOfStudy: yearOfStudy,
          program: program,
        }
      };
  
      // Create the config object for the axios request
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      // Make the axios post request
      const response = await axios.post(`${apiBaseUrl}/api/posts/`, postData, config);
      
      console.log('Successfully posted:', response.data);
  
    } catch (error) {
      console.error('Error posting:', error);
    }
    
    setLoading(false);
    setSuccessSnack(true);
  }

  useEffect(() => {
    setCards([
      {
        front: <T1F header={header} hook={hook} callToAction={callToAction} emoji={emoji} />,
        back: <T1B headline={header} author={author} program={program} yearOfStudy={yearOfStudy} description={description} />
      }
    ]);
  }, [header, hook, callToAction, emoji, description, author, program, yearOfStudy]);

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" py={2}>
        <h4>👋 Let&apos;s Make Headlines, {author}!</h4>
      </Box>
      {/* Your existing input fields here, unchanged */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Headline" variant="outlined" fullWidth onChange={(e) => setHeader(e.target.value)} />
        <TextField label="Hook" variant="outlined" fullWidth multiline minRows={3} onChange={(e) => setHook(e.target.value)} />
        <Box display="flex" gap={2} margin={2}>
          <TextField label="Punch line" variant="outlined" fullWidth style={{ flexGrow: 0.5 }} onChange={(e) => setCallToAction(e.target.value)} />
          <Autocomplete
            options={emojiData}
            getOptionLabel={(option) => option.emoji}
            fullWidth
            style={{ flexGrow: 0.5 }}
            renderInput={(params) => <TextField {...params} label="Emoji" variant="outlined" />}
            onChange={(_, newValue) => setEmoji(newValue?.emoji || "")}
          />
        </Box>
      </Box>
      {/* End of existing input fields */}
      <TextField label="Your Article" variant="outlined" fullWidth margin='normal' multiline minRows={4} onChange={(e) => setDescription(e.target.value)} />

      <T1FContainer>
        <T1F header={header} hook={hook} callToAction={callToAction} emoji={emoji} />
      </T1FContainer>
      <Box sx={{height:'20px'}}></Box>
      <T1BContainer>
        <T1B headline={header} author={author} program={program} yearOfStudy={yearOfStudy} description={description} />
      </T1BContainer>

      <Box mt={2}>
        <Button 
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={successSnack} autoHideDuration={3000} onClose={() => setSuccessSnack(false)}>
        <Alert onClose={() => setSuccessSnack(false)} severity="success">
          Your post is live! 🚀
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={errorSnack} autoHideDuration={3000} onClose={() => setErrorSnack(false)}>
        <Alert onClose={() => setErrorSnack(false)} severity="error">
          Please fill out all fields before posting.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewPost;
