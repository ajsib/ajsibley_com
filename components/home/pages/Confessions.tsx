import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MarketingPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpandClick = (feature: string) => {
    setExpanded(expanded === feature ? null : feature);
  };

  const commonCardStyles = {
    maxWidth: 345,
    margin: '20px',
    backgroundColor: '#003366',
  };

  const dropdownTextStyles = {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const features = [
    {
      title: 'Post 1 Confession Per Day',
      teaser: 'Make Every Word Count!',
      expandedText: 'Post one confession per day to ensure that every secret is meaningful and impactful. Less is more!',
      // icon: <FaLock size={30} color="#FFD100" />
    },
    {
      title: 'Anonymous',
      teaser: 'Be Yourself, Anonymously!',
      expandedText: 'With our privacy-focused approach, you can share what you feel without the fear of judgment. Total anonymity.',
      // icon: <FaUserSecret size={30} color="#FFD100" />
    },
    {
      title: "Funny, It's Always the Commerce Kids",
      teaser: 'Laughter Guaranteed!',
      expandedText: "You'll never run out of entertainment. Get your daily dose of laughs with quirky confessions from Commerce kids.",
      // icon: <FaLaugh size={30} color="#FFD100" />
    },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      {/* Header Section */}
      <div style={{ backgroundColor: '#003366', color: '#FFD100', padding: '2em' }}>
        <Typography variant="h2">The Future of Queen&apos;s Confessions</Typography>
      </div>

      {/* Features Section */}
      <div style={{ backgroundColor: '#FFD100', color: '#003366', padding: '2em' }}>
        <Typography variant="h4">Exciting New Features</Typography>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          {features.map((feature, index) => (
            <Card style={commonCardStyles} key={index}>
              <CardHeader
                // avatar={feature.icon}
                title={feature.title}
                titleTypographyProps={{ style: dropdownTextStyles }}
              />
              <CardContent>
                <Typography variant="body2" style={dropdownTextStyles}>{feature.teaser}</Typography>
              </CardContent>
              <IconButton
                onClick={() => handleExpandClick(feature.title)}
                aria-expanded={expanded === feature.title}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded === feature.title}>
                <CardContent>
                  <Typography variant="body2" style={dropdownTextStyles}>{feature.expandedText}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ backgroundColor: '#BA0C2F', color: '#FFD100', padding: '2em' }}>
        <Typography variant="h4">Stay Tuned for Updates!</Typography>
      </div>
    </div>
  );
};

export default MarketingPage;
