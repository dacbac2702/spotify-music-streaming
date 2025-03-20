import React, { useState, useEffect } from "react";

const MusicPlayer = ({ songId }) => {
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    const fetchSongUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/songs/stream/${songId}`
        );
        const data = await response.json();

        if (data.streamUrl) {
          setStreamUrl(data.streamUrl);
        } else {
          console.error("Lỗi: Không lấy được URL phát nhạc");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API phát nhạc:", error);
      }
    };

    if (songId) {
      fetchSongUrl();
    }
  }, [songId]);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-2">Now Playing</h2>
      {streamUrl ? (
        <audio controls autoPlay className="w-full">
          <source src={streamUrl} type="audio/mpeg" />
          Trình duyệt của bạn không hỗ trợ phát nhạc.
        </audio>
      ) : (
        <p>Đang tải bài hát...</p>
      )}
    </div>
  );
};

export default MusicPlayer;
