const video = document.getElementById("video");
const qualitySelect = document.getElementById("qualitySelect");
const autoBtn = document.getElementById("autoBtn");
const statusText = document.getElementById("status");
const badge = document.getElementById("qualityBadge");
const spinner = document.getElementById("spinner");

let videos = [];

fetch("/api/videos/")
  .then((res) => res.json())
  .then((data) => {
    videos = data.qualities;

    qualitySelect.innerHTML = "";

    videos.forEach((v) => {
      const option = document.createElement("option");
      option.value = v.url;
      option.textContent = `${v.quality}p`;
      qualitySelect.appendChild(option);
    });

    // تشغيل افتراضي
    loadVideo(videos[0].url, videos[0].quality);
    qualitySelect.value = videos[0].url;
    statusText.textContent = "Manual mode 144 ";
  });

function loadVideo(url, quality) {
  spinner.classList.remove("hidden");

  const currentTime = video.currentTime || 0;
  const wasPlaying = !video.paused;

  video.src = url;
  badge.textContent = `${quality}p`;
  video.load();

  video.onloadedmetadata = () => {
    video.currentTime = currentTime;
  };

  video.oncanplay = () => {
    spinner.classList.add("hidden");
    if (wasPlaying) video.play();
  };
}

qualitySelect.addEventListener("change", () => {
  const selected = videos.find((v) => v.url === qualitySelect.value);
  statusText.textContent = "Manual mode";
  loadVideo(selected.url, selected.quality);
});

autoBtn.addEventListener("click", () => {
  statusText.textContent = "Testing internet speed...";

  setTimeout(() => {
    const speed = Math.random() * 5;
    let selected;

    if (speed < 1.5) selected = videos[0];
    else if (speed < 4) selected = videos[1];
    else selected = videos[2];

    qualitySelect.value = selected.url;
    statusText.textContent = `Auto mode (${speed.toFixed(1)} Mbps)`;
    loadVideo(selected.url, selected.quality);
  }, 1200);
});
