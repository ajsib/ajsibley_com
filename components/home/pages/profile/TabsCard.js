import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const StyledPaper = styled(Paper)`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  font-family: 'Georgia', serif;
  box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.1);
`;

const StyledTabs = styled(Tabs)`
  background-color: #eee;
  box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
`;

const TabsCard = ({ selectedTab, setSelectedTab, data }) => {
  const tabNames = ["Posts", "Likes", "Followers", "Following"]; // Names of the tabs
  
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <StyledPaper>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: "'Comic Sans MS', sans-serif" }}>
            {tabNames[selectedTab]}
          </Typography>
          <StyledTabs
            value={selectedTab}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab icon={<PostAddIcon />} label="32" />  {/* this will be the user posts   */}
            <Tab icon={<ThumbUpIcon />} label="16" />  {/* this will be the user likes   */}
            <Tab icon={<PeopleIcon />} label="1024" />  {/* this will be the user followers   */}
            <Tab icon={<PersonAddIcon />} label="256" />  {/* this will be the user following   */}
          </StyledTabs>
        </div>
      </StyledPaper>
    </div>
  );
};

export default TabsCard;
