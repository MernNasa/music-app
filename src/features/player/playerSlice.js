import { createSlice } from '@reduxjs/toolkit';
import { songs } from '../../data/songs';

const initialState = {
  currentIndex: null,
  isPlaying: false,
  volume: 0.8,
  muted: false,
  shuffle: false,
  repeat: 'off', // 'off' | 'all' | 'one'
};

const randomOther = (current) => {
  if (songs.length < 2) return 0;
  let i;
  do {
    i = Math.floor(Math.random() * songs.length);
  } while (i === current);
  return i;
};

const nextIndex = (state) => {
  if (state.currentIndex === null) return 0;
  if (state.shuffle) return randomOther(state.currentIndex);
  return (state.currentIndex + 1) % songs.length;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Click on a song: toggle if it's the current one, otherwise start it
    playSong(state, action) {
      const index = action.payload;
      if (index === state.currentIndex) {
        state.isPlaying = !state.isPlaying;
      } else {
        state.currentIndex = index;
        state.isPlaying = true;
      }
    },
    togglePlay(state) {
      if (state.currentIndex === null) {
        state.currentIndex = 0;
        state.isPlaying = true;
      } else {
        state.isPlaying = !state.isPlaying;
      }
    },
    setPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    shuffleAll(state) {
      state.currentIndex = randomOther(state.currentIndex);
      state.isPlaying = true;
    },
    next(state) {
      state.currentIndex = nextIndex(state);
      state.isPlaying = true;
    },
    prev(state) {
      if (state.currentIndex === null) return;
      state.currentIndex = (state.currentIndex - 1 + songs.length) % songs.length;
      state.isPlaying = true;
    },
    // Called when a song finishes by itself
    songEnded(state) {
      const isLast = state.currentIndex === songs.length - 1;
      if (!state.shuffle && isLast && state.repeat === 'off') {
        state.isPlaying = false;
        return;
      }
      state.currentIndex = nextIndex(state);
    },
    setVolume(state, action) {
      state.volume = action.payload;
      state.muted = action.payload === 0;
    },
    toggleMute(state) {
      state.muted = !state.muted;
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    cycleRepeat(state) {
      const order = ['off', 'all', 'one'];
      state.repeat = order[(order.indexOf(state.repeat) + 1) % order.length];
    },
  },
});

export const {
  playSong,
  togglePlay,
  setPlaying,
  shuffleAll,
  next,
  prev,
  songEnded,
  setVolume,
  toggleMute,
  toggleShuffle,
  cycleRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;