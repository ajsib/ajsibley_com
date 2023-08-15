// ./pages/index.tsx
import React from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CardGrid from '../components/cards/CardGrid';
import Card from '../components/cards/Card';
// First Card
import F1 from '../components/cards/templates/landing/f1';
import B1 from '../components/cards/templates/landing/b1';
import F2 from '../components/cards/templates/landing/f2';
import B2 from '../components/cards/templates/landing/b2';
import F3 from '../components/cards/templates/landing/f3';
import B3 from '../components/cards/templates/landing/b3';
import F4 from '../components/cards/templates/landing/f4';
import B4 from '../components/cards/templates/landing/b4';


export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const markdown = ` # Welcome to Headline 👋
  ---

  Every conversation is a blank canvas and you are the artists.  
  Why not paint a masterpiece? ✨`;

  const cardsData = [
    {
      front: (
        <F1 />
      ),
      back: (
        <B1 />
      ),
      isExpanded: true,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: (
        <F2 />
      ),
      back: (
        <B2 />
      ),
      isExpanded: true,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: (
        <F4 />
      ),
      back: (
        <B4 />
      ),
      isExpanded: true,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: (
        <F3 />
      ),
      back: (
        <B3 />
      ),
      isExpanded: true,
      onClick: () => console.log('Card 1 clicked'),
    },

  ];

  return (
    <Container maxWidth="sm">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      {/* Login and Sign Up Buttons */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button
            variant={showLogin ? 'text' : 'contained'}
            color="primary"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(!showLogin);
            }}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={showRegister ? 'text' : 'contained'}
            color="secondary"
            onClick={() => {
              setShowLogin(false);
              setShowRegister(!showRegister);
            }}
          >
            Register
          </Button>
        </Grid>
      </Grid>

      {/* Add a box with a height for the space */}
      <Box height={30} />
      
      {showLogin && <LoginForm />}
      {showRegister && <RegisterForm />}
      <CardGrid cards={cardsData} />
    </Container>
  );
}
