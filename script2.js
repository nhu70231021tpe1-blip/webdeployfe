// Dữ liệu điều kiện theo flowchart.md - MAP với tên file PDF thực tế
const flowchartData = {
  1: {
    label: "1 THÔNG TIN CHUNG",
    subItems: {
      n1_1: {
        label: "Thông tin công ty",
        pdf: "Thông tin công ty.pdf",
        notes: "Xem chi tiết thông tin công ty FECredit",
      },
      n1_2: {
        label: "Hợp tác kinh doanh",
        pdf: "Hợp tác kinh doanh.pdf",
        notes: "Các điều khoản hợp tác với FECredit",
      },
      n1_3: {
        label: "Xóa Dữ Liệu Cá Nhân",
        pdf: "Xóa Dữ Liệu Cá Nhân.pdf",
        notes: "Quy trình xóa dữ liệu cá nhân theo GDPR",
      },
      n1_4: {
        label: "Mở Chặn Cuộc Gọi",
        pdf: "Mở Chặn Cuộc Gọi.pdf",
        notes: "Cách quản lý cuộc gọi từ FECredit",
      },
      n1_5: {
        label: "Ngừng Mời Vay/ Quảng Cáo",
        pdf: "Khuyến Mãi.pdf",
        notes: "Cách dừng nhận thông báo quảng cáo",
      },
      n1_6: {
        label: "Khuyến Mãi",
        pdf: "Khuyến Mãi.pdf",
        notes: "Các chương trình khuyến mãi hiện tại",
      },
    },
  },
  2: {
    label: "2 THÔNG TIN SẢN PHẨM",
    subItems: {
      n2_1: {
        label: "Sản Phẩm Vay Mua Xe Máy",
        pdf: "Sản Phẩm Vay Mua Xe Máy.pdf",
        notes: "Lãi suất từ 0.99%/tháng, chu kỳ vay 6-60 tháng",
      },
      n2_2: {
        label: "Sản Phẩm Vay Mua Điện Máy",
        pdf: "Sản Phẩm Vay Mua Điện Máy.pdf",
        notes: "Vay đến 50 triệu, không cần chứng minh thu nhập",
      },
      n2_3: {
        label: "Sản Phẩm Vay Tiền Mặt",
        pdf: "Vay Sản Phẩm Vay Tiền Mặt.pdf",
        notes: "Giải ngân ngay trong 24 giờ, lãi suất ưu đãi",
      },
    },
  },
  3: {
    label: "3 ĐĂNG KÝ VAY",
    subItems: {
      n3_1: {
        label: "Sản Phẩm Vay Mua Xe Máy",
        pdf: "Sản Phẩm Vay Mua Xe Máy.pdf",
        notes: "Chuẩn bị: CMND, Hóa đơn điện nước, Giấy đăng ký xe",
      },
      n3_2: {
        label: "Sản Phẩm Vay Mua Điện Máy",
        pdf: "Vay Sản Phẩm Vay Mua Điện Máy.pdf",
        notes: "Thủ tục đăng ký nhanh, duyệt trong 30 phút",
      },
      n3_3: {
        label: "Sản Phẩm Vay Tiền Mặt",
        pdf: "Vay Sản Phẩm Vay Tiền Mặt.pdf",
        notes: "Không cần tài sản đảm bảo, duyệt nhanh",
      },
    },
  },
  4: {
    label: "4 GIẢI NGÂN",
    subItems: {
      n4_1: {
        label: "Giải Ngân Tiền Mặt",
        pdf: "Giải Ngân Tiền Mặt.pdf",
        notes: "Nhận tiền trực tiếp tại cửa hàng hoặc chuyển khoản",
      },
    },
  },
  5: {
    label: "5 KÊNH THANH TOÁN",
    subItems: {
      n5_1: {
        label: "THANH TOÁN TRỰC TUYẾN",
        pdf: "THANH TOÁN TRỰC TUYẾN.pdf",
        xmtt: "Không cần XMTT",
        notification:
          "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo",
        notes: "Hoàn 5.000đ khi thanh toán qua VPbank",
      },
      n5_2: {
        label: "THANH TOÁN TIỀN MẶT",
        pdf: "THANH TOÁN TIỀN MẶT.pdf",
        xmtt: "Không cần XMTT",
        notes: "Đến chi nhánh gần nhất để thanh toán trực tiếp",
      },
      n5_3: {
        label: "THANH TOÁN QUA ATM/CDM",
        pdf: "THANH TOÁN QUA ATM CDM.pdf",
        xmtt: "Không cần XMTT",
        notes: "Hỗ trợ rút tiền từ các ngân hàng đối tác",
      },
      n5_4: {
        label: "TRÍCH NỢ TỰ ĐỘNG",
        pdf: "TRÍCH NỢ TỰ ĐỘNG.pdf",
        xmtt: "Không cần XMTT",
        notes: "Đăng ký trích nợ tự động từ tài khoản tiết kiệm",
      },
    },
  },
};

// DOM Elements
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const body = document.body;
const filterLevel1 = document.getElementById("filter-level1");
const filterLevel2 = document.getElementById("filter-level2");
const level2Group = document.getElementById("level2-group");
const xmttResult = document.getElementById("xmtt-result");
const notesResult = document.getElementById("notes-result");
const pdfViewer = document.getElementById("pdf-viewer");
const tabButtons = document.querySelectorAll(".tab-btn");
const notificationToast = document.getElementById("notification-toast");
const toastMessage = document.getElementById("toast-message");
const toastClose = document.getElementById("toast-close");
const mainHeader = document.getElementById("main-header");
const mainContent = document.getElementById("main-content");
const logoBtnElement = document.getElementById("logo-btn");

let lastScrollY = 0;
let isHeaderHidden = false;
let toastTimeout = null;

// Sidebar Toggle
sidebarToggle.addEventListener("click", () => {
  body.classList.toggle("sidebar-collapsed");
  if (body.classList.contains("sidebar-collapsed")) {
    body.classList.add("sidebar-open");
  } else {
    body.classList.remove("sidebar-open");
  }
});

// Logo Click Handler - Reload to home page
if (logoBtnElement) {
  logoBtnElement.addEventListener("click", () => {
    location.href = "/";
  });
}

// Close sidebar when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    !sidebar.contains(e.target) &&
    !sidebarToggle.contains(e.target) &&
    body.classList.contains("sidebar-open")
  ) {
    body.classList.remove("sidebar-open");
  }
});

// Filter Level 1 Change
filterLevel1.addEventListener("change", (e) => {
  const selected = e.target.value;

  if (selected) {
    const subItems = flowchartData[selected].subItems;
    filterLevel2.innerHTML = '<option value="">-- Chọn --</option>';

    Object.entries(subItems).forEach(([key, item]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = item.label;
      filterLevel2.appendChild(option);
    });

    level2Group.style.display = "block";
    filterLevel2.value = "";
  } else {
    level2Group.style.display = "none";
    filterLevel2.value = "";
  }

  updateContent();
});

// Filter Level 2 Change - CHÍNH - HIỂN THỊ PDF VÀ THÔNG BÁO
filterLevel2.addEventListener("change", (e) => {
  const selected = e.target.value;
  const level1Value = filterLevel1.value;

  if (selected && level1Value) {
    const subItem = flowchartData[level1Value].subItems[selected];

    // Update XMTT Result
    if (subItem.xmtt) {
      xmttResult.innerHTML = `<p><strong>${subItem.xmtt}</strong></p>`;
    } else {
      xmttResult.innerHTML = `<p><strong>Không cần XMTT</strong></p>`;
    }

    // Load PDF - MAP VỚI TÊN FILE THỰC TẾ
    const pdfPath = `./pdfile/${subItem.pdf}`;
    pdfViewer.src = pdfPath;

    // Update notes from data
    if (subItem.notes) {
      notesResult.innerHTML = `<p>${subItem.notes}</p>`;
    } else {
      notesResult.innerHTML = `<p>Không có lưu ý</p>`;
    }

    // SHOW NOTIFICATION NẾU CÓ (dành cho "Thanh toán trực tuyến")
    if (subItem.notification) {
      showNotification(subItem.notification);
    }
  } else {
    updateContent();
  }
});

// Update Content Function
function updateContent() {
  const level1 = filterLevel1.value;
  const level2 = filterLevel2.value;

  if (!level1) {
    xmttResult.innerHTML = "<p>Chọn điều kiện để xem kết quả</p>";
    notesResult.innerHTML = "<p>Thông báo và lưu ý sẽ hiển thị ở đây</p>";
    pdfViewer.src = "";
  }
}

// Show Notification Toast - ĐẸP VÀ CHUYÊN NGHIỆP
function showNotification(message) {
  toastMessage.textContent = message;
  notificationToast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Tự động ẩn sau 5 giây
  toastTimeout = setTimeout(() => {
    notificationToast.classList.remove("show");
  }, 5000);
}

// Close toast button
toastClose.addEventListener("click", () => {
  notificationToast.classList.remove("show");
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
});

// Tab Buttons Click Handler
tabButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    // Có thể thêm logic để load nội dung khác dựa trên tab
  });
});

// Header Hide/Show on Scroll - KHI SCROLL XUỐNG HEADER ẨN, SCROLL LÊN HIỆN LẠI
mainContent.addEventListener("scroll", () => {
  const currentScrollY = mainContent.scrollTop;
  const scrollDelta = currentScrollY - lastScrollY;

  // Chỉ ẩn header khi scroll xuống đủ nhanh hoặc đủ xa
  if (scrollDelta > 5 && currentScrollY > 60) {
    // Scrolling down significantly
    if (!isHeaderHidden) {
      mainHeader.classList.add("hidden");
      isHeaderHidden = true;
    }
  } else if (scrollDelta < -5 || currentScrollY < 60) {
    // Scrolling up or back to top
    if (isHeaderHidden) {
      mainHeader.classList.remove("hidden");
      isHeaderHidden = false;
    }
  }

  lastScrollY = currentScrollY;
});

// Initialize
updateContent();

// Responsive handler
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    body.classList.remove("sidebar-open");
  }
});
