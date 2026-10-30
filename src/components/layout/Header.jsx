import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        height: 64,
        flexShrink: 0,
        px: { xs: 2, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: 1.25,
          textDecoration: 'none',
          color: 'text.primary',
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
        <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, fontSize: 20 }}>
         Sundari App
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* Placeholder for the future login feature */}
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        sx={{ borderColor: 'divider', bgcolor: 'rgba(18,17,16,0.4)' }}
      >
        Sign in
      </Button>
    </Box>
  );
}