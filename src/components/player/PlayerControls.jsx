import { Box, IconButton } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import SkipNextRounded from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRounded from '@mui/icons-material/SkipPreviousRounded';
import ShuffleRounded from '@mui/icons-material/ShuffleRounded';
import RepeatRounded from '@mui/icons-material/RepeatRounded';
import RepeatOneRounded from '@mui/icons-material/RepeatOneRounded';

const toggleSx = (active) => ({
  color: active ? 'primary.main' : 'text.secondary',
  '&:hover': { color: active ? 'primary.main' : 'text.primary' },
});

export default function PlayerControls({
  isPlaying,
  shuffle,
  repeat,
  onToggle,
  onNext,
  onPrev,
  onShuffle,
  onRepeat,
}) {
  const RepeatIcon = repeat === 'one' ? RepeatOneRounded : RepeatRounded;
  const PlayIcon = isPlaying ? PauseRounded : PlayArrowRounded;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton size="small" onClick={onShuffle} aria-label="Shuffle" sx={toggleSx(shuffle)}>
        <ShuffleRounded fontSize="small" />
      </IconButton>

      <IconButton onClick={onPrev} aria-label="Previous" sx={toggleSx(false)}>
        <SkipPreviousRounded />
      </IconButton>

      <IconButton
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        sx={{
          width: 40,
          height: 40,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': { bgcolor: 'primary.light' },
        }}
      >
        <PlayIcon />
      </IconButton>

      <IconButton onClick={onNext} aria-label="Next" sx={toggleSx(false)}>
        <SkipNextRounded />
      </IconButton>

      <IconButton
        size="small"
        onClick={onRepeat}
        aria-label="Repeat"
        sx={toggleSx(repeat !== 'off')}
      >
        <RepeatIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}