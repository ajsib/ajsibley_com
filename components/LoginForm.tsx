// ./components/LoginForm.tsx
import { Button, TextField, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

  if (!username || !password) {
    setErrorMessage('Please enter all fields.');
    return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { data } = response;

      localStorage.setItem('token', data.token);

      const config = {
        headers: {
          'Authorization': 'Bearer ' + data.token
        }
      };

      const userResponse = await axios.get('http://localhost:3000/api/user', config);
      console.log(userResponse.data);

      setUsername('');
      setPassword('');
      setErrorMessage('');
    } catch (error : any) {
      console.log(error);
      setErrorMessage(error.response.data.message); // Set the error message received from the server
    }
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      {errorMessage && <ReactMarkdown>{`---\n${errorMessage}`}</ReactMarkdown>}
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!username && errorMessage === 'Please enter all fields'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password && errorMessage === 'Please enter all fields'}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
    </motion.div>
  );
}
