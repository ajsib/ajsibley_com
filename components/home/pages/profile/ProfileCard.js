// ProfileCard.js
import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import { TextField, Button } from '@mui/material';


const StyledPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  font-family: 'Georgia', serif;
  box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileCard = ({ userInfo }) => {
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(!isEditing);
  };

  return (
    <StyledPaper>
      <IconButton onClick={handleEdit} sx={{ alignSelf: 'flex-end' }}>
        <EditIcon />
      </IconButton>

      <Avatar sx={{ width: 100, height: 100 }}>{userInfo.username?.[0]?.toUpperCase() || 'U'}</Avatar>
        <Typography variant="h5" style={{ fontWeight: "bold", fontFamily: "'Comic Sans MS', sans-serif", padding: 5 }}>
          @{userInfo.username || "username_here"}
        </Typography>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Bio"
              multiline
              margin='normal'
              minRows={3}
              defaultValue={userInfo.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
            {userInfo.contactType && (
              <TextField
                label="Contact Info"
                fullWidth
                value={userInfo.contactInfo || getDefaultPrefix(userInfo.contactType)}
                onChange={handleContactInfoChange}
              />
            )}
            <Button variant="contained" color="primary" onClick={() => {
              // Add API call to update user Bio here.
              setEditing(false);
            }}>
              Save
            </Button>
          </>
        ) : (
          <>
            <hr style={{ width: "80%", border: "0.5px solid #777", marginBottom: '10px' }} />
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eee', padding: '5px 10px', borderRadius: '5px', marginBottom: '10px' }}>
              <Typography variant="subtitle1" style={{ color: "#333", fontFamily: 'Georgia, serif', fontWeight: "bold", padding: '2px 10px' }}>
                {`${userInfo?.yearOfStudyString ?? 'N/A'} Year - ${(userInfo?.program ?? 'N/A').toUpperCase()}`}
              </Typography>
              <span style={{ fontSize: '24px', marginLeft: '10px' }}>{userInfo?.userEmoji ?? '😀'}</span>
            </div>
            <Typography variant="body2" style={{ fontSize: '14px', color: '#777', margin: '2px 0', textAlign: 'justify', lineHeight: '1.2', fontFamily: 'Georgia, serif' , padding: '10px 1px' }}>
              {userInfo?.bio ?? 'No bio available.'}
            </Typography>
            <Typography variant="caption" style={{ fontSize: '10px', color: "#777", fontFamily: 'Comic Sans MS, serif' }}>
              Joined: <span style={{ fontWeight: 'bold' }}>{userInfo.dateJoined || 'N/A'}</span>
            </Typography>
          </>
        )}
    </StyledPaper>
  );
};

export default ProfileCard;
