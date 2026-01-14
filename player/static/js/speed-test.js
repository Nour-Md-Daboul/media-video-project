
// File: speed-test.js
// هذه الدالة تقيس سرعة الإنترنت بالـ Mbps
function testInternetSpeed() {
    const image = new Image();
    const startTime = new Date().getTime(); // وقت البداية
    
    // رابط صورة صغيرة على الإنترنت
    image.src = "https://via.placeholder.com/1000x1000.png?" + startTime;
    
    // عند تحميل الصورة
    image.onload = function() {
        const endTime = new Date().getTime(); // وقت النهاية
        const duration = (endTime - startTime) / 1000; // مدة التحميل بالثواني
        const bitsLoaded = 1000 * 1000 * 8; // حجم الصورة بالبت
        const speedBps = bitsLoaded / duration; // سرعة البت بالثانية
        const speedMbps = (speedBps / 1024 / 1024).toFixed(2); // تحويل إلى Mbps
        console.log("Current Internet Speed:", speedMbps, "Mbps");
        
        // تخزين السرعة في متغير عالمي لاستخدامه لاحقاً
        window.currentSpeed = speedMbps;
    };
}

// استدعاء الدالة مباشرة عند فتح الصفحة
testInternetSpeed();
