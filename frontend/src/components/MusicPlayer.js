import React, { useState, useRef, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    isRepeat,
    isShuffle,
    nextSong,
    prevSong,
    toggleRepeat,
    toggleShuffle,
    setIsPlaying,
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef(null);

  // Xử lý khi currentSong thay đổi
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.error("Lỗi phát nhạc:", e));
      }
    }
  }, [currentSong]);

  // Xử lý play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.error("Lỗi phát nhạc:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Xử lý khi kết thúc bài hát
  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  // Cập nhật thanh tiến trình
  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration || 0;
    const currentTime = audioRef.current.currentTime || 0;
    setDuration(duration);
    setCurrentTime(currentTime);
    setProgress((currentTime / duration) * 100 || 0);
  };

  // Xử lý khi kéo thanh tiến trình
  const handleProgressChange = (e) => {
    const value = e.target.value;
    setProgress(value);
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration * value) / 100;
    }
  };

  // Xử lý thay đổi volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  // Format thời gian (phút:giây)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4 flex items-center justify-between">
      {/* Left - Song Info */}
      <div className="flex items-center space-x-4 w-1/3">
        <img
          src={currentSong?.coverImage || "https://via.placeholder.com/150"}
          alt="Album Art"
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-sm font-bold">
            {currentSong?.title || "Không có bài hát"}
          </h3>
          <p className="text-xs text-gray-400">
            {currentSong?.artist || "Nghệ sĩ không xác định"}
          </p>
        </div>
      </div>

      {/* Center - Controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-6">
          <FaRandom
            className={`cursor-pointer ${
              isShuffle ? "text-green-500" : "text-gray-500"
            }`}
            onClick={toggleShuffle}
            title="Shuffle"
          />
          <FaStepBackward
            className="text-gray-300 cursor-pointer hover:text-white"
            onClick={prevSong}
            title="Previous"
          />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black p-2 rounded-full hover:scale-110 transition"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <FaStepForward
            className="text-gray-300 cursor-pointer hover:text-white"
            onClick={nextSong}
            title="Next"
          />
          <FaRedo
            className={`cursor-pointer ${
              isRepeat ? "text-green-500" : "text-gray-500"
            }`}
            onClick={toggleRepeat}
            title="Repeat"
          />
        </div>
        {/* Progress Bar */}
        <div className="flex items-center w-full mt-2 space-x-2">
          <span className="text-xs w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const value = e.target.value;
              setProgress(value);
              audioRef.current.currentTime =
                (audioRef.current.duration * value) / 100;
            }}
            className="w-full cursor-pointer"
          />
          <span className="text-xs w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume Control */}
      <div className="flex items-center space-x-2 w-1/3 justify-end">
        <FaVolumeUp className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 cursor-pointer"
        />
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
        hidden
      />
    </div>
  );
};

export default MusicPlayer;
