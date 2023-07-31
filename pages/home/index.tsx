import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import LogoutButton from '../../components/home/logout';

export default function Home() {
  const markdown = ` # Welcome to ajsibley.com 👋
  ---

  Every conversation is a blank canvas and you are the artists.  
  Why not paint a masterpiece? ✨`;

  return (
    <Container maxWidth="sm">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      
      {/* Add a box with a height for the space */}
      <Box height={30} />

      <LogoutButton />
    </Container>
  );
}
