import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import React from 'react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout the user
      await axios.post('https://ajsibleyback-310003c917de.herokuapp.com/api/user/logout');

      // Clear any user-related data from the frontend (e.g., JWT token)
      // (Add your own logic here depending on how you handle authentication)
      localStorage.removeItem('token');

      // Redirect the user to the homepage (or any other page you prefer)
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
