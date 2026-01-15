//  Auto Quality Engine

export function chooseQuality(speed, qualities) {
  if (speed < 2 && qualities["144p"])
    return { q: "144p", url: qualities["144p"] };

  if (speed < 6 && qualities["360p"])
    return { q: "360p", url: qualities["360p"] };

  if (qualities["720p"]) return { q: "720p", url: qualities["720p"] };

  const first = Object.keys(qualities)[0];
  return { q: first, url: qualities[first] };
}

export function autoPlay(videoElement, speed, qualities) {
  const selected = chooseQuality(speed, qualities);

  videoElement.src = selected.url;
  videoElement.setAttribute("data-quality", selected.q);
  videoElement.load();
  videoElement.play();

  console.log("Selected Quality:", selected.q);
}
