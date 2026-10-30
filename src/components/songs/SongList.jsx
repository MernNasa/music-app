import { Box, Typography } from '@mui/material';
import SongItem, { ROW_COLUMNS } from './SongItem';

export default function SongList({ songs, activeId, isPlaying, onPlay }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight:0, }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ROW_COLUMNS,
          pb: 1.5,
          mb: 1,
          borderBottom: 1,
          borderColor: 'divider',
          color: 'text.secondary',
          flexShrink: 0,
        }}
      >
        <Typography variant="caption" sx={{ textAlign: 'center', letterSpacing: 1.5 }}>
          #
        </Typography>
        <Typography variant="caption" sx={{ letterSpacing: 1.5 }}>
          TITLE
        </Typography>
        <Typography variant="caption" sx={{ textAlign: 'right', pr: 2, letterSpacing: 1.5 }}>
          TIME
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 300
        }}
      >
        {songs.map((song, index) => (
          <SongItem
            key={song.id}
            song={song}
            index={index}
            isActive={song.id === activeId}
            isPlaying={isPlaying}
            onPlay={onPlay}
          />
        ))}
      </Box>
    </Box>
  );
}