import React, { useState, useEffect } from 'react';
import CardGrid from '../../CardGrid';
import T1F from './templates/t1f';
import T1B from './templates/t1b';
import { TextField, Container, Box, Autocomplete, Button, CircularProgress } from '@mui/material';
import emojiData from './emojis.json';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const NewPost = () => {
  console.log("Rendering NewPost"); // Debug line
  const [cards, setCards] = useState([]);
  const [header, setHeader] = useState("Your Header");
  const [hook, setHook] = useState("Your Hook");
  const [callToAction, setCallToAction] = useState("Your CTA");
  const [emoji, setEmoji] = useState("👍");
  const [description, setDescription] = useState("");

  const storedProfile = JSON.parse(localStorage.getItem('profile') || '{}');

  const author = storedProfile.name;
  const program = storedProfile.program;
  const yearOfStudy = storedProfile.yearOfStudy;

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
  
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
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
      const response = await axios.post('http://localhost:3000/api/posts/', postData, config);
      
      console.log('Successfully posted:', response.data);
  
    } catch (error) {
      console.error('Error posting:', error);
    }
    
    setLoading(false);
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
      <h1>Let's Post a Headline!</h1>
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
      <CardGrid cards={cards} />
      <TextField label="Your Article" variant="outlined" fullWidth margin='normal' multiline minRows={4} onChange={(e) => setDescription(e.target.value)} />
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
    </Container>
  );
};

export default NewPost;
