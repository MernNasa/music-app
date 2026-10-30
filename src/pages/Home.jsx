
import { Box, Button, Container, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import ShuffleRounded from '@mui/icons-material/ShuffleRounded';
import SongList from '../components/songs/SongList';
import { songs } from '../data/songs';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, togglePlay, shuffleAll } from '../features/player/playerSlice';

import useSongDurations from '../hooks/useSongDurations';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

function Vinyl({ isPlaying }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        width: { xs: 140, sm: 180, lg: 230 },
        aspectRatio: '1',
        borderRadius: '50%',
        background:
          'repeating-radial-gradient(circle at center, #0A0908 0 2px, #1A1815 3px 4px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.65)',
        animation: `${spin} 14s linear infinite`,
        animationPlayState: isPlaying ? 'running' : 'paused',
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, transparent 0 18%, rgba(255,255,255,0.08) 25%, transparent 32% 68%, rgba(255,255,255,0.08) 75%, transparent 82%)',
        },
      }}
    >
      {/* Centre label */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '34%',
          aspectRatio: '1',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          bgcolor: 'primary.main',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: { xs: 12, md: 16 },
            color: 'primary.contrastText',
            letterSpacing: 1,
          }}
        >
          SIDE A
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            width: '9%',
            aspectRatio: '1',
            borderRadius: '50%',
            bgcolor: 'background.default',
            bottom: '14%',
          }}
        />
      </Box>
    </Box>
  );
}

export default function Home() {
  // Temporary local state. Redux (playerSlice) will replace this.
//   const [activeId, setActiveId] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
const dispatch = useDispatch();
  const { currentIndex, isPlaying } = useSelector((state) => state.player);
  const activeId = currentIndex !== null ? songs[currentIndex].id : null;
  const durations = useSongDurations();
  const songsWithDuration = songs.map((s) => ({ ...s, duration: durations[s.id] ?? 0 }));

  const handlePlay = (song) => {
    dispatch(playSong(songs.findIndex((s) => s.id === song.id)));
  };

   const handleShuffle = () => dispatch(shuffleAll());

    const totalMinutes = Math.round(
    songsWithDuration.reduce((sum, s) => sum + s.duration, 0) / 60
  );
  const PlayAllIcon = isPlaying ? PauseRounded : PlayArrowRounded;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 2, md: 4 },
        pb: 2,
        overflowY:"scroll",'&::-webkit-scrollbar': {display:"none"},'&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(242,237,230,0.15)', borderRadius: 3 },
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          flexShrink: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
          alignItems: 'center',
          gap: { xs: 3, md: 6 },
          py: { xs: 1, md: 2 },
          
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: 3, fontWeight: 700 }}
          >
            Debut collection
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mt: 0.5,
              fontSize: { xs: 32, md: 44, lg: 54 },
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Eight songs, written and made{' '}
            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
              by me.
            </Box>
          </Typography>

          <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<PlayAllIcon />}
              onClick={() => dispatch(togglePlay())}
            >
              {isPlaying ? 'Pause' : 'Play all'}
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ShuffleRounded />}
              onClick={handleShuffle}
              sx={{ borderColor: 'divider' }}
            >
              Shuffle
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {songs.length} tracks · {totalMinutes} min
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
          <Vinyl isPlaying={isPlaying} />
        </Box>
      </Box>

      {/* Tracklist: fills the remaining height */}
      <Box id="tracklist" sx={{ flex: 1, minHeight: 300, display: 'flex', flexDirection: 'column', mt: 1,  }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2, flexShrink: 0 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 28 } }}>
            Tracklist
          </Typography>
          <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
        </Box>

        <SongList
          songs={songsWithDuration}
          activeId={activeId}
          isPlaying={isPlaying}
          onPlay={handlePlay}
        />
      </Box>
    </Box>
  );
}