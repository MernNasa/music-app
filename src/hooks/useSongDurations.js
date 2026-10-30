import { useEffect, useState } from 'react';
import { songs } from '../data/songs';

// Module-level cache: durations are loaded once, even if the page remounts
const cache = {};

export default function useSongDurations() {
  const [durations, setDurations] = useState({ ...cache });

  useEffect(() => {
    let cancelled = false;

    songs.forEach((song) => {
      if (cache[song.id]) return;

      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = song.src;
      audio.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(audio.duration)) {
          cache[song.id] = audio.duration;
          if (!cancelled) setDurations({ ...cache });
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return durations;
}