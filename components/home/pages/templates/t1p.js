import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import apiBaseUrl from '../../../../utils/apiConfig';
import Icon from '@mui/icons-material/OpenInNew';
import axios from 'axios';


const t1p = ({ author, username, program, yearOfStudy, authorID, setActiveProfile, setProfileId  }) => {

    const navigateToProfile = async () => {
      try {
        setProfileId(authorID);  // Set the profile ID to the author ID
        const response = await axios.get(`${apiBaseUrl}/api/profile/full/${authorID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with how you're storing tokens
          }
        });
        
        if (response.status === 200) {
          const fullProfile = response.data;
          setActiveProfile(fullProfile);  // Set the active profile to the full profile
        }
      } catch (error) {
        console.error("Error while fetching full profile:", error);
      }
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
          position: 'relative', 
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px',
          borderRadius: '5px',
          marginTop: '10px',
          marginBottom: '5px',
          zIndex: 4,
        }}
        onClick={navigateToProfile}
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
          {`${(program ?? 'N/A').toUpperCase()}` }-{`${yearOfStudy ?? ''}`}
        </Typography>
      </div>
    </div>
  );
};

export default t1p;
