import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import MusicNoteRounded from '@mui/icons-material/MusicNoteRounded';
import { formatTime } from '../../utils/formatTime';

export const ROW_COLUMNS = '56px 1fr 64px';

const bounce = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
`;

function Equalizer({ playing }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: 16 }}>
      {[0, 0.25, 0.5].map((delay) => (
        <Box
          key={delay}
          sx={{
            width: 3,
            height: '100%',
            bgcolor: 'primary.main',
            borderRadius: 1,
            transformOrigin: 'bottom',
            transform: 'scaleY(0.3)',
            animation: `${bounce} 0.9s ease-in-out ${delay}s infinite`,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        />
      ))}
    </Box>
  );
}

export default function SongItem({ song, index, isActive, isPlaying, onPlay }) {
  const HoverIcon = isActive && isPlaying ? PauseRounded : PlayArrowRounded;

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => onPlay(song)}
      onKeyDown={(e) => e.key === 'Enter' && onPlay(song)}
      sx={{
        display: 'grid',
        gridTemplateColumns: ROW_COLUMNS,
        alignItems: 'center',
        py: 1.25,
        borderRadius: 2,
        cursor: 'pointer',
        outline: 'none',
        bgcolor: isActive ? 'background.paper' : 'transparent',
        transition: 'background-color 0.2s',
        '&:hover, &:focus-visible': { bgcolor: 'background.paper' },
        '& .play': { display: 'none' },
        '&:hover .num, &:focus-visible .num': { display: 'none' },
        '&:hover .play, &:focus-visible .play': { display: 'flex' },
      }}
    >
      {/* Number / equalizer / hover play icon */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box className="num" sx={{ display: 'flex' }}>
          {isActive ? (
            <Equalizer playing={isPlaying} />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          )}
        </Box>
        <Box className="play" sx={{ color: 'text.primary' }}>
          <HoverIcon fontSize="small" />
        </Box>
      </Box>

      {/* Cover + title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: 1,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            display: 'grid',
            placeItems: 'center',
            color: 'text.secondary',
            overflow: 'hidden',
          }}
        >
          {song.cover ? (
            <Box component="img" src={song.cover} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <MusicNoteRounded fontSize="small" />
          )}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            noWrap
            sx={{ fontWeight: 500, color: isActive ? 'primary.main' : 'text.primary' }}
          >
            {song.title}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {song.artist}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'right', pr: 2, fontVariantNumeric: 'tabular-nums' }}
      >
        {song.duration ? formatTime(song.duration) : '–:––'}
      </Typography>
    </Box>
  );
}