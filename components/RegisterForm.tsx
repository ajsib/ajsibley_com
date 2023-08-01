// ./components/RegisterForm.tsx
import { Button, TextField, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!username || !emailPhone || !password || !passwordConfirm) {
      setErrorMessage('Please enter all fields.');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Register the user
      const response = await axios.post('https://ajsibleyback-310003c917de.herokuapp.com/api/user/register', {
        username,
        emailPhone,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);

      // If registration is successful, log in the user
      const loginResponse = await axios.post('https://ajsibleyback-310003c917de.herokuapp.com/api/user/login', {
        usernameOrEmail: emailPhone, // You can use either email or username to log in
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { data } = loginResponse;

      localStorage.setItem('token', data.token);

      setUsername('');
      setEmailPhone('');
      setPassword('');
      setPasswordConfirm('');
      setErrorMessage('');
      window.location.href = '/home'; // Redirect to home page after successful login
    } catch (error: any) {
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email or Phone Number"
              value={emailPhone}
              onChange={(e) => setEmailPhone(e.target.value)}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </motion.div>
  );
}
