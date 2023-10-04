import React, { useState, Dispatch, SetStateAction } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';

type FooterNavProps = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

export default function FooterNav({ activeTab, setActiveTab }: FooterNavProps) {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {/* Your content here */}
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setActiveTab(newValue);  // Update the activeTab in the parent component
        }}
        showLabels
        style={{
          position: 'fixed',
          bottom: 0,
          left: '10px',
          right: '10px',
          zIndex: 98,
        }}
      >
        <BottomNavigationAction label="" icon={<HomeIcon />} />
        <BottomNavigationAction label="" icon={<SearchIcon />} />
        <BottomNavigationAction label="" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="" icon={<LockIcon />} />
        <BottomNavigationAction label="" icon={<SettingsIcon />} />
      </BottomNavigation>
    </>
  );
}
