document.addEventListener('DOMContentLoaded', function () {
    // Lấy tham số id từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
  
    if (!newsId) {
      // Nếu không có id, chuyển hướng về trang News Category
      window.location.href = 'news.html';
      return;
    }
  
    // Lấy dữ liệu news từ localStorage
    const newsData = JSON.parse(localStorage.getItem('currentNews'));
  
    // Kiểm tra xem newsData có tồn tại và id có khớp không
    if (!newsData || String(newsData.id) !== newsId) {
      window.location.href = 'news.html';
      return;
    }
  
    // Cập nhật giao diện với dữ liệu news
    updateNewsDetailUI(newsData);
  });
  
  function updateNewsDetailUI(news) {
    // Cập nhật tiêu đề của news
    const titleElem = document.getElementById('newsTitle');
    if (titleElem) {
      titleElem.textContent = news.title;
    }
  
    // Lấy phần tử video và thiết lập nguồn m3u8 từ news.m3u8
    const video = document.getElementById('video');
    const videoSrc = news.m3u8;
  
    if (!videoSrc) {
      console.error("Không tìm thấy nguồn m3u8 cho news này.");
      return;
    }
  
    // Sử dụng HLS.js để phát video
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    } else {
      console.error('Trình duyệt của bạn không hỗ trợ HLS.');
    }
  }