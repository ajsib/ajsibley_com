// ./pages/index.tsx
import React from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CardGrid from '../components/CardGrid';
// Card Faces
import F1 from '../components/cards/landing/f1';
import B1 from '../components/cards/landing/b1';
import F2 from '../components/cards/landing/f2';
import B2 from '../components/cards/landing/b2';
import F3 from '../components/cards/landing/f3';
import B3 from '../components/cards/landing/b3';
import F4 from '../components/cards/landing/f4';
import B4 from '../components/cards/landing/b4';
import styled from '@emotion/styled';


const WelcomeContainer = styled.div`
  font-family: 'Georgia', serif;
  margin: 20px 0;
`;

const WelcomeHeadline = styled.h1`
  font-size: 23px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: center;
`;

const WelcomeDescription = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0px 0;
  text-align: center;
  line-height: 1.4;
`;


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
    },
    {
      front: (
        <F2 />
      ),
      back: (
        <B2 />
      ),
    },
    {
      front: (
        <F4 />
      ),
      back: (
        <B4 />
      ),
    },
    {
      front: (
        <F3 />
      ),
      back: (
        <B3 />
      ),
    },

  ];

  return (
    <Container maxWidth="sm">
            <WelcomeContainer>
        <WelcomeHeadline>Welcome to Headline 👋</WelcomeHeadline>
        <ReactMarkdown> --- </ReactMarkdown>
        <WelcomeDescription>
          Every conversation is a blank canvas and you are the artists. <br/>
          Why not paint a masterpiece? ✨
        </WelcomeDescription>
      </WelcomeContainer>

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
      <Box height={15} />
      <CardGrid cards={cardsData} />
    </Container>
  );
}
