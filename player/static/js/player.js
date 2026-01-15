// player.js (Frontend Controller)

const video = document.getElementById("video");
const qualitySelect = document.getElementById("qualitySelect");
const autoBtn = document.getElementById("autoBtn");
const statusText = document.getElementById("status");
const speedText = document.getElementById("speed");
const badge = document.getElementById("qualityBadge");

// قائمة الجودات (من الباك لاحقًا – هلق ثابتة)
const videos = [
  { quality: 144, url: "/media/video/video_144.mp4" },
  { quality: 360, url: "/media/video/video_360.mp4" },
  { quality: 720, url: "/media/video/video_720.mp4" },
];

// حالات النظام
let autoMode = false;
let currentQuality = 144;
let lastSwitchTime = 0;

// تعبئة Dropdown
videos.forEach((v) => {
  const option = document.createElement("option");
  option.value = v.url;
  option.textContent = `${v.quality}p`;
  qualitySelect.appendChild(option);
});

// تشغيل افتراضي على 144p
loadVideo(videos[0].url, videos[0].quality);
qualitySelect.value = videos[0].url;

// ----------------------
// تحميل الفيديو بدون إعادة من البداية
function loadVideo(url, quality) {
  const currentTime = video.currentTime || 0;
  const wasPlaying = !video.paused;

  video.src = url;
  badge.textContent = `${quality}p`;
  currentQuality = quality;

  video.onloadedmetadata = () => {
    video.currentTime = currentTime;
    if (wasPlaying) video.play();
  };
}

// ----------------------
// اختيار الجودة حسب السرعة
function chooseQuality(speed) {
  if (speed < 2) return 144;
  if (speed < 5) return 360;
  return 720;
}

// ----------------------
// Manual Mode
qualitySelect.addEventListener("change", () => {
  autoMode = false;

  const selected = videos.find((v) => v.url === qualitySelect.value);
  statusText.textContent = "Manual mode";
  speedText.textContent = "Speed: -- Mbps";

  loadVideo(selected.url, selected.quality);
});

// ----------------------
// Auto Mode Button
autoBtn.addEventListener("click", () => {
  autoMode = true;
  statusText.textContent = "Auto mode enabled";
});

// ----------------------
// الاستماع لقياس السرعة (من speed-test.js)
window.addEventListener("speedUpdated", (e) => {
  if (!autoMode) return;

  const speed = e.detail.speed;
  speedText.textContent = ` Speed: ${speed.toFixed(2)} Mbps`;

  const selectedQuality = chooseQuality(speed);
  const now = Date.now();

  // منع التبديل المتكرر (مثل يوتيوب)
  if (selectedQuality !== currentQuality && now - lastSwitchTime > 4000) {
    const videoData = videos.find((v) => v.quality === selectedQuality);

    loadVideo(videoData.url, videoData.quality);
    qualitySelect.value = videoData.url;
    lastSwitchTime = now;
  }

  statusText.textContent = "Auto mode";
});
