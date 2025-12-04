/**
 * HƯỚNG DẪN CẬP NHẬT DỮ LIỆU FLOWCHART
 *
 * 1. CẤU TRÚC:
 *    - Dữ liệu được tổ chức dưới dạng một đối tượng (Object) lồng nhau.
 *    - "Value" (giá trị) có thể là một đối tượng con (nhánh) hoặc một đối tượng chứa thông tin điều kiện cuối (lá).
 *    - Điều kiện cuối (lá) phải chứa các thuộc tính: `pdf`, `note`, `xmtt`.
 *
 * 2. KHAI BÁO XMTT:
 *    - Các nội dung XMTT dùng chung được khai báo bằng biến hằng (const) ở đầu file.
 *    - Khi cần sửa nội dung một XMTT, chỉ cần sửa ở dòng khai báo tương ứng.
 */

// --- KHAI BÁO CÁC LOẠI XMTT DÙNG CHUNG ---
const XMTT_1 = "1. Không cần XMTT";
const XMTT_2 = "2. CMND/CCCD";
const XMTT_3 = "3. CCCD/CMND/SHD";
const XMTT_4 = "4. Đúng SĐT + CMND/CCCD + 1A";
const XMTT_5 = "5. Đúng SĐT + CMND + Sai 1A";
const XMTT_6 = "6. Đúng SĐT + CMND + 1A + 1B";
const XMTT_7 = "7. Đúng SĐT update + CMND + 2A + 1B";
const XMTT_8 = "8. Sai SĐT<br>  a. còn dùng SDT cũ: dùng đúng SDT gọi lại<br>  b. Không còn dùng SDT:<br>   - HĐ Closed hết: CMND/CCCD + 1A<br>   - HĐ còn mở: CMND/CCCD + 2A  đồng thời hướng dẫn cập nhật SDT.";
const XMTT_9 = "9. Sai SĐT + CMND + 1A";


const flowchartData = {
    "1. THÔNG TIN CHUNG": {
        "1.1. Thông tin công ty": {
            "pdf": "Thông tin công ty.pdf",
            "note": "Các thông tin cơ bản về công ty.",
            "xmtt": XMTT_1
        },
        "1.2. Hợp tác kinh doanh": {
            "pdf": "Hợp tác kinh doanh.pdf",
            "note": "Thông tin dành cho đối tác muốn hợp tác kinh doanh.",
            "xmtt": XMTT_1
        },
        "1.3. Xóa Dữ Liệu Cá Nhân": {
            "pdf": "Xóa Dữ Liệu Cá Nhân.pdf",
            "note": "Hướng dẫn thực hiện yêu cầu xóa dữ liệu cá nhân theo quy định.",
            "xmtt": XMTT_1
        },
        "1.4. Mở Chặn Cuộc Gọi": {
            "pdf": "Mở Chặn Cuộc Gọi.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "1.5. Ngừng Mời Vay/QC": {
            "pdf": "Ngừng Mời Vay_QC.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "1.6. Khuyến Mãi": {
            "pdf": "Khuyến Mãi.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        }
    },
    "2. THÔNG TIN SẢN PHẨM": {
        "2.1. Vay Mua Xe Máy": {
            "pdf": "Sản Phẩm Vay Mua Xe Máy.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "2.2. Vay Mua Điện Máy": {
            "pdf": "Sản Phẩm Vay Mua Điện Máy.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "2.3. Vay Tiền Mặt": {
            "pdf": "Sản Phẩm Vay Tiền Mặt.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        }
    },
    "3. ĐĂNG KÝ VAY": {
        "3.1. Vay Mua Xe Máy": {
            "pdf": "Vay Sản Phẩm Vay Mua Xe Máy.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "3.2. Vay Mua Điện Máy": {
            "pdf": "Vay Sản Phẩm Vay Mua Điện Máy.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "3.3. Vay Tiền Mặt": {
            "pdf": "Vay Sản Phẩm Vay Tiền Mặt.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        }
    },
    "4. GIẢI NGÂN": {
        "4.1. Giải Ngân Tiền Mặt": {
            "pdf": "Giải Ngân Tiền Mặt.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        }
    },
    "5. KÊNH THANH TOÁN": {
        "5.1. TT TRỰC TUYẾN": {
            "pdf": "THANH TOÁN TRỰC TUYẾN.pdf",
            "note": "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo.",
            "xmtt": XMTT_1,
            "alert": "Thanh toán chuyển khoản qua VPbank được hoàn 5.000vnd vào tháng tiếp theo"
        },
        "5.2. TT TIỀN MẶT": {
            "pdf": "THANH TOÁN TIỀN MẶT.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "5.3. TT QUA ATM/CDM": {
            "pdf": "THANH TOÁN QUA ATM CDM.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        },
        "5.4. TRÍCH NỢ TỰ ĐỘNG": {
            "pdf": "TRÍCH NỢ TỰ ĐỘNG.pdf",
            "note": "N/A",
            "xmtt": XMTT_1
        }
    },
    "6. THANH TOÁN + CIC": {
        "6.1. Lịch Trả Nợ": {
            "6.1.1. HĐ FEC": {
                "6.1.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.1.1.2. Chat": {
                    "6.1.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.1.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.1.1.3. IB": {
                    "6.1.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.1.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.1.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.1.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.1.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.1.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.1.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.1.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        },
        "6.2. Lịch Sử TT": {
            "6.2.1. HĐ FEC": {
                "6.2.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.2.1.2. Chat": {
                    "6.2.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.2.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.2.1.3. IB": {
                    "6.2.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.2.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.2.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.2.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.2.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.2.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.2.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.2.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        },
        "6.3. Thanh Lý HĐ": {
            "6.3.1. HĐ FEC": {
                "6.3.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.3.1.2. Chat": {
                    "6.3.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.3.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.3.1.3. IB": {
                    "6.3.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.3.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.3.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.3.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.3.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.3.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.3.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.3.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        },
        "6.4. Thỏa Thuận KV": {
            "6.4.1. HĐ FEC": {
                "6.4.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.4.1.2. Chat": {
                    "6.4.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.4.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.4.1.3. IB": {
                    "6.4.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.4.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.4.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.4.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.4.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.4.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.4.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.4.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        },
        "6.5. Tình Trạng HĐ": {
            "6.5.1. HĐ FEC": {
                "6.5.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.5.1.2. Chat": {
                    "6.5.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.5.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.5.1.3. IB": {
                    "6.5.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.5.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.5.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.5.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.5.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.5.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.5.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.5.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        },
        "6.6. Đóng HĐ": {
            "6.6.1. HĐ FEC": {
                "6.6.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.6.1.2. Chat": {
                    "6.6.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.6.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.6.1.3. IB": {
                    "6.6.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.6.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.6.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.6.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.6.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.6.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.6.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.6.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        },
        "6.7. CIC": {
            "6.7.1. HĐ FEC": {
                "6.7.1.1. Email": { "pdf": "Email.pdf", "note": "Xem Slide 12+13", "xmtt": XMTT_4 },
                "6.7.1.2. Chat": {
                    "6.7.1.2.1. Post Login": { "pdf": "Chat Post Login.pdf", "note": "Ghi chú cho Post Login", "xmtt": XMTT_4 },
                    "6.7.1.2.2. Trường hợp khác": { "pdf": "Chat Truong hop khac.pdf", "note": "Xem Slide 10+11", "xmtt": XMTT_4 }
                },
                "6.7.1.3. IB": {
                    "6.7.1.3.1. Đúng SĐT": { "pdf": "IB Dung SDT.pdf", "note": "N/A", "xmtt": XMTT_4 },
                    "6.7.1.3.2. Sai SĐT": { "pdf": "IB Sai SDT.pdf", "note": "N/A", "xmtt": XMTT_4 }
                }
            },
            "6.7.2. Cash 24": { "pdf": "HD Cash 24.pdf", "note": "N/A", "xmtt": XMTT_1 },
            "6.7.3. Kim An": { "pdf": "HĐ Kim An.pdf", "note": "Lưu ý cho hợp đồng Kim An.", "xmtt": XMTT_2 },
            "6.7.4. Bán Nợ Một Phần": { "pdf": "HĐ Bán Nợ Một Phần.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.7.5. Bán Nợ Galaxy": { "pdf": "HĐ Bán Nợ Galaxy.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.7.6. Bán Nợ Fc Sold_Azura": { "pdf": "HĐ Bán Nợ Fc Sold_Azura.pdf", "note": "N/A", "xmtt": XMTT_4 },
            "6.7.7. Bán Nợ Welcome Vina": { "pdf": "HĐ Bán Nợ Welcome Vina.pdf", "note": "N/A", "xmtt": XMTT_4 }
        }
    }
};