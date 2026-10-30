import { Box, Typography } from '@mui/material';
import MusicNoteRounded from '@mui/icons-material/MusicNoteRounded';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default function PlayerBar() {
  const player = useAudioPlayer();
  const { song } = player;

  return (
    <Box
      component="footer"
      sx={{
        gridColumn: '1 / -1',
        minHeight: 0,
        borderRadius: 2,
        bgcolor: 'background.paper',
        px: 2,
        display: 'grid',
        alignItems: 'center',
        gap: 2,
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          md: 'minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1fr)',
        },
      }}
    >
      {/* Left: current song */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, minWidth: 0 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            flexShrink: 0,
            borderRadius: 1,
            bgcolor: 'background.default',
            display: 'grid',
            placeItems: 'center',
            color: 'text.secondary',
            overflow: 'hidden',
          }}
        >
          {song?.cover ? (
            <Box component="img" src={song.cover} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <MusicNoteRounded />
          )}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 500 }}>
            {song ? song.title : 'Nothing playing'}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {song ? song.artist : 'Pick a song to start'}
          </Typography>
        </Box>
      </Box>

      {/* Centre: controls + progress */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25 }}>
        <PlayerControls
          isPlaying={player.isPlaying}
          shuffle={player.shuffle}
          repeat={player.repeat}
          onToggle={player.togglePlay}
          onNext={player.next}
          onPrev={player.prev}
          onShuffle={player.toggleShuffle}
          onRepeat={player.cycleRepeat}
        />
        <ProgressBar
          currentTime={player.currentTime}
          duration={player.duration}
          onSeek={player.seek}
          disabled={!song}
        />
      </Box>

      {/* Right: volume */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
        <VolumeControl
          volume={player.volume}
          muted={player.muted}
          onChange={player.setVolume}
          onToggleMute={player.toggleMute}
        />
      </Box>
    </Box>
  );
}