import { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // Thêm bài hát vào playlist và phát
  const playSong = (song, songs = []) => {
    setPlaylist(songs);
    const index = songs.findIndex((s) => s._id === song._id);
    setCurrentIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Chuyển bài hát tiếp theo
  const nextSong = () => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    setCurrentIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };

  // Chuyển bài hát trước đó
  const prevSong = () => {
    if (playlist.length === 0) return;

    let prevIndex;
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }

    setCurrentIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  };

  // Toggle chế độ repeat
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  // Toggle chế độ shuffle
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlist,
        isRepeat,
        isShuffle,
        playSong,
        nextSong,
        prevSong,
        toggleRepeat,
        toggleShuffle,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
