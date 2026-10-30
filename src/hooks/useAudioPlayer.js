import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { songs } from '../data/songs';
import {
  togglePlay,
  setPlaying,
  next,
  prev,
  songEnded,
  setVolume,
  toggleMute,
  toggleShuffle,
  cycleRepeat,
} from '../features/player/playerSlice';

export default function useAudioPlayer() {
  const dispatch = useDispatch();
  const { currentIndex, isPlaying, volume, muted, shuffle, repeat } = useSelector(
    (state) => state.player
  );

  const song = currentIndex !== null ? songs[currentIndex] : null;
  const src = song?.src;
  const fallbackDuration = song?.duration ?? 0;

  const audioRef = useRef(null);
  if (!audioRef.current) audioRef.current = new Audio();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 1. Load a new song when it changes
  useEffect(() => {
    if (!src) return;
    audioRef.current.src = src;
    setCurrentTime(0);
    setDuration(fallbackDuration);
  }, [src, fallbackDuration]);

  // 2. Play / pause (runs after the effect above, so src is already set)
  useEffect(() => {
    const audio = audioRef.current;
    if (!src) return;
    if (isPlaying) {
      audio.play().catch((err) => {
        // AbortError just means we switched songs quickly. Ignore it.
        if (err.name !== 'AbortError') dispatch(setPlaying(false));
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, src, dispatch]);

  // 3. Volume and mute
  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  // 4. Listen to audio events
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onMetadata = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    const onEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => dispatch(setPlaying(false)));
      } else {
        dispatch(songEnded());
      }
    };
    const onError = () => dispatch(setPlaying(false));

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [dispatch, repeat]);

  // Stop the sound if the player is ever unmounted
  useEffect(() => {
    const audio = audioRef.current;
    return () => audio.pause();
  }, []);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  // Like Spotify: after 3 seconds, "previous" restarts the song
  const handlePrev = useCallback(() => {
    if (audioRef.current.currentTime > 3) {
      seek(0);
    } else {
      dispatch(prev());
    }
  }, [dispatch, seek]);

  return {
    song,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    shuffle,
    repeat,
    seek,
    togglePlay: () => dispatch(togglePlay()),
    next: () => dispatch(next()),
    prev: handlePrev,
    setVolume: (value) => dispatch(setVolume(value)),
    toggleMute: () => dispatch(toggleMute()),
    toggleShuffle: () => dispatch(toggleShuffle()),
    cycleRepeat: () => dispatch(cycleRepeat()),
  };
}