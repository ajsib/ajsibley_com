import React, { useState, Dispatch, SetStateAction } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import SearchIcon from '@mui/icons-material/SearchTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircleTwoTone';
import LockIcon from '@mui/icons-material/LockTwoTone';
import PersonIcon from '@mui/icons-material/PersonTwoTone';

type FooterNavProps = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

export default function FooterNav({ activeTab, setActiveTab }: FooterNavProps) {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box
        // display="flex"
        justifyContent="center"
        alignItems="center"
        // overflow="hidden"
      >
        {/* Your content here */}
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setActiveTab(newValue); // Update the activeTab in the parent component
        }}
        showLabels
        style={{
          position: 'fixed',
          bottom: 0,
          left: '0px',
          right: '0px',
          zIndex: 98,
          boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.2)', // Add shadow
          borderRadius: '7px 7px 0 0', // Round the top corners
        }}
      >
        <BottomNavigationAction label="" icon={<HomeIcon />} />
        <BottomNavigationAction label="" icon={<SearchIcon />} />
        <BottomNavigationAction label="" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="" icon={<LockIcon />} />
        <BottomNavigationAction label="" icon={<PersonIcon />} />
      </BottomNavigation>
    </>
  );
}
