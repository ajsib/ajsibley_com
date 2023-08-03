// ./pages/index.tsx
import React from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CardGrid from '../components/cards/CardGrid';
import Card from '../components/cards/Card';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const markdown = ` # Welcome to ajsibley.com 👋
  ---

  Every conversation is a blank canvas and you are the artists.  
  Why not paint a masterpiece? ✨`;

  const cardsData = [
    {
      front: <div>Front of Card 1</div>,
      back: <div>Back of Card 1</div>,
      isExpanded: false,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: <div>Front of Card 2</div>,
      back: <div>Back of Card 2</div>,
      isExpanded: false,
      onClick: () => console.log('Card 2 clicked'),
    },
    {
      front: <div>Front of Card 3</div>,
      back: <div>Back of Card 3</div>,
      isExpanded: false,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: <div>Front of Card 4</div>,
      back: <div>Back of Card 4</div>,
      isExpanded: false,
      onClick: () => console.log('Card 2 clicked'),
    },
    {
      front: <div>Front of Card 5</div>,
      back: <div>Back of Card 5</div>,
      isExpanded: false,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: <div>Front of Card 6</div>,
      back: <div>Back of Card 6</div>,
      isExpanded: false,
      onClick: () => console.log('Card 2 clicked'),
    },
    {
      front: <div>Front of Card 7</div>,
      back: <div>Back of Card 7</div>,
      isExpanded: false,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: <div>Front of Card 8</div>,
      back: <div>Back of Card 8</div>,
      isExpanded: false,
      onClick: () => console.log('Card 2 clicked'),
    },
    {
      front: <div>Front of Card 9</div>,
      back: <div>Back of Card 9</div>,
      isExpanded: false,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: <div>Front of Card 10</div>,
      back: <div>Back of Card 10</div>,
      isExpanded: false,
      onClick: () => console.log('Card 2 clicked'),
    },
    {
      front: <div>Front of Card 11</div>,
      back: <div>Back of Card 11</div>,
      isExpanded: false,
      onClick: () => console.log('Card 1 clicked'),
    },
    {
      front: <div>Front of Card 12</div>,
      back: <div>Back of Card 12</div>,
      isExpanded: false,
      onClick: () => console.log('Card 2 clicked'),
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
