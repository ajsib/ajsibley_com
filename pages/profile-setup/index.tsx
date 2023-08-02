import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import Card from '../../components/cards/Card';
import Grid from '../../components/cards/Grid'

export default function Home() {
  const markdown = ` # Welcome to ajsibley.com 👋
  ---

  Every conversation is a blank canvas and you are the artists.  
  Why not paint a masterpiece? ✨`;
  const cards = [
    <Card front={<div>Front 1</div>} back={<div>Back 1</div>} />,
    <Card front={<div>Front 2</div>} back={<div>Back 2</div>} />,
    <Card front={<div>Front 3</div>} back={<div>Back 3</div>} />,
    // Add more cards as needed
  ]; 

  return (
    <Container maxWidth="sm">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <Grid children={cards} />;
    </Container>
  );
}


