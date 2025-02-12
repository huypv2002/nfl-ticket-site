document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các thẻ link chứa thông tin show
    const cardLinks = document.querySelectorAll('.card__link');
  
    cardLinks.forEach((link, index) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        // Lấy URL của ảnh làm thumbnail
        const imgElem = this.querySelector('img');
        const thumbnail = imgElem ? imgElem.src : '';
  
        // Lấy tiêu đề show từ thẻ có class "card__name"
        const titleElem = this.querySelector('.card__name');
        const title = titleElem ? titleElem.textContent.trim() : '';
  
        // 1. Kiểm tra xem thẻ cha (article) có thuộc tính data-show-id không
        let id = this.closest('.card__article').getAttribute('data-show-id');
  
        // 2. Nếu không có, thử trích xuất số từ tiêu đề
        if (!id) {
          const idMatch = title.match(/\d+/);
          if (idMatch) {
            id = idMatch[0];
          } else {
            // 3. Nếu vẫn không có, tạo một ID mới dựa trên index và thời gian hiện tại
            id = `show-${index}-${new Date().getTime()}`;
          }
        }
  
        // Khai báo các thông tin cần thiết cho show
        const showData = {
          id: id,
          title: title,
          thumbnail: thumbnail,
          views: 102725, // VD: số lượt xem (có thể thay đổi theo dữ liệu thực tế)
          broadcaster: 'RealIPTV', // VD: tên nhà phát sóng
          embedCode: '<iframe src="https://www.streamlive.to/embedplayer.php?channel=77496&embedder=557310&autostart=true" frameborder="0" scrolling="no" allowfullscreen width="640" height="360"></iframe>',
          vlcLink: 'https://cdn.streamlive.to/vlc/0lqmmfum8nm8e1p/playlist.m3u8'
        };
  
        // Lưu dữ liệu show vào localStorage dưới key "currentShow"
        localStorage.setItem('currentShow', JSON.stringify(showData));
  
        // Chuyển hướng đến trang detail, đính kèm tham số id trên URL
        window.location.href = `ticket-detail.html?id=${id}`;
      });
    });
  });
  