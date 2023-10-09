import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icon from '@mui/icons-material/OpenInNew';

const YourProfileCard = ({ username, program, emoji, year }) => {
    const navigateToProfile = () => {
        // Implement here!!!
    };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',  // Add this line
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px',
          borderRadius: '5px',
          marginTop: '10px',
          marginBottom: '5px',
        }}
        onClick={navigateToProfile} // Add onClick event here
      >
        <Avatar sx={{ width: 75, height: 75 }}>{username?.[0]?.toUpperCase() || 'U'}</Avatar>
        <Icon 
          color='#eee' 
          style={{
            position: 'absolute', 
            top: 0,                
            right: 0,              
            padding: 0,            
            margin: 0,              
            fontSize: '1.2rem',
          }}
        />
      </div>
      <Typography variant="h5" style={{ fontWeight: "bold", fontFamily: "'Comic Sans MS', sans-serif", padding: 5 }}>
        @{username || "username_here"}
      </Typography>

      <hr style={{ width: "80%", border: "0.5px solid #777", marginBottom: '10px' }} />

      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eee', padding: '5px 10px', borderRadius: '5px', marginBottom: '10px' }}>
        <Typography variant="subtitle1" style={{ color: "#333", fontFamily: 'Georgia, serif', fontWeight: "bold", padding: '2px 10px' }}>
          {`${(program ?? 'N/A').toUpperCase()}` } | {`${year ?? ''}`} 
        </Typography>
      </div>
    </div>
  );
};

export default YourProfileCard;
