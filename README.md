Folder structure 

my-music-app/
├── public/
│   ├── songs/              ← your 8 mp3 files
│   └── covers/             ← album art images (optional)
├── src/
│   ├── app/
│   │   └── store.js        ← Redux store setup
│   ├── features/
│   │   └── player/
│   │       └── playerSlice.js   ← current song, isPlaying, volume, etc.
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   ├── player/
│   │   │   ├── PlayerBar.jsx        ← bottom bar that holds everything
│   │   │   ├── PlayerControls.jsx   ← play, pause, next, previous
│   │   │   ├── ProgressBar.jsx      ← seek slider
│   │   │   └── VolumeControl.jsx
│   │   └── songs/
│   │       ├── SongList.jsx
│   │       └── SongItem.jsx
│   ├── data/
│   │   └── songs.js        ← your 8 songs as an array (temporary, until backend)
│   ├── hooks/
│   │   └── useAudioPlayer.js   ← handles the HTML audio element
│   ├── pages/
│   │   └── Home.jsx
│   ├── theme/
│   │   └── theme.js        ← MUI theme (colors, dark mode)
│   ├── utils/
│   │   └── formatTime.js   ← converts 185 seconds to "3:05"
│   ├── App.jsx
│   └── main.jsx





PROJECT: React music player app for my 6 original songs (made by me, artist "Lavan").
WORKFLOW: Free Claude account, so copy-paste approach into VS Code. Frontend first, backend later.
Don't change the agreed folder structure. Give code file by file with exact paths.

STACK: React (Vite), Material UI + MUI Icons (import icons by full path),
Redux Toolkit (RTK Query later for backend), react-router-dom using createBrowserRouter
(not the BrowserRouter component). Login/logout will be added later.
Note: VS Code sometimes auto-imports the MUI "Outlet" icon. It must come from react-router-dom.

DESIGN: 60-30-10 colors: base #121110, surface #26231F, accent vermilion #FF6B3D.
Fonts: Fraunces (headings), DM Sans (body). Editorial, record-label look with a spinning
vinyl. Spotify-style fixed layout (left sidebar, right panel, bottom player bar, no page scroll).
Only the tracklist scrolls.

FOLDER STRUCTURE:
src/app/store.js, src/app/router.jsx
src/features/player/playerSlice.js
src/components/layout/Header.jsx, Sidebar.jsx, RootLayout.jsx
src/components/player/PlayerBar.jsx, PlayerControls.jsx, ProgressBar.jsx, VolumeControl.jsx
src/components/songs/SongList.jsx, SongItem.jsx
src/data/songs.js, src/hooks/useAudioPlayer.js, src/hooks/useSongDurations.js
src/pages/Home.jsx, src/theme/theme.js, src/utils/formatTime.js
App.jsx only renders <RouterProvider router={router} />.
Songs are in public/songs/ and referenced as '/songs/name.mp3'.
songs.js has 6 songs (id, title, artist, src, cover) with no hardcoded duration.

DONE (all working):
- Theme, routing, Spotify-style layout
- Redux player slice: play/pause, next/prev, shuffle, repeat off/all/one, volume, mute
- Real audio playback via useAudioPlayer, with PlayerBar (seek + volume)
- Durations calculated dynamically from the mp3 files (useSongDurations hook),
  Home.jsx passes songsWithDuration to SongList, and the duration bug is fixed.

TO DO SOON: hero text still says "Eight songs" but I have 6 (make it dynamic).

NEXT: polish the UI, add album covers, then the backend and login.