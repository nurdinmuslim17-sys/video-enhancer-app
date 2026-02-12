
import React, { useState } from "react";

export default function App() {
  const [video, setVideo] = useState(null);
  const [bitrate, setBitrate] = useState(14);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>AI Video Upscale 720p → 1080p</h2>

      <input type="file" accept="video/*" onChange={handleUpload} />

      {video && (
        <div style={{ marginTop: 20 }}>
          <video src={video} controls width="100%" />
          
          <div style={{ marginTop: 10 }}>
            <label>Bitrate (12–16 Mbps): {bitrate} Mbps</label><br/>
            <input
              type="range"
              min="12"
              max="16"
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
            />
          </div>

          <p style={{ marginTop: 10 }}>
            Export: 1080p • H.264 • 30fps • {bitrate} Mbps (Shopee/TikTok Ready)
          </p>
        </div>
      )}
    </div>
  );
}
