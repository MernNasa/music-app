import { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { formatTime } from '../../utils/formatTime';

const timeSx = {
  width: 40,
  color: 'text.secondary',
  fontVariantNumeric: 'tabular-nums',
};

export default function ProgressBar({ currentTime, duration, onSeek, disabled }) {
  const [dragValue, setDragValue] = useState(null);
  const max = duration || 1;
  const value = Math.min(dragValue ?? currentTime, max);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
      <Typography variant="caption" sx={{ ...timeSx, textAlign: 'right' }}>
        {formatTime(value)}
      </Typography>

      <Slider
        aria-label="Seek"
        size="small"
        min={0}
        max={max}
        step={0.1}
        value={value}
        disabled={disabled}
        onChange={(_, v) => setDragValue(v)}
        onChangeCommitted={(_, v) => {
          onSeek(v);
          setDragValue(null);
        }}
        sx={{
          height: 4,
          py: 1,
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

      <Typography variant="caption" sx={timeSx}>
        {formatTime(duration)}
      </Typography>
    </Box>
  );
}