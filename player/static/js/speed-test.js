// File: speed-test.js

function measureSpeed(callback) {
  const img = new Image();

  const start = performance.now();

  // صورة 1920x1080 (Full HD) حجمها كبير وممتازة للاختبار
  img.src =
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1920&h=1080&auto=format&fit=crop&" +
    start;

  img.onload = function () {
    const end = performance.now();
    const duration = (end - start) / 1000; // ثواني

    // الحجم التقريبي لصورة FHD
    const bits = 1920 * 1080 * 24; // (px * px * bits per pixel)

    const speedBps = bits / duration;
    const speedMbps = (speedBps / 1024 / 1024).toFixed(2);

    callback(parseFloat(speedMbps));
  };

  img.onerror = function () {
    console.warn("Speed Test Error: Image failed to load");
    callback(0);
  };
}

// قياس كل ثانية
setInterval(() => {
  measureSpeed((speed) => {
    window.currentSpeed = speed;

    window.dispatchEvent(
      new CustomEvent("speedUpdated", {
        detail: { speed },
      })
    );

    console.log("%c[Speed]", "color: hotpink", speed, "Mbps");
  });
}, 1000);
