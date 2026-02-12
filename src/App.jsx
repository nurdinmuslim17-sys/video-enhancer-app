import { useState } from "react";

function App() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preset, setPreset] = useState("tiktok");
  const [watermark, setWatermark] = useState(false);

  const getBitrate = () => {
    if (preset === "tiktok") return 16;
    if (preset === "shopee") return 14;
    return 12;
  };

  const handleFileChange = (file) => {
    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const simulateProgress = () => {
    setProgress(0);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 90) clearInterval(interval);
    }, 500);
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Pilih video dulu!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("bitrate", getBitrate());
    formData.append("watermark", watermark);

    try {
      setLoading(true);
      simulateProgress();

      const response = await fetch(
        "https://video-enhancer-backend-production.up.railway.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Processing gagal");

      const blob = await response.blob();
      setProgress(100);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `video-1080p-${preset}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Video Enhancer PRO</h1>
      <p style={styles.subtitle}>
        Upscale 720p → 1080p HD • Optimized Marketplace Quality
      </p>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />

      {preview && (
        <video
          src={preview}
          controls
          style={{ width: "100%", marginTop: 15, borderRadius: 10 }}
        />
      )}

      <div style={styles.options}>
        <select value={preset} onChange={(e) => setPreset(e.target.value)}>
          <option value="tiktok">TikTok 16 Mbps</option>
          <option value="shopee">Shopee 14 Mbps</option>
          <option value="standard">Standard 12 Mbps</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={watermark}
            onChange={() => setWatermark(!watermark)}
          />
          Tambahkan Watermark
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Processing..." : "🚀 Enhance Video"}
      </button>

      {loading && (
        <div style={styles.progressContainer}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 550,
    margin: "40px auto",
    padding: 25,
    background: "#111827",
    color: "#fff",
    borderRadius: 15,
    fontFamily: "Arial",
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 20,
  },
  options: {
    marginTop: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginTop: 20,
    padding: 12,
    fontSize: 16,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  progressContainer: {
    width: "100%",
    background: "#374151",
    borderRadius: 10,
    marginTop: 15,
    height: 10,
  },
  progressBar: {
    height: "100%",
    background: "#7c3aed",
    borderRadius: 10,
    transition: "width 0.4s ease",
  },
};

export default App;  input: {
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
