import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Box } from '@mui/material';
import styled from '@emotion/styled';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CardGrid from '../components/CardGrid';
import T1F from '../components/home/pages/templates/t1f';
import T1B from '../components/home/pages/templates/t1b';
import funnies from '../components/cards/landing/funnyExamples.json';

// Styled components
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
  const [cardsData, setCardsData] = useState<
    { front: React.ReactElement; back: React.ReactElement }[]
  >([]);

  useEffect(() => {
    const transformedData = funnies.map((card) => ({
      front: (
        <T1F
          header={card.front.headline}
          hook={card.front.hook}
          callToAction={card.front.punchline}
          emoji={card.front.emoji}
        />
      ),
      back: (
        <T1B
          headline={card.front.headline}
          author=""
          program={
            ['COMMERCE', 'ARTSCI', 'ENGINEERING'][Math.floor(Math.random() * 3)]
          }
          yearOfStudy={
            ['FROSH', 'SECOND YEAR', 'FOURTH YEAR'][Math.floor(Math.random() * 3)]
          }
          description={card.back.article}
          postId={NaN}
        />
      ),
    }));
    setCardsData(transformedData);
  }, []);

  return (
    <Container maxWidth="sm">
      <WelcomeContainer>
        <WelcomeHeadline>Welcome to Headline 👋</WelcomeHeadline>
        <WelcomeDescription>
          Every conversation is a blank canvas and you are the artists.
          <br />
          Why not paint a masterpiece? ✨
        </WelcomeDescription>
      </WelcomeContainer>
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
      <Box height={30} />
      {showLogin && <LoginForm />}
      {showRegister && <RegisterForm />}
      <Box height={30} />
      <CardGrid cards={cardsData} />
    </Container>
  );
}
