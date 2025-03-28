import React, { useState, useRef } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    audioRef.current.loop = !isRepeat;
  };

  const handleProgress = (e) => {
    const value = e.target.value;
    setProgress(value);
    audioRef.current.currentTime = (audioRef.current.duration * value) / 100;
  };

  return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4 flex items-center justify-between">
      {/* Left - Song Info */}
      <div className="flex items-center space-x-4 w-1/3">
        <img
          src="https://res.cloudinary.com/dcbqh6tx4/image/upload/v1742561662/images_udpez1.jpg"
          alt="Album Art"
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-sm font-bold">
          Winner Takes All (Full Length)
          </h3>
          <p className="text-xs text-gray-400">Songs To Your Eyes</p>
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
          <FaRedo
            className={`cursor-pointer ${
              isRepeat ? "text-green-500" : "text-gray-500"
            } hover:text-white`}
            onClick={toggleRepeat}
          />
        </div>
        {/* Progress Bar */}
        <div className="flex items-center w-full mt-2">
          <span className="text-xs">0:00</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
            className="w-full mx-2 cursor-pointer"
          />
          <span className="text-xs">3:15</span>
        </div>
      </div>

      {/* Right - Volume & Settings */}
      <div className="flex items-center space-x-4 w-1/3 justify-end">
        <FaVolumeUp className="text-gray-400 cursor-pointer hover:text-white" />
        <input type="range" className="w-20 cursor-pointer" />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src="https://example.com/song.mp3"></audio>
    </div>
  );
};

export default MusicPlayer;
