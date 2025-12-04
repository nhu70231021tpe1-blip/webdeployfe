document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.getElementById("main-menu");
  const subMenu = document.getElementById("sub-menu");
  const xmttResult = document.getElementById("xmtt-result");
  const outputIframe = document.getElementById("output-iframe");
  const luuY = document.querySelector(".luu-y");
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const header = document.querySelector("header");

  const menuData = {
    "1 THÔNG TIN CHUNG": [
      "Thông tin công ty",
      "Hợp tác kinh doanh",
      "Xóa Dữ Liệu Cá Nhân",
      "Mở Chặn Cuộc Gọi",
      "Ngừng Mời Vay/ Quảng Cáo",
      "Khuyến Mãi",
    ],
    "2 THÔNG TIN SẢN PHẨM": [
      "Sản Phẩm Vay Mua Xe Máy",
      "Sản Phẩm Vay Mua Điện Máy",
      "Sản Phẩm Vay Tiền Mặt",
    ],
    "3 ĐĂNG KÝ VAY": [
      "Sản Phẩm Vay Mua Xe Máy",
      "Sản Phẩm Vay Mua Điện Máy",
      "Sản Phẩm Vay Tiền Mặt",
    ],
    "4 GIẢI NGÂN": ["Giải Ngân Tiền Mặt"],
    "5 KÊNH THANH TOÁN": [
      "THANH TOÁN TRỰC TUYẾN",
      "THANH TOÁN TIỀN MẶT",
      "THANH TOÁN QUA ATM/CDM",
      "TRÍCH NỢ TỰ ĐỘNG",
    ],
  };

  function populateMainMenu() {
    mainMenu.innerHTML = '<option value="">VẤN ĐỀ CỦA KH</option>';
    for (const key in menuData) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      mainMenu.appendChild(option);
    }
  }

  populateMainMenu();

  mainMenu.addEventListener("change", function () {
    const selectedValue = this.value;
    subMenu.innerHTML = '<option value="">Chọn mục con</option>';
    if (selectedValue && menuData[selectedValue]) {
      menuData[selectedValue].forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        subMenu.appendChild(option);
      });
    }
  });

  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 3000);
  }

  subMenu.addEventListener("change", function () {
    const selectedValue = this.value;
    const mainMenuValue = mainMenu.value;
    if (selectedValue) {
      xmttResult.textContent = "không cần XMTT";
      luuY.innerHTML =
        "<h2>Lưu ý</h2><p>Đây là lưu ý cho mục " + selectedValue + "</p>";
      // Assuming the pdfile directory contains pdfs with the same name as the sub-menu items
      outputIframe.src = "pdfile/" + selectedValue + ".pdf";

      if (mainMenuValue === "5 KÊNH THANH TOÁN" && selectedValue === "THANH TOÁN TRỰC TUYẾN") {
        showToast("Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo");
      }
    } else {
      xmttResult.textContent = "";
      luuY.innerHTML = "<h2>Lưu ý</h2>";
      outputIframe.src = "";
    }
  });

  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
  });

  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});