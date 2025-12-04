# Hướng dẫn tùy chỉnh hệ thống

## Tùy chỉnh thông báo (Alert/Toast)

### 1. Cách làm thông báo tự động tắt sau một khoảng thời gian

Để thông báo tự động biến mất sau một khoảng thời gian (ví dụ 5 giây), bạn cần chỉnh sửa file `script2.js`.

1.  Mở file `script2.js`.
2.  Tìm đến hàm `showNotification`.
3.  Thêm dòng `setTimeout` vào cuối hàm như sau:

    ```javascript
    function showNotification(message) {
      // ... (code tạo toast đã có sẵn)

      // Thêm đoạn code này vào
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 400);
      }, 5000); // 5000 mili giây = 5 giây
    }
    ```

### 2. Cách hiển thị một hoặc nhiều thông báo

Để một điều kiện có thể hiển thị thông báo, bạn cần thêm thuộc tính `"alert"` vào điều kiện đó trong file `flowchart-data.js`.

- **Để hiển thị một thông báo:** Gán cho `"alert"` một chuỗi (string) chứa nội dung.

  ```javascript
  "Tên điều kiện": {
      "pdf": "file.pdf",
      "note": "...",
      "xmtt": XMTT_1,
      "alert": "Đây là một thông báo duy nhất."
  },
  ```

- **Để hiển thị nhiều thông báo (xếp chồng):** Gán cho `"alert"` một mảng (array) chứa các chuỗi. Mỗi chuỗi sẽ là một thông báo riêng biệt.
  `javascript
"Tên điều kiện": {
    "pdf": "file.pdf",
    "note": "...",
    "xmtt": XMTT_1,
    "alert": [
        "Thông báo thứ nhất.",
        "Thông báo thứ hai.",
        "Và một thông báo nữa."
    ]
},
`
  Hệ thống sẽ tự động đọc và hiển thị tương ứng.

## Làm đẹp code: Xuống dòng trong chuỗi HTML (dùng template literals)

Để làm cho các chuỗi HTML trong `note`, `xmtt`, `alert` dễ đọc hơn bằng cách xuống dòng trong code, bạn có thể sử dụng **template literals** (chuỗi ký tự mẫu) bằng cách bao bọc nội dung bằng dấu huyền (\` \`).

**Ví dụ:**

**Trước khi sửa (khó đọc):**

```javascript
"note": "Đây là lưu ý dành riêng cho thanh toán trực tuyến. Ví dụ: Hãy kiểm tra kỹ thông tin người nhận. <span style='color:red;'>Rất quan trọng!</span>"
```

**Sau khi sửa (dùng dấu huyền và xuống dòng - dễ đọc hơn):**

```javascript
"note": `
    Đây là lưu ý dành riêng cho thanh toán trực tuyến.
    Ví dụ: Hãy kiểm tra kỹ thông tin người nhận.
    <span style='color:red;'>Rất quan trọng!</span>
    Bạn có thể thêm nhiều dòng HTML hơn ở đây.
    `,
```

**Lưu ý:** Bất kỳ khoảng trắng (space, tab) nào bạn thêm vào khi xuống dòng bên trong dấu huyền đều sẽ trở thành một phần của chuỗi.

## Xử lý vấn đề cuộn trang (Scroll) khi Iframe quá dài

### Vấn đề

Khi bạn đặt chiều cao (`height`) của `iframe` (khung chứa PDF) lớn hơn 100% (ví dụ: `120%`), nhưng toàn bộ trang web không xuất hiện thanh cuộn dọc để xem phần nội dung bị khuất.

### Nguyên nhân

Trong file `style2.css`, có một quy tắc đang tắt tính năng cuộn của toàn bộ cửa sổ trình duyệt:

```css
html,
body {
  overflow: hidden; /* Dòng này ngăn cản trang web cuộn */
}
```

Thiết kế hiện tại chỉ cho phép vùng nội dung chính (`#main-content`) tự cuộn, nhưng vì các thành phần bên trong nó có chiều cao được tính theo tỷ lệ phần trăm (%), việc `iframe` dài ra không làm cho `#main-content` bị "tràn" ra, do đó thanh cuộn của nó không xuất hiện.

### Cách khắc phục

Để cho phép toàn trang có thể cuộn một cách tự nhiên, bạn cần xóa bỏ thuộc tính `overflow: hidden;` đó.

1.  Mở file `style2.css`.
2.  Tìm đến khối `html, body`.
3.  Xóa dòng `overflow: hidden;`.

**Kết quả sau khi sửa:**

```css
html,
body {
  height: 100%;
  width: 100%;
  /* Dòng "overflow: hidden;" đã được xóa */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}
```

Sau khi xóa, trang web của bạn sẽ có thể cuộn xuống để xem toàn bộ nội dung của `iframe` khi nó dài hơn màn hình.

//xoá scroll của #main-content dòng 167
overflow-y: auto;
