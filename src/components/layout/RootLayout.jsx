import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import PlayerBar from '../player/PlayerBar';

const panel = {
  borderRadius: 2,
  overflow: 'hidden',
  minHeight: 0,
};

export default function RootLayout() {
  return (
    <Box
      sx={{
        height: '100dvh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '280px minmax(0, 1fr)' },
        gridTemplateRows: 'minmax(0, 1fr) 88px',
        gap: 1,
        p: 1,
        bgcolor: 'background.default',
      }}
    >
      <Sidebar />

      {/* Right section */}
      <Box
        component="section"
        sx={{
          ...panel,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #2F2B26 0%, #181614 340px)',
        }}
      >
        <Header />
        <Box component="main" sx={{ flex: 1, minHeight:0}}>
          <Outlet />
        </Box>
      </Box>

      {/* Player bar placeholder: replaced by <PlayerBar /> in the next step */}
      <Box
        sx={{
          ...panel,
          gridColumn: '1 / -1',
          position:"relative",
          bottom:0,
          zIndex:100,
          bgcolor: 'background.paper',
          display: 'grid',
          placeItems: 'center',
          color: 'text.secondary',
        }}
      >
        <PlayerBar/>
      </Box>
    </Box>
  );
}