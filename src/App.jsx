import { useState } from "react";

function App() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bitrate, setBitrate] = useState(16);

  const handleUpload = async () => {
    if (!video) {
      alert("Pilih video dulu!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("bitrate", bitrate);

    try {
      setLoading(true);

      const response = await fetch(
        "https://video-enhancer-backend-production.up.railway.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload gagal");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "video-1080p-HD.mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      alert("Video berhasil di-upscale ke 1080p HD!");
    } catch (error) {
      alert("Terjadi error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 AI Video Enhancer</h1>
      <p style={styles.subtitle}>
        Upscale 720p → 1080p | Bitrate 12–16 Mbps | Siap Shopee & TikTok
      </p>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        style={styles.input}
      />

      <div style={{ marginTop: 20 }}>
        <label>Bitrate: {bitrate} Mbps</label>
        <input
          type="range"
          min="12"
          max="16"
          value={bitrate}
          onChange={(e) => setBitrate(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Processing..." : "🚀 Upscale ke 1080p HD"}
      </button>

      {loading && <p style={{ marginTop: 20 }}>⏳ Sedang memproses video...</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "50px auto",
    padding: 20,
    textAlign: "center",
    fontFamily: "Arial",
    background: "#111",
    color: "#fff",
    borderRadius: 12,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
  },
  input: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: "12px 20px",
    fontSize: 16,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    width: "100%",
  },
};

export default App;
