import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { FaUsers, FaSearch, FaPollH, FaRegNewspaper } from 'react-icons/fa';

const SocialMarketingPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : null);
  };

  const features = [
    {
      title: 'Join Communities',
      // icon: <FaUsers size={30} />,
      description: 'Find your Vibe! Join communities that resonate with you and engage in meaningful conversations.',
    },
    {
      title: 'Search & Follow Friends',
      // icon: <FaSearch size={30} />,
      description: 'Easily search for friends and follow their activity. Stay connected, always!',
    },
    {
      title: 'Coordinate Party Locations',
      // icon: <FaPollH size={30} />,
      description: 'Vote on the hottest party locations and coordinate meetups. Never miss out on the fun!',
    },
    {
      title: 'Club & Community Updates',
      // icon: <FaRegNewspaper size={30} />,
      description: 'Stay in the loop with updates from your club or community. Know what&apos;s trending!',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
        <Typography variant="h2" align="center">
          Connect, Engage, Enjoy!
        </Typography>
      </Paper>

      {/* Features */}
      <Grid container spacing={4} style={{ marginTop: '40px' }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} style={{ padding: '20px', minHeight: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* {feature.icon} */}
                <Typography variant="h4" style={{ marginLeft: '10px' }}>
                  {feature.title}
                </Typography>
              </div>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Paper elevation={3} style={{ padding: '40px', marginTop: '40px', backgroundColor: '#2196F3', color: 'white' }}>
        <Typography variant="h4" align="center">
          Ready to Join Us?
        </Typography>
        <Button variant="contained" color="secondary" size="large" style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
          Get Started
        </Button>
      </Paper>
    </Container>
  );
};

export default SocialMarketingPage;
