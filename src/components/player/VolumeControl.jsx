import { Box, IconButton, Slider } from '@mui/material';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import VolumeOffRounded from '@mui/icons-material/VolumeOffRounded';

export default function VolumeControl({ volume, muted, onChange, onToggleMute }) {
  const level = muted ? 0 : volume;
  const Icon = level === 0 ? VolumeOffRounded : level < 0.5 ? VolumeDownRounded : VolumeUpRounded;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 150 }}>
      <IconButton
        size="small"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
      >
        <Icon fontSize="small" />
      </IconButton>

      <Slider
        aria-label="Volume"
        size="small"
        min={0}
        max={1}
        step={0.01}
        value={level}
        onChange={(_, v) => onChange(v)}
        sx={{
          '& .MuiSlider-rail': { bgcolor: 'rgba(242,237,230,0.2)', opacity: 1 },
          '& .MuiSlider-track': { border: 'none' },
          '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
            opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover, &.Mui-focusVisible, &.Mui-active': { boxShadow: 'none' },
          },
          '&:hover .MuiSlider-thumb, & .MuiSlider-thumb.Mui-active': { opacity: 1 },
        }}
      />
    </Box>
  );
}