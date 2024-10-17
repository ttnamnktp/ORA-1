// Hàm để tải nội dung từ các file HTML khác nhau
function loadContent(file) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          // Chèn nội dung tải về vào khu vực nội dung chính
          document.querySelector('.w3-main').innerHTML = this.responseText;
          // Cập nhật side bar
          updateSidebar()
      }
  };
  // Gửi yêu cầu để tải tệp HTML tương ứng
  xhttp.open("GET", file, true);
  xhttp.send();
}

// // Hàm để khởi tạo mặc định khi trang web được mở lần đầu
// window.onload = function() {
//   // Tải nội dung mặc định khi mở trang
//   loadContent('home.html');
// };

// Xử lý các sự kiện click vào thanh menu chính
document.addEventListener('DOMContentLoaded', function() {
  // Lấy tất cả các mục menu có sự kiện click
  const menuItems = document.querySelectorAll('.w3-bar-item');

  menuItems.forEach(item => {
      item.addEventListener('click', function(e) {
          // Hủy hành động mặc định của thẻ <a>
          e.preventDefault();

          // Lấy giá trị file cần tải từ thuộc tính onclick
          const file = this.getAttribute('onclick').match(/'(.*?)'/)[1];

          // Tải nội dung tương ứng
          loadContent(file);
      });
  });
});

// Tải nội dung mặc định khi trang được tải
window.onload = () => {
    loadContent('./main/home.html');
}

function updateSidebar() {
  const contentArea = document.getElementById('contentArea');
  const sideBarLinks = document.getElementById('sideBarLinks');
  
  // Xóa các liên kết hiện tại trong sidebar
  sideBarLinks.innerHTML = '';
  
  // Tìm tất cả tiêu đề h1, h2, h3 trong contentArea
  const headers = contentArea.querySelectorAll('h1, h2, h3');
  
  let currentH1 = null; // Để theo dõi tiêu đề h1 hiện tại
  headers.forEach((header, index) => {
    // Tạo id duy nhất cho mỗi tiêu đề nếu chưa có
    if (!header.id) {
      header.id = `header-${index}`;
    }

    // Nếu là tiêu đề h1, tạo liên kết hiển thị trong sidebar
    if (header.tagName === 'H1') {
      currentH1 = document.createElement('div'); // Tạo container cho h1 và h2, h3
      const h1Link = document.createElement('a');
      h1Link.classList.add('w3-bar-item', 'w3-button', 'w3-hover-brown');
      h1Link.href = `#${header.id}`;
      h1Link.textContent = header.textContent;
      
      // Thêm sự kiện click để ẩn/hiển thị các tiêu đề h2, h3
      h1Link.addEventListener('click', function(e) {
        // e.preventDefault(); // Ngăn điều hướng mặc định
        const subHeaders = this.nextElementSibling;
        if (subHeaders.style.display === 'none') {
          subHeaders.style.display = 'block';
        } else {
          subHeaders.style.display = 'none';
        }
      });

      // Tạo một div ẩn chứa các tiêu đề h2, h3
      const subHeadersContainer = document.createElement('div');
      subHeadersContainer.style.display = 'none'; // Ban đầu ẩn
      currentH1.appendChild(h1Link);
      currentH1.appendChild(subHeadersContainer);
      sideBarLinks.appendChild(currentH1);
    }

    // Nếu là tiêu đề h2 hoặc h3, thêm vào container của h1 hiện tại
    if ((header.tagName === 'H2' || header.tagName === 'H3') && currentH1) {
      const subHeaderLink = document.createElement('a');
      subHeaderLink.classList.add('w3-bar-item', 'w3-button', 'w3-hover-brown');
      subHeaderLink.style.paddingLeft = '30px'; // Lùi vào cho đẹp
      subHeaderLink.href = `#${header.id}`;
      subHeaderLink.textContent = header.textContent;

      // Thêm tiêu đề h2, h3 vào bên trong div của h1
      currentH1.lastElementChild.appendChild(subHeaderLink);
    }
  });
}


// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");
// Get the TopSidebar
var myTopSidebar = document.getElementById("myTopSidebar")
// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");


// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open_top() {
  if (myTopSidebar.style.display === 'block') {
    myTopSidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    myTopSidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close_top() {
  myTopSidebar.style.display = "none";
  overlayBg.style.display = "none";
};

