import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import HomeRounded from '@mui/icons-material/HomeRounded';
import QueueMusicRounded from '@mui/icons-material/QueueMusicRounded';

function NavItem({ to, icon, label }) {
  return (
    <Box
      component={NavLink}
      to={to}
      end
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1.25,
        borderRadius: 1.5,
        textDecoration: 'none',
        color: 'text.secondary',
        fontWeight: 500,
        transition: 'color 0.2s, background-color 0.2s',
        '&:hover': { color: 'text.primary' },
        '&.active': { color: 'text.primary', bgcolor: 'rgba(242,237,230,0.06)' },
      }}
    >
      {icon}
      <Typography sx={{ fontWeight: 'inherit', color: 'inherit' }}>{label}</Typography>
    </Box>
  );
}

export default function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        minHeight: 0,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 2, py: 1.5, mb: 2 }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
        <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, fontSize: 22 }}>
         Sundari App
        </Typography>
      </Box>

      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <NavItem to="/" icon={<HomeRounded />} label="Home" />
        {/* <NavItem to="#tracklist" icon={<QueueMusicRounded />} label="Tracklist" /> */}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
        <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2, fontWeight: 700 }}>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6 }}>
          Eight original songs, written, produced and mixed by me.
        </Typography>
      </Box>
    </Box>
  );
}