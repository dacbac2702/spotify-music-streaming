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
  const { currentSong, isPlaying, setIsPlaying } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  // Xử lý khi currentSong thay đổi
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  // Xử lý play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Cập nhật thanh tiến trình
  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setDuration(duration);
    setCurrentTime(currentTime);
    setProgress((currentTime / duration) * 100);
  };

  // Xử lý khi kéo thanh tiến trình
  const handleProgressChange = (e) => {
    const value = e.target.value;
    setProgress(value);
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration * value) / 100;
    }
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
          <FaRandom className="text-gray-500 cursor-pointer hover:text-green-500" />
          <FaStepBackward className="text-gray-300 cursor-pointer hover:text-white" />
          <button
            onClick={togglePlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-110 transition"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <FaStepForward className="text-gray-300 cursor-pointer hover:text-white" />
          <FaRedo className="text-gray-500 cursor-pointer hover:text-white" />
        </div>
        {/* Progress Bar */}
        <div className="flex items-center w-full mt-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full mx-2 cursor-pointer"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume & Settings */}
      <div className="flex items-center space-x-4 w-1/3 justify-end">
        <FaVolumeUp className="text-gray-400 cursor-pointer hover:text-white" />
        <input type="range" className="w-20 cursor-pointer" />
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        hidden
      />
    </div>
  );
};

export default MusicPlayer;
