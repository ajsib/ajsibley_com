// ./components/LoginForm.tsx
import { Button, TextField, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function LoginForm() {
  const route = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!usernameOrEmail || !password) {
      setErrorMessage('Please enter all fields.');
      return;
    }

    try {
      const response = await axios.post('https://ajsibleyback-310003c917de.herokuapp.com/api/user/login', {
        usernameOrEmail, // Use the updated field name for username or email
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

      const userResponse = await axios.get('https://ajsibleyback-310003c917de.herokuapp.com/api/user/user', config);
      console.log(userResponse.data);

      setUsernameOrEmail(''); // Clear the input field after successful login
      setPassword('');
      setErrorMessage('');
      window.location.href = '/home'; // Redirect to the home page after successful login
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
            label="Username or Email" // Update the label to indicate that both username and email are accepted
            value={usernameOrEmail} // Use the updated state variable for username or email
            onChange={(e) => setUsernameOrEmail(e.target.value)} // Use the updated state function for username or email
            error={!usernameOrEmail && errorMessage === 'Please enter all fields'}
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
