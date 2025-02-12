document.addEventListener('DOMContentLoaded', function () {
    const newsLinks = document.querySelectorAll('.news-card a'); // Chọn tất cả các thẻ <a> trong .news-card
    newsLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
  
        // Lấy ID từ thuộc tính href
        const href = this.getAttribute('href');
        const urlParams = new URLSearchParams(href.split('?')[1]);
        const newsId = urlParams.get('id');
  
        // Lấy tiêu đề từ thẻ <h3> trong card
        const newsTitle = this.querySelector('h3').textContent;
  
        // Tạo đối tượng newsData
        const newsData = {
          id: newsId,
          title: newsTitle,
          m3u8: getM3u8ForNews(newsId) // Lấy link m3u8 từ hàm getM3u8ForNews
        };
  
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('currentNews', JSON.stringify(newsData));
  
        // Chuyển hướng đến trang chi tiết
        window.location.href = `news-detail.html?id=${newsData.id}`;
      });
    });
  });
  
  // Hàm lấy link m3u8 dựa trên newsId
  function getM3u8ForNews(newsId) {
    const m3u8Mapping = {
      "3324": "https://fox-foxnewsnow-samsungus.amagi.tv/playlist720p.m3u8",
      "2991": "https://dai.google.com/linear/hls/pb/event/Sid4xiTQTkCT1SLu6rjUSQ/stream/7e7bb1e6-cc36-4b29-9ba1-cc9647cc87e9:SIN/master.m3u8",
      "2749": "https://dai.google.com/linear/hls/pb/event/Sid4xiTQTkCT1SLu6rjUSQ/stream/079b41a7-9c30-4b35-9b4c-a2e78a3689f1:SIN/master.m3u8",
      "2566": "https://content.uplynk.com/channel/ext/96195dc445894d079a91958abba8d3af/kfsn_24x7_news.m3u8",
      "2563": "https://liveprodusphoenixeast.global.ssl.fastly.net/USPhx-HD/Channel-TX-USPhx-AWS-virginia-1/Source-USPhx-16k-1-s6lk2-BP-07-03-0Yn1cQZHOtP_live.m3u8",
      "2395": "https://content.uplynk.com/channel/ext/96195dc445894d079a91958abba8d3af/kfsn_24x7_news.m3u8",
      "2156": "https://dai.google.com/linear/hls/pb/event/Sid4xiTQTkCT1SLu6rjUSQ/stream/4aad5f2a-aec8-4ea1-b31b-5f89fa3bd07c:TPE/master.m3u8"


      // Thêm các mapping khác tại đây
    };
    return m3u8Mapping[newsId] || "";
  }