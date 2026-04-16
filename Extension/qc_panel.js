// QC Panel Logic - qc_panel.js v2.8.0
// MV3 CSP-compatible (no inline handlers)

// ── SVG Icons ──
const QC_ICONS = {
  list: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  headphones: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  download: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  import: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="18"/><line x1="15" y1="15" x2="12" y2="18"/></svg>`,
  folder: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  refresh: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  save: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/></svg>`,
  search: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  alert: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  note: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  play: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  undo: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>`,
  user: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  building: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18"/><path d="M9 3v18"/><path d="M6 7h1"/><path d="M6 11h1"/><path d="M12 7h1"/><path d="M17 7h1"/></svg>`,
  clock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  bar_chart: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
};

// ── Scoring Criteria (HEART model) ──
// type: 'yn'   → Y(pts) / N(0)
// type: 'ynp'  → Y(pts) / P1(pts*0.5) / N(0)
// type: 'ynpp' → Y / P1(partial1) / P2(partial2) / N(0)
const QC_CRITERIA = [
  {
    group: '1. HEART TOUCHING – Mở lòng đón, Chạm trái tim', items: [
      { id: 'h1_1', name: '1.1 Chào mở đầu', pts: 5, type: 'yn' },
    ]
  },
  {
    group: '2. EMPATHY – Nghe từ tâm, Hiểu thấu cảm', items: [
      { id: 'h2_1', name: '2.1 Lắng nghe', pts: 10, type: 'ynp' },
      { id: 'h2_2', name: '2.2 Ngôn Từ', pts: 10, type: 'ynp' },
      { id: 'h2_3', name: '2.3 Ngữ Điệu & Giọng nói', pts: 10, type: 'ynp' },
      { id: 'h2_4', name: '2.4 Gọi tên khách hàng', pts: 2, type: 'yn' },
    ]
  },
  {
    group: '3. ATTENTIVE ACTIONS – Vững đồng hành, Giúp tận tâm', items: [
      { id: 'h3_1', name: '3.1 Quản lý cuộc gọi', pts: 10, type: 'ynp' },
      { id: 'h3_2', name: '3.2 Nhập Liệu', pts: 7, type: 'yn' },
    ]
  },
  {
    group: '4. RELIABLE RESOLUTION – Trao giải pháp, Nhận niềm tin', items: [
      { id: 'h4_1', name: '4.1 Xác minh thông tin', pts: 5, type: 'yn' },
      { id: 'h4_2', name: '4.2 Giải Pháp', pts: 30, type: 'ynpp', partial1: 20, partial2: 15 },
    ]
  },
  {
    group: '5. THANKFUL CLOSING – Khép vấn đề, Mở kết nối', items: [
      { id: 'h5_1', name: '5.1 Tư vấn KS / KM / cảnh báo…', pts: 3, type: 'yn' },
      { id: 'h5_2', name: '5.2 Chào kết thúc', pts: 5, type: 'yn' },
    ]
  },
];

const WOW_FACTORS = [
  'Được KH khen ngợi (KH chủ động khen trong cuộc gọi)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Kỹ năng thuyết phục (thuyết phục KH giữ thẻ thành công)',
  'Hỗ trợ nhiệt tình, tận tâm (cảm nhận thiện cảm & sự hài lòng của KH)',
];

const AUTOFAIL_FACTORS = [
  '1.1 Ngôn từ không phù hợp (ra lệnh, bắt bẻ, áp đặt, hỏi ngược KH, đổ lỗi...)',
  '1.2 Khuyến khích/thách thức KH gây bất lợi thương hiệu FE CREDIT',
  '1.3 Thái độ thờ ơ, vô cảm với vấn đề KH',
  '1.4 Kết thúc hỗ trợ khi KH vẫn còn thắc mắc/khiếu nại/bức xúc',
  '1.5 Im lặng từ 8s để KH tự gác máy',
  '1.6 Không chuyển TL hỗ trợ khi KH mất bình tĩnh / dùng ngôn từ thiếu văn hóa',
  '2.1 Xác minh sai quy định (trường hợp rủi ro cao)',
  '2.2 Xác minh sai dẫn đến không hỗ trợ KH',
  '2.3 Cung cấp thông tin chi tiết khoản vay/thẻ khi chưa xác định chính chủ',
  '2.4 Cung cấp thông tin cá nhân KH cho đơn vị khác khi không được phép',
  '2.5 Cung cấp/liệt kê câu hỏi xác minh hoặc câu trả lời cho KH',
  '3.1 Không hỗ trợ yêu cầu KH dù vấn đề có thể hỗ trợ',
  '3.2 Cung cấp sai khoản tiền/phí (Loan ≥30k; Card không giới hạn)',
  '3.3 Hứa hẹn hỗ trợ khi quy trình không được phép mà không đính chính',
  '4.1 Tạo ticket nhưng không chuyển đi để xử lý',
  '4.2 Tạo ticket chuyển đi nhưng nhập sai code/subcode/property/remark',
  '4.3 Tạo ticket chuyển PBLQ khi không thỏa điều kiện',
  '4.4 Không tạo ticket khi thông tin cần chuyển đi xử lý',
  '4.5 Không thực hiện chuyển line đúng quy định',
  '4.6 Chờ máy 90s+ không tương tác lại → rớt call',
  '4.7 Yêu cầu KH giữ máy quá 4 phút mà không tương tác',
  '5. Gian lận (tín hiệu kém, lỗi hệ thống…)',
];

// ── State ──
var qcState = {
  qcName: '',
  spinFileHandle: null,   // FileSystemFileHandle của SPIN gốc (đọc + ghi)
  spinRawHeaders: [],     // Toàn bộ headers file gốc
  spinAllRows: [],        // Toàn bộ rows (kể cả non-QC) để ghi ngược lại
  dirHandle: null,        // DATA TỔNG (export lock metadata)
  exportDirHandle: null,  // Export folder
  locks: {},
  spinData: [],           // Filtered rows (Chấm=QC) hiển thị UI
  scores: {},
  currentRecord: null,
};

// ── Storage helpers ──
function qcGet(k) { return new Promise(function (r) { chrome.storage.local.get(k, r); }); }
function qcSet(o) { return new Promise(function (r) { chrome.storage.local.set(o, r); }); }

// ── IndexedDB: persist FileSystemDirectoryHandle across sessions ──
function _idbOpen() {
  return new Promise(function (resolve, reject) {
    var req = indexedDB.open('qcPanel_v1', 1);
    req.onupgradeneeded = function (e) { e.target.result.createObjectStore('handles'); };
    req.onsuccess = function (e) { resolve(e.target.result); };
    req.onerror = function () { reject(req.error); };
  });
}
function idbSaveHandle(key, handle) {
  return _idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').put(handle, key);
      tx.oncomplete = resolve;
      tx.onerror = function () { reject(tx.error); };
    });
  }).catch(function () { }); // silent fail
}
function idbGetHandle(key) {
  return _idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction('handles', 'readonly');
      var req = tx.objectStore('handles').get(key);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  }).catch(function () { return null; });
}

// ── Status ──
function qcStatus(msg, type) {
  var el = document.getElementById('qcStatus');
  if (!el) return;
  el.textContent = msg;
  el.className = 'qc-status' + (type ? ' ' + type : '');
}

// ── Inner tab switching ──
function initQcTabs() {
  ['qcTabImport', 'qcTabScore', 'qcTabExport'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', function () { switchQcTab(id); });
  });
}
function switchQcTab(tabId) {
  var map = { qcTabImport: 'qcImportSection', qcTabScore: 'qcScoreSection', qcTabExport: 'qcExportSection' };
  ['qcTabImport', 'qcTabScore', 'qcTabExport'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.classList.toggle('active', id === tabId);
  });
  Object.keys(map).forEach(function (k) {
    var s = document.getElementById(map[k]);
    if (s) s.classList.toggle('active', k === tabId);
  });
  if (tabId === 'qcTabExport') renderExportSummary();
}

// ── Parse SPIN xlsx ──
function parseSpinFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var data = new Uint8Array(e.target.result);
        var wb = XLSX.read(data, { type: 'array', cellDates: false, cellNF: false, sheetStubs: false, dense: true });
        var ws = wb.Sheets[wb.SheetNames[0]];
        var rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (rows.length < 2) return reject(new Error('File không có dữ liệu'));
        var headers = rows[0].map(function (h) { return String(h).trim(); });
        var allRows = rows.slice(1).map(function (row) {
          var obj = {};
          headers.forEach(function (h, i) { obj[h] = (row[i] !== undefined) ? row[i] : ''; });
          return obj;
        });
        var filteredRows = allRows.filter(function (r) {
          if (!r['RECORDED_ID'] || !String(r['RECORDED_ID']).trim()) return false;
          return String(r['Chấm'] || '').trim().toLowerCase() === 'qc';
        });
        resolve({ headers: headers, allRows: allRows, rows: filteredRows });
      } catch (err) { reject(err); }
    };
    reader.onerror = function () { reject(new Error('Không đọc được file')); };
    reader.readAsArrayBuffer(file);
  });
}

// ── Derive locks từ cột "QC SP" trong spinData ──
function _deriveLocksFromData() {
  qcState.locks = {};
  qcState.spinData.forEach(function (r) {
    if (r['QC SP'] && String(r['QC SP']).trim()) {
      var recId = String(r['RECORDED_ID']).trim();
      qcState.locks[recId] = { qc: String(r['QC SP']).trim(), locked_at: r['Date SP1'] || '' };
    }
  });
}

// ── Áp kết quả parse vào state ──
function _applyParsedResult(result, fileName) {
  qcState.spinRawHeaders = result.headers;
  qcState.spinAllRows    = result.allRows;
  qcState.spinData       = result.rows;
  _deriveLocksFromData();
  _updateFolderStatus('qcSpinFileStatus', fileName);
  renderImportTable();
  qcStatus('Đã load ' + result.rows.length + ' records (QC) / ' + result.allRows.length + ' tổng', 'ok');
}

// ── Chọn file SPIN bằng showOpenFilePicker (có thể ghi lại) ──
function pickSpinFile() {
  return window.showOpenFilePicker({
    types: [{ description: 'Excel', accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] } }],
    multiple: false
  }).then(function (handles) {
    var handle = handles[0];
    qcState.spinFileHandle = handle;
    idbSaveHandle('spinFile', handle);
    qcStatus('Đang đọc file...', '');
    return handle.getFile();
  }).then(function (file) {
    return parseSpinFile(file).then(function (result) { _applyParsedResult(result, file.name); });
  }).catch(function (e) {
    if (e.name !== 'AbortError') qcStatus('Lỗi mở file: ' + e.message, 'err');
  });
}

// ── Reload từ spinFileHandle đã lưu (nút Refresh) ──
function reloadSpinFile() {
  if (!qcState.spinFileHandle) { qcStatus('Chưa chọn file SPIN', 'err'); return Promise.resolve(); }
  qcStatus('Đang đọc lại file...', '');
  return qcState.spinFileHandle.getFile()
    .then(function (file) {
      return parseSpinFile(file).then(function (result) { _applyParsedResult(result, file.name); });
    })
    .catch(function (e) { qcStatus('Lỗi đọc lại file: ' + e.message, 'err'); });
}

// ── Ghi ngược lại file SPIN gốc ──
function writeBackToSpinFile() {
  if (!qcState.spinFileHandle) { qcStatus('Chưa liên kết file SPIN', 'err'); return Promise.resolve(false); }
  try {
    var headers = qcState.spinRawHeaders;
    var wsData  = [headers];
    qcState.spinAllRows.forEach(function (r) {
      wsData.push(headers.map(function (h) { return r[h] !== undefined ? r[h] : ''; }));
    });
    var ws  = XLSX.utils.aoa_to_sheet(wsData);
    var wb  = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    var blob  = new Blob([wbout], { type: 'application/octet-stream' });
    return qcState.spinFileHandle.createWritable()
      .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
      .then(function () { return true; })
      .catch(function (e) { qcStatus('Lỗi ghi file SPIN: ' + e.message, 'err'); return false; });
  } catch (e) { qcStatus('Lỗi: ' + e.message, 'err'); return Promise.resolve(false); }
}

// ── Folder picker: DATA TỔNG (shared) ──
function pickSharedFolder() {
  return window.showDirectoryPicker({ mode: 'readwrite' }).then(function (dirHandle) {
    qcState.dirHandle = dirHandle;
    _updateFolderStatus('qcFolderStatus', dirHandle.name);
    idbSaveHandle('dataFolder', dirHandle);
    return loadLocks().then(function () {
      qcStatus('Đã chọn DATA TỔNG: ' + dirHandle.name, 'ok');
    });
  }).catch(function (e) {
    if (e.name !== 'AbortError') qcStatus('Lỗi chọn thư mục: ' + e.message, 'err');
  });
}

// ── Folder picker: Export folder ──
function pickExportFolder() {
  return window.showDirectoryPicker({ mode: 'readwrite' }).then(function (dirHandle) {
    qcState.exportDirHandle = dirHandle;
    _updateFolderStatus('qcExportFolderStatus', dirHandle.name);
    idbSaveHandle('exportFolder', dirHandle);
    qcStatus('Đã chọn thư mục xuất: ' + dirHandle.name, 'ok');
  }).catch(function (e) {
    if (e.name !== 'AbortError') qcStatus('Lỗi chọn thư mục xuất: ' + e.message, 'err');
  });
}

function _updateFolderStatus(elId, name) {
  var el = document.getElementById(elId);
  if (el) { el.textContent = name; el.title = name; }
}

// ── Try restore saved handles ──
function restoreSavedHandles() {
  return Promise.all([
    idbGetHandle('spinFile'),
    idbGetHandle('dataFolder'),
    idbGetHandle('exportFolder'),
  ]).then(function (handles) {
    var spinH = handles[0], dataH = handles[1], expH = handles[2];
    var tasks = [];

    // Restore spinFile → tự load lại nếu còn quyền
    if (spinH) {
      tasks.push(
        spinH.queryPermission({ mode: 'readwrite' }).then(function (perm) {
          if (perm === 'granted') {
            qcState.spinFileHandle = spinH;
            return spinH.getFile().then(function (file) {
              return parseSpinFile(file).then(function (result) {
                _applyParsedResult(result, file.name);
              });
            });
          } else {
            _updateFolderStatus('qcSpinFileStatus', '⚠ ' + spinH.name + ' (cần chọn lại)');
          }
        }).catch(function () { })
      );
    }

    if (dataH) {
      tasks.push(
        dataH.queryPermission({ mode: 'readwrite' }).then(function (perm) {
          if (perm === 'granted') {
            qcState.dirHandle = dataH;
            _updateFolderStatus('qcFolderStatus', dataH.name);
          } else {
            _updateFolderStatus('qcFolderStatus', '⚠ ' + dataH.name);
          }
        }).catch(function () { })
      );
    }
    if (expH) {
      tasks.push(
        expH.queryPermission({ mode: 'readwrite' }).then(function (perm) {
          if (perm === 'granted') {
            qcState.exportDirHandle = expH;
            _updateFolderStatus('qcExportFolderStatus', expH.name);
          } else {
            _updateFolderStatus('qcExportFolderStatus', '⚠ ' + expH.name);
          }
        }).catch(function () { })
      );
    }
    return Promise.all(tasks);
  }).catch(function () { });
}

// ── Locks ──
function loadLocks() {
  if (!qcState.dirHandle) return Promise.resolve();
  return qcState.dirHandle.getFileHandle('qc_locks.json', { create: false })
    .then(function (fh) { return fh.getFile(); })
    .then(function (f) { return f.text(); })
    .then(function (t) { qcState.locks = JSON.parse(t); })
    .catch(function () { qcState.locks = {}; });
}
function saveLocks() {
  if (!qcState.dirHandle) return Promise.resolve();
  return qcState.dirHandle.getFileHandle('qc_locks.json', { create: true })
    .then(function (fh) { return fh.createWritable(); })
    .then(function (w) { return w.write(JSON.stringify(qcState.locks, null, 2)).then(function () { return w.close(); }); })
    .catch(function (e) { qcStatus('Lỗi lưu lock: ' + e.message, 'err'); });
}
function saveSpinToFolder(rows) {
  if (!qcState.dirHandle) { qcStatus('Chưa chọn DATA TỔNG', 'err'); return Promise.resolve(false); }
  try {
    var wsData = [];
    if (rows.length > 0) {
      wsData.push(Object.keys(rows[0]));
      rows.forEach(function (r) { wsData.push(Object.values(r)); });
    }
    var ws = XLSX.utils.aoa_to_sheet(wsData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    var blob = new Blob([wbout], { type: 'application/octet-stream' });
    var fileName = 'SPIN_QC_' + new Date().toISOString().slice(0, 10) + '.xlsx';
    return qcState.dirHandle.getFileHandle(fileName, { create: true })
      .then(function (fh) { return fh.createWritable(); })
      .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
      .then(function () { return true; })
      .catch(function (e) { qcStatus('Lỗi lưu file: ' + e.message, 'err'); return false; });
  } catch (e) { qcStatus('Lỗi: ' + e.message, 'err'); return Promise.resolve(false); }
}

// ── Sync spinData ↔ spinAllRows ──
function _syncAllRows(recId, updates) {
  // Cập nhật spinData (filtered)
  var si = qcState.spinData.findIndex(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
  if (si >= 0) Object.assign(qcState.spinData[si], updates);
  // Cập nhật spinAllRows (full - để ghi lại file)
  var ai = qcState.spinAllRows.findIndex(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
  if (ai >= 0) Object.assign(qcState.spinAllRows[ai], updates);
}

// ── Claim record ──
function claimRecord(record) {
  var qcName = qcState.qcName.trim();
  if (!qcName) { qcStatus('Vui lòng điền tên QC trước', 'err'); return Promise.resolve(false); }
  if (!qcState.spinFileHandle) { qcStatus('Vui lòng chọn file SPIN trước', 'err'); return Promise.resolve(false); }
  var recId = String(record['RECORDED_ID']).trim();

  // Bước 1: Đọc lại file mới nhất trước khi claim
  qcStatus('Đang kiểm tra...', '');
  return qcState.spinFileHandle.getFile()
    .then(function (file) { return parseSpinFile(file); })
    .then(function (result) {
      // Cập nhật state với data tươi nhất
      qcState.spinRawHeaders = result.headers;
      qcState.spinAllRows    = result.allRows;
      qcState.spinData       = result.rows;
      _deriveLocksFromData();
      renderImportTable();

      // Bước 2: Kiểm tra có ai claim record này chưa
      var freshRow = result.allRows.find(function (r) {
        return String(r['RECORDED_ID']).trim() === recId;
      });
      var takenBy = freshRow ? String(freshRow['QC SP'] || '').trim() : '';

      if (takenBy && takenBy !== qcName) {
        // Đã bị người khác lấy
        qcStatus('⛔ Đã có ' + takenBy + ' lấy record này!', 'err');
        showQcToast(
          QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') +
          '<b>' + takenBy + '</b>&nbsp;đã lấy record này rồi!', 'err');
        return false;
      }

      // Bước 3: Còn trống → ghi claim
      var today = new Date().toISOString().slice(0, 10);
      _syncAllRows(recId, { 'QC SP': qcName, 'Date SP1': today });
      qcState.locks[recId] = { qc: qcName, locked_at: new Date().toISOString() };
      return writeBackToSpinFile().then(function (ok) {
        if (ok) { qcStatus('Đã nhận: ' + recId.slice(0, 20), 'ok'); renderImportTable(); }
        return ok;
      });
    });
}

// ── Unclaim record ──
function unclaimRecord(recId) {
  if (!qcState.spinFileHandle) { qcStatus('Chưa liên kết file SPIN', 'err'); return; }
  _syncAllRows(recId, { 'QC SP': '', 'Date SP1': '' });
  delete qcState.locks[recId];
  writeBackToSpinFile().then(function (ok) {
    if (ok) { qcStatus('Đã bỏ call: ' + recId.slice(0, 20), 'ok'); renderImportTable(); }
  });
}

// ── Render import table ──
function renderImportTable() {
  var container = document.getElementById('qcImportTable');
  if (!container) return;
  var filterUser = (document.getElementById('qcFilterUser') || {}).value || '';
  var filterTeam = (document.getElementById('qcFilterTeam') || {}).value || '';
  var rows = qcState.spinData;
  if (filterUser) rows = rows.filter(function (r) { return String(r['USER'] || '').toLowerCase().includes(filterUser.toLowerCase()); });
  if (filterTeam) rows = rows.filter(function (r) { return String(r['Team'] || '').toLowerCase().includes(filterTeam.toLowerCase()); });

  if (!rows.length) {
    container.innerHTML = '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.list + '</div>Không có dữ liệu</div>';
    return;
  }
  var myName = qcState.qcName.trim();
  var html = '<div class="qc-table-wrap"><table class="qc-table"><thead><tr>' +
    '<th style="width:72px;text-align:center">Hành động</th><th>USER</th><th>Team</th><th>Trạng thái</th><th style="font-size:9px;color:#94a3b8">RECORDED_ID</th></tr></thead><tbody>';

  rows.forEach(function (r) {
    var recId = String(r['RECORDED_ID']).trim();
    var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
    var isMine = myName && lock && lock.qc === myName;
    var isClaimed = !!lock;
    var rowClass = isMine ? 'claimed-by-me' : (isClaimed ? 'claimed' : '');
    var badge = isMine
      ? '<span class="badge badge-mine">Của tôi</span>'
      : isClaimed
        ? '<span class="badge badge-claimed">' + (lock.qc || '') + '</span>'
        : '<span class="badge badge-free">Trống</span>';
    var btn = isMine
      ? '<div style="display:flex;gap:2px">' +
        '<button class="qc-btn sm primary" data-action="score" data-recid="' + recId + '" title="Chấm điểm">' + QC_ICONS.play + '</button>' +
        '<button class="qc-btn sm danger" data-action="unclaim" data-recid="' + recId + '" title="Bỏ call">' + QC_ICONS.undo + '</button></div>'
      : isClaimed ? '<span style="font-size:9px;color:#94a3b8">—</span>'
        : '<button class="qc-btn sm success" data-action="claim" data-recid="' + recId + '" title="Nhận call">' + QC_ICONS.check + ' Nhận</button>';
    html += '<tr class="' + rowClass + '">' +
      '<td style="text-align:center">' + btn + '</td>' +
      '<td>' + (r['USER'] || '') + '</td>' +
      '<td>' + (r['Team'] || '') + '</td>' +
      '<td>' + badge + '</td>' +
      '<td style="font-size:9px;color:#64748b;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + recId + '">' + recId.slice(0, 16) + '…</td></tr>';
  });
  html += '</tbody></table></div>';
  container.innerHTML = html;
}

// ── Render scoring form ──
function renderScoringForm(record) {
  var recId = String(record['RECORDED_ID'] || '').trim();
  var scores = qcState.scores[recId] || {};

  var infoEl = document.getElementById('qcCallInfo');
  if (infoEl) {
    infoEl.innerHTML =
      '<div class="call-id">' + (recId ? recId.slice(0, 40) : 'Chưa chọn call') + '</div>' +
      '<div class="call-meta">' +
      '<span class="call-meta-item">' + QC_ICONS.user + ' ' + (record['USER'] || '—') + '</span>' +
      '<span class="call-meta-item">' + QC_ICONS.building + ' ' + (record['Team'] || '—') + '</span>' +
      '<span class="call-meta-item">' + QC_ICONS.clock + ' ' + (record['DURATION'] || '—') + '</span>' +
      '</div>';
  }

  var injectEl = document.getElementById('qcInjectBar');
  if (injectEl) {
    if (recId) {
      injectEl.innerHTML =
        '<button class="inject-btn" id="qcInjectBtn">' + QC_ICONS.search + ' Tìm SpeechMiner</button>' +
        '<span class="inject-id">' + recId.slice(0, 22) + '…</span>';
      var ib = document.getElementById('qcInjectBtn');
      if (ib) ib.addEventListener('click', function () { injectExternalId(recId); });
    } else {
      injectEl.innerHTML = '';
    }
  }

  var formEl = document.getElementById('qcCriteriaForm');
  if (!formEl) return;
  var criteria = scores.criteria || {};
  var itemNotes = scores.itemNotes || {};
  var html = '';

  QC_CRITERIA.forEach(function (group) {
    html += '<div class="criteria-group"><div class="criteria-group-title">' + group.group + '</div>';
    group.items.forEach(function (item) {
      var val = criteria[item.id] || '';
      var note = itemNotes[item.id] || '';
      var hasP1 = (item.type === 'ynp' || item.type === 'ynpp');
      var hasP2 = (item.type === 'ynpp');
      var showNote = (val === 'N' || val === 'P1' || val === 'P2'); // show note for N, P1, P2

      html +=
        '<div class="criteria-row">' +
        '<div class="criteria-name">' + item.name + ' <span class="criteria-pts">' + item.pts + 'đ' +
        (hasP2 ? '<span class="pts-hint"> / P1·' + item.partial1 + 'đ / P2·' + item.partial2 + 'đ</span>' :
          hasP1 ? '<span class="pts-hint"> / P1·' + Math.round(item.pts * 0.5) + 'đ</span>' : '') +
        '</span></div>' +
        '<div class="criteria-radios">' +
        '<label class="y-lbl"><input type="radio" name="c_' + item.id + '" data-cid="' + item.id + '" data-val="Y" ' + (val === 'Y' ? 'checked' : '') + '> Y</label>' +
        (hasP1 ? '<label class="p1-lbl"><input type="radio" name="c_' + item.id + '" data-cid="' + item.id + '" data-val="P1" ' + (val === 'P1' ? 'checked' : '') + '> P1</label>' : '') +
        (hasP2 ? '<label class="p2-lbl"><input type="radio" name="c_' + item.id + '" data-cid="' + item.id + '" data-val="P2" ' + (val === 'P2' ? 'checked' : '') + '> P2</label>' : '') +
        '<label class="n-lbl"><input type="radio" name="c_' + item.id + '" data-cid="' + item.id + '" data-val="N" ' + (val === 'N' ? 'checked' : '') + '> N</label>' +
        '</div>' +
        '</div>' +
        '<div class="n-note-wrap' + (showNote ? ' n-note-visible' : '') + '" data-noteid="' + item.id + '">' +
        '<textarea class="n-note-input" data-cid="' + item.id + '" placeholder="Mô tả: ' + item.name + '..." rows="2">' + note + '</textarea>' +
        '</div>';
    });
    html += '</div>';
  });
  formEl.innerHTML = html;

  // WOW
  var wowEl = document.getElementById('qcWowList');
  if (wowEl) {
    var selWow = scores.wow || [];
    var wowNotes = scores.wowNotes || {};
    wowEl.innerHTML = WOW_FACTORS.map(function (f, i) {
      var checked = selWow.indexOf(i) >= 0;
      var note = wowNotes[i] || '';
      return '<div class="factor-item-wrap">' +
        '<label class="check-item"><input type="checkbox" data-wow="' + i + '"' + (checked ? ' checked' : '') + '> ' + f + '</label>' +
        '<div class="factor-note-wrap wow-note-wrap' + (checked ? ' factor-note-visible' : '') + '" data-wow-noteid="' + i + '">' +
        '<textarea class="factor-note-input wow-note-input" data-wow="' + i + '" placeholder="Ghi chú: ' + f.slice(0, 30) + '..." rows="2">' + note + '</textarea>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  // AutoFail checkboxes
  var afEl = document.getElementById('qcAfList');
  if (afEl) {
    var selAf = scores.autofail || [];
    var afNotes = scores.afNotes || {};
    afEl.innerHTML = AUTOFAIL_FACTORS.map(function (f, i) {
      var checked = selAf.indexOf(i) >= 0;
      var note = afNotes[i] || '';
      return '<div class="factor-item-wrap">' +
        '<label class="check-item af-item"><input type="checkbox" data-af="' + i + '"' + (checked ? ' checked' : '') + '> ' + f + '</label>' +
        '<div class="factor-note-wrap af-note-wrap' + (checked ? ' factor-note-visible' : '') + '" data-af-noteid="' + i + '">' +
        '<textarea class="factor-note-input af-note-input" data-af="' + i + '" placeholder="Ghi chú: ' + f.slice(0, 30) + '..." rows="2">' + note + '</textarea>' +
        '</div>' +
        '</div>';
    }).join('');
  }
  _updateAfBadge(scores.autofail || []);

  var ne = document.getElementById('qcNoteError');
  if (ne) ne.value = scores.note || '';

  updateScoreBar(recId);
}

function _updateAfBadge(arr) {
  var badge = document.getElementById('qcAfBadge');
  if (badge) {
    badge.textContent = arr.length > 0 ? arr.length + ' !' : '';
    badge.style.display = arr.length > 0 ? 'inline-flex' : 'none';
  }
}

// ── Rebuild combined note: WOW → AutoFail → Criteria (N/P1/P2) ──
function rebuildCombinedNote(recId) {
  var sc = qcState.scores[recId];
  if (!sc) return;
  var lines = [];

  // WOW notes (top)
  var wowNotes = sc.wowNotes || {};
  (sc.wow || []).forEach(function (i) {
    lines.push('WOW - ' + WOW_FACTORS[i]);
    if (wowNotes[i] && wowNotes[i].trim()) lines.push(wowNotes[i].trim());
    lines.push('');
  });

  // AutoFail notes
  var afNotes = sc.afNotes || {};
  (sc.autofail || []).forEach(function (i) {
    lines.push('AutoFail - ' + AUTOFAIL_FACTORS[i]);
    if (afNotes[i] && afNotes[i].trim()) lines.push(afNotes[i].trim());
    lines.push('');
  });

  // Criteria notes (N/P1/P2)
  var itemNotes = sc.itemNotes || {};
  QC_CRITERIA.forEach(function (group) {
    group.items.forEach(function (item) {
      var v = sc.criteria[item.id];
      if ((v === 'N' || v === 'P1' || v === 'P2') && itemNotes[item.id] && itemNotes[item.id].trim()) {
        lines.push('[' + v + '] ' + item.name + ': ' + itemNotes[item.id].trim());
      }
    });
  });

  // Trim trailing empty lines
  while (lines.length && lines[lines.length - 1] === '') lines.pop();

  var noteEl = document.getElementById('qcNoteError');
  if (noteEl) noteEl.value = lines.join('\n');
  sc.note = lines.join('\n');
}

// ── Score calculation ──
function calcScore(recId) {
  var sc = qcState.scores[recId];
  if (!sc) return { total: 0, maxTotal: 97, hasAutofail: false };
  var criteria = sc.criteria || {};
  var total = 0, maxTotal = 0;
  var hasAutofail = (sc.autofail || []).length > 0;

  QC_CRITERIA.forEach(function (group) {
    group.items.forEach(function (item) {
      var val = criteria[item.id];
      maxTotal += item.pts;
      if (val === 'Y') { total += item.pts; }
      else if (val === 'P1') { total += (item.partial1 !== undefined ? item.partial1 : Math.round(item.pts * 0.5)); }
      else if (val === 'P2') { total += (item.partial2 !== undefined ? item.partial2 : Math.round(item.pts * 0.33)); }
      // N or blank = 0
    });
  });

  if ((sc.wow || []).length > 0) total += 3;
  if (hasAutofail) total = 0;

  return { total: total, maxTotal: maxTotal, hasAutofail: hasAutofail };
}

function updateScoreBar(recId) {
  var el = document.getElementById('qcScoreBar');
  if (!el) return;
  var r = calcScore(recId);
  var pct = r.maxTotal > 0 ? Math.round(r.total / r.maxTotal * 100) : 0;
  el.innerHTML =
    '<div><div class="label">Tổng điểm</div>' +
    '<div class="total">' + r.total + '<span style="font-size:13px;opacity:.6">/' + r.maxTotal + '</span></div></div>' +
    '<div style="text-align:right"><div style="font-size:11px;opacity:.7;margin-bottom:4px">' + pct + '%</div>' +
    (r.hasAutofail
      ? '<div class="autofail-badge">' + QC_ICONS.alert + ' AUTO FAIL</div>'
      : '<div style="font-size:10px;color:#86efac">' + QC_ICONS.check + ' OK</div>') +
    '</div>';
}

// ── SVG helpers for modal/toast (inline, không phụ thuộc emoji) ──
var QC_SVG = {
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  save: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/></svg>',
  warn: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  question: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  back: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><polyline points="15 18 9 12 15 6"/></svg>',
};

// ── Toast notification ──
function showQcToast(msg, type) {
  var old = document.getElementById('qcToast');
  if (old) old.remove();
  var t = document.createElement('div');
  t.id = 'qcToast';
  t.style.cssText = 'position:fixed;bottom:56px;left:50%;transform:translateX(-50%) translateY(20px);' +
    'background:' + (type === 'err' ? '#dc2626' : '#16a34a') + ';color:#fff;padding:8px 18px;border-radius:20px;' +
    'font-size:12px;font-weight:600;z-index:9999;pointer-events:none;opacity:0;' +
    'transition:all .25s ease;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.25);' +
    'display:flex;align-items:center;gap:4px';
  t.innerHTML = msg; // dùng innerHTML để render SVG
  document.body.appendChild(t);
  setTimeout(function () { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; }, 30);
  setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; setTimeout(function () { t.remove(); }, 300); }, 2800);
}

// ── Confirm modal ──
function showQcConfirm(title, bodyHtml, onOk) {
  var old = document.getElementById('qcConfirmOverlay');
  if (old) old.remove();
  var overlay = document.createElement('div');
  overlay.id = 'qcConfirmOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9998;display:flex;align-items:center;justify-content:center;padding:16px;animation:qcFadeIn .18s ease';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:14px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden">' +
    '<div style="background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;padding:12px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px">' +
    QC_SVG.question.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') + title +
    '</div>' +
    '<div style="padding:14px 16px;font-size:12px;color:#334155;max-height:280px;overflow-y:auto">' + bodyHtml + '</div>' +
    '<div style="display:flex;gap:8px;padding:10px 16px;border-top:1px solid #e2e8f0;background:#f8fafc">' +
    '<button id="qcConfirmOk" style="flex:1;padding:8px;border:none;border-radius:8px;background:#2563eb;color:#fff;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">' +
    QC_SVG.check.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') + 'Xác nhận lưu' +
    '</button>' +
    '<button id="qcConfirmCancel" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#475569;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">' +
    QC_SVG.back.replace('margin-right:5px', 'margin-right:0') + 'Quay lại' +
    '</button>' +
    '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  if (!document.getElementById('qcKeyframes')) {
    var st = document.createElement('style'); st.id = 'qcKeyframes';
    st.textContent = '@keyframes qcFadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(st);
  }
  function close() { overlay.style.opacity = '0'; overlay.style.transition = 'opacity .15s'; setTimeout(function () { overlay.remove(); }, 150); }
  document.getElementById('qcConfirmOk').addEventListener('click', function () { close(); onOk(); });
  document.getElementById('qcConfirmCancel').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
}

// ── Alert modal (cảnh báo thôi, không cho lưu) ──
function showQcAlert(title, bodyHtml) {
  var old = document.getElementById('qcConfirmOverlay');
  if (old) old.remove();
  var overlay = document.createElement('div');
  overlay.id = 'qcConfirmOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9998;display:flex;align-items:center;justify-content:center;padding:16px;animation:qcFadeIn .18s ease';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:14px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden">' +
      '<div style="background:linear-gradient(135deg,#b45309,#d97706);color:#fff;padding:12px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px">' +
        QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') + title +
      '</div>' +
      '<div style="padding:14px 16px;font-size:12px;color:#334155;max-height:280px;overflow-y:auto">' + bodyHtml + '</div>' +
      '<div style="padding:10px 16px;border-top:1px solid #e2e8f0;background:#f8fafc">' +
        '<button id="qcAlertClose" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#475569;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">' +
          QC_SVG.back.replace('margin-right:5px', 'margin-right:0') + 'Quay lại chấm tiếp' +
        '</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  if (!document.getElementById('qcKeyframes')) {
    var st = document.createElement('style'); st.id = 'qcKeyframes';
    st.textContent = '@keyframes qcFadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(st);
  }
  function close() { overlay.style.opacity = '0'; overlay.style.transition = 'opacity .15s'; setTimeout(function () { overlay.remove(); }, 150); }
  document.getElementById('qcAlertClose').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
}

// ── Save score ──
function saveCurrentScore() {
  if (!qcState.currentRecord) { qcStatus('Chưa chọn call để chấm', 'err'); return; }
  var recId = String(qcState.currentRecord['RECORDED_ID']).trim();
  var sc = qcState.scores[recId] || {};
  var criteria = sc.criteria || {};

  // Kiểm tra các mục chưa chọn
  var unchecked = [];
  QC_CRITERIA.forEach(function (group) {
    group.items.forEach(function (item) {
      if (!criteria[item.id]) unchecked.push(item.name);
    });
  });

  // Có mục chưa chấm → chỉ cảnh báo, chặn lưu
  if (unchecked.length > 0) {
    var warnBody =
      '<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:8px 10px;margin-bottom:10px;color:#92400e;font-size:12px;font-weight:700;display:flex;align-items:flex-start;gap:6px">' +
        QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#92400e"').replace('margin-right:5px', 'margin-right:0;flex-shrink:0;margin-top:1px') +
        '<span>Chưa chấm tại ' + unchecked.length + ' mục mà đã đòi lưu rồi, vội thế!</span>' +
      '</div>' +
      '<ul style="margin:0;padding-left:18px;font-size:11px;color:#475569;line-height:1.9">' +
      unchecked.map(function (n) { return '<li>' + n + '</li>'; }).join('') +
      '</ul>';
    showQcAlert('Cảnh báo — Chưa chấm đủ', warnBody);
    return;
  }

  // Đã chấm đủ → mời xác nhận lưu
  var bodyHtml =
    '<div style="color:#16a34a;font-size:12px;display:flex;align-items:center;gap:5px;margin-bottom:6px">' +
      QC_SVG.check.replace('stroke="currentColor"', 'stroke="#16a34a"').replace('margin-right:5px', 'margin-right:0') +
      'Tất cả mục đã được chấm đầy đủ.' +
    '</div>' +
    '<div style="font-size:12px;color:#64748b">Xác nhận lưu điểm cho call này?</div>';

  showQcConfirm('Xác nhận lưu điểm', bodyHtml, function () {
    if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wowNotes: {}, afNotes: {}, wow: [], autofail: [], note: '', qcName: '' };
    var ne = document.getElementById('qcNoteError');
    qcState.scores[recId].note = ne ? ne.value : '';
    qcState.scores[recId].qcName = qcState.qcName;
    qcSet({ 'qc.scores': qcState.scores });
    qcStatus('Đã lưu: ' + recId.slice(0, 20), 'ok');
    showQcToast(QC_SVG.check.replace('margin-right:5px', 'margin-right:0') + 'Đã lưu điểm thành công!');
  });
}

// ── SpeechMiner inject ──
function injectExternalId(recId) {
  qcStatus('Đang tìm tab SpeechMiner...', '');
  chrome.runtime.sendMessage({ type: 'QC_INJECT_EXTERNAL_ID', recordedId: recId }, function (resp) {
    if (chrome.runtime.lastError || !resp || !resp.success) {
      qcStatus('Lỗi inject: ' + ((resp && resp.error) || (chrome.runtime.lastError && chrome.runtime.lastError.message) || '?'), 'err');
    } else {
      qcStatus('Đã inject External ID, đang tìm...', 'ok');
    }
  });
}

// ── Export summary ──
function renderExportSummary() {
  var el = document.getElementById('qcExportList');
  if (!el) return;
  var myName = qcState.qcName.trim();
  var scored = Object.keys(qcState.scores).filter(function (recId) {
    var sc = qcState.scores[recId];
    return sc.qcName === myName;
  });
  if (!scored.length) {
    el.innerHTML = '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.bar_chart + '</div>Chưa có call nào được chấm bởi "' + myName + '"</div>';
    return;
  }
  var html = '';
  scored.forEach(function (recId) {
    var sc = qcState.scores[recId];
    var r = calcScore(recId);
    var rec = qcState.spinData.find(function (x) { return String(x['RECORDED_ID']).trim() === recId; }) || {};
    html += '<div class="export-summary-row">' +
      '<div><div class="agent">' + (rec['USER'] || recId.slice(0, 16)) + '</div>' +
      '<div style="font-size:10px;color:#64748b">' + recId.slice(0, 24) + '…</div></div>' +
      '<div style="text-align:right">' +
      '<div style="font-weight:700">' + r.total + '/' + r.maxTotal + 'đ</div>' +
      (r.hasAutofail ? '<div style="font-size:10px;color:#dc2626">' + QC_ICONS.alert + ' AUTO FAIL</div>' : '') +
      ((sc.wow || []).length ? '<div style="font-size:10px;color:#16a34a">' + QC_ICONS.star + ' WOW</div>' : '') +
      '</div></div>';
  });
  el.innerHTML = html;
}

// ── Format date helpers ──
function formatDateToDMY(dateStr) {
  if (!dateStr) return '';
  // dateStr format: yyyy-MM-dd → dd/mm/yyyy
  var parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return parts[2] + '/' + parts[1] + '/' + parts[0];
}

// ── Export to folder (fixed filename, overwrite) ──
function exportResults() {
  var myName = qcState.qcName.trim();
  var scored = Object.keys(qcState.scores).filter(function (recId) {
    var sc = qcState.scores[recId];
    return sc.qcName === myName;
  });
  if (!scored.length) { qcStatus('Chưa có call nào để xuất (của "' + myName + '")', 'err'); return; }
  if (!qcState.exportDirHandle) { qcStatus('Vui lòng chọn thư mục xuất trước', 'err'); return; }
  qcStatus('Đang tạo file Excel...', '');

  try {
    var CRITERIA_IDS = ['h1_1', 'h2_1', 'h2_2', 'h2_3', 'h2_4', 'h3_1', 'h3_2', 'h4_1', 'h4_2', 'h5_1', 'h5_2'];
    var CRITERIA_MAP = {};
    QC_CRITERIA.forEach(function (g) { g.items.forEach(function (it) { CRITERIA_MAP[it.id] = it; }); });

    var critHeaders = [];
    CRITERIA_IDS.forEach(function (id) {
      var it = CRITERIA_MAP[id];
      if (it) { critHeaders.push(it.name); critHeaders.push('Điểm ' + id); }
    });

    var headers = ['STT', 'Ngày chấm', 'Team', 'ACCOUNTNUMBER', 'USER',
      'CREATE_TIME', 'SUB_CATEGORY', 'SUB_CODE', 'DURATION', 'RECORDED_ID', 'INTERACTION_ID',
      'QC SP', 'Tổng điểm'].concat(critHeaders).concat([
        'WOW', 'AutoFail', 'WOW chi tiết', 'AutoFail chi tiết', 'note']);

    var dataRows = scored.map(function (recId, stt) {
      var sc = qcState.scores[recId];
      var rec = qcState.spinData.find(function (x) { return String(x['RECORDED_ID']).trim() === recId; }) || {};
      var r = calcScore(recId);
      var crit = sc.criteria || {};
      var cv = [];
      CRITERIA_IDS.forEach(function (id) {
        var it = CRITERIA_MAP[id]; if (!it) { cv.push('', ''); return; }
        var val = crit[id] || '';
        cv.push(val);
        var pts = 0;
        if (val === 'Y') pts = it.pts;
        else if (val === 'P1') pts = it.partial1 !== undefined ? it.partial1 : Math.round(it.pts * 0.5);
        else if (val === 'P2') pts = it.partial2 !== undefined ? it.partial2 : Math.round(it.pts * 0.33);
        cv.push(pts);
      });
      return [stt + 1,
      formatDateToDMY(rec['Date SP1'] || new Date().toISOString().slice(0, 10)),
      rec['Team'] || '', rec['ACCOUNTNUMBER'] || '', rec['USER'] || '',
      rec['CREATE_TIME'] || '', rec['SUB_CATEGORY'] || '', rec['SUB_CODE'] || '',
      rec['DURATION'] || '', recId, rec['INTERACTION_ID'] || '',
      qcState.qcName, r.total
      ].concat(cv).concat([
        (sc.wow || []).length ? 'Y' : '',
        r.hasAutofail ? 'X' : '',
        (sc.wow || []).map(function (i) { return WOW_FACTORS[i]; }).join('; '),
        (sc.autofail || []).map(function (i) { return AUTOFAIL_FACTORS[i]; }).join('; '),
        sc.note || ''
      ]);
    });

    var ws = XLSX.utils.aoa_to_sheet([headers].concat(dataRows));
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kết quả chấm điểm');
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    var blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Fixed filename - always overwrite
    var fixedName = 'ket_qua_QC.xlsx';
    qcState.exportDirHandle.getFileHandle(fixedName, { create: true })
      .then(function (fh) { return fh.createWritable(); })
      .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
      .then(function () {
        qcStatus('Đã xuất: ' + fixedName, 'ok');
        showQcToast(QC_SVG.save.replace('margin-right:5px', 'margin-right:0') + 'Đã lưu file ' + fixedName + ' thành công!');
      })
      .catch(function (e) {
        qcStatus('Lỗi xuất: ' + e.message, 'err');
        showQcToast(QC_SVG.x.replace('margin-right:5px', 'margin-right:0') + 'Lỗi lưu file: ' + e.message, 'err');
      });
  } catch (e) { qcStatus('Lỗi tạo Excel: ' + e.message, 'err'); }
}

// ── Build HTML ──
function buildQcPanelHtml() {
  return '<div id="qcTab">' +
    '<div class="tab-bar">' +
    '<button class="tab-btn active" id="qcTabImport"><span class="tab-icon">' + QC_ICONS.list + '</span>Danh sách</button>' +
    '<button class="tab-btn" id="qcTabScore"><span class="tab-icon">' + QC_ICONS.headphones + '</span>Chấm điểm</button>' +
    '<button class="tab-btn" id="qcTabExport"><span class="tab-icon">' + QC_ICONS.bar_chart + '</span>Xuất file</button>' +
    '</div>' +

    // ── IMPORT ──
    '<div class="qc-section active" id="qcImportSection">' +
    '<div class="qc-toolbar">' +
    '<div style="flex:1;min-width:90px">' +
    '<label class="qc-label">Tên QC</label>' +
    '<input id="qcNameInput" class="qc-input" placeholder="vd: nguyen.van.a" style="height:30px"/>' +
    '</div>' +
    '<div style="display:flex;gap:4px;align-items:flex-end">' +
    '<button class="qc-btn secondary sm" id="qcImportBtn">' + QC_ICONS.import + ' Chọn SPIN</button>' +
    '<button class="qc-btn secondary sm" id="qcFolderBtn">' + QC_ICONS.folder + ' Export</button>' +
    '</div>' +
    '<div style="display:flex;gap:4px;align-items:center;width:100%;margin-top:2px">' +
    '<input id="qcFilterUser" class="qc-input" placeholder="Lọc USER..." style="flex:1;height:28px"/>' +
    '<input id="qcFilterTeam" class="qc-input" placeholder="Team..." style="width:60px;height:28px"/>' +
    '<span id="qcSpinFileStatus" class="folder-status-label" title="File SPIN đang dùng">Chưa chọn</span>' +
    '<button class="qc-btn secondary sm" id="qcRefreshBtn" title="Đọc lại file SPIN">' + QC_ICONS.refresh + '</button>' +
    '</div>' +
    '</div>' +
    '<div class="qc-scroll" id="qcImportTable">' +
    '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.import + '</div>Import file SPIN.xlsx để bắt đầu</div>' +
    '</div>' +
    '</div>' +

    // ── SCORE ──
    '<div class="qc-section" id="qcScoreSection">' +
    '<div class="qc-toolbar" style="gap:6px">' +
    '<div id="qcInjectBar" style="flex:1;display:flex;align-items:center;gap:6px"></div>' +
    '<button class="qc-btn success sm" id="qcSaveScoreBtn">' + QC_ICONS.save + ' Lưu</button>' +
    '</div>' +
    '<div id="qcCallInfo" class="call-info-bar"><div class="call-id">Chưa chọn call</div></div>' +
    '<div id="qcScoreBar" class="score-bar" style="margin:0 8px 8px"></div>' +
    '<div class="qc-scroll">' +
    '<div id="qcCriteriaForm"></div>' +

    // WOW card
    '<div class="qc-card">' +
    '<div class="qc-card-title wow-title"><span class="card-icon">' + QC_ICONS.star + '</span>WOW (+3đ nếu có)</div>' +
    '<div class="check-list" id="qcWowList"></div>' +
    '</div>' +

    // AutoFail collapsible card
    '<div class="qc-card" id="qcAfCard">' +
    '<button class="af-toggle-btn" id="qcAfToggle">' +
    '<span class="card-icon">' + QC_ICONS.alert + '</span>' +
    '<span class="af-title-txt">Auto Fail</span>' +
    '<span id="qcAfBadge" class="af-badge" style="display:none"></span>' +
    '<span id="qcAfChevron" class="af-chevron">' + QC_ICONS.chevron + '</span>' +
    '</button>' +
    '<div class="af-body" id="qcAfBody" style="display:none">' +
    '<div class="check-list" id="qcAfList"></div>' +
    '</div>' +
    '</div>' +

    // Notes
    '<div class="qc-card">' +
    '<div class="qc-card-title"><span class="card-icon">' + QC_ICONS.note + '</span>Ghi chú tổng hợp</div>' +
    '<label class="qc-label" style="font-size:10px;color:#94a3b8">Tự động từ WOW / AutoFail / N / P1 / P2</label>' +
    '<textarea id="qcNoteError" class="qc-textarea" style="min-height:600px;resize:vertical;overflow-y:auto" placeholder="Ghi chú tự động + có thể chỉnh sửa thêm..."></textarea>' +
    '</div>' +
    '</div>' +
    '</div>' +

    // ── EXPORT ──
    '<div class="qc-section" id="qcExportSection">' +
    '<div class="qc-toolbar" style="flex-direction:column;gap:6px">' +
    '<div style="display:flex;gap:6px;align-items:center;width:100%">' +
    '<button class="qc-btn secondary sm" id="qcPickExportFolderBtn">' + QC_ICONS.folder + ' Chọn thư mục xuất</button>' +
    '<span id="qcExportFolderStatus" class="folder-status-label">Chưa chọn</span>' +
    '</div>' +
    '<button class="qc-btn success full" id="qcExportBtn">' + QC_ICONS.download + ' Xuất file ket_qua_QC.xlsx (ghi đè)</button>' +
    '</div>' +
    '<div class="qc-scroll">' +
    '<div class="export-header">' +
    '<span style="font-weight:700;color:#334155">Call đã chấm</span>' +
    '<button class="qc-btn secondary sm" id="qcExportRefreshBtn" title="Làm mới">' + QC_ICONS.refresh + '</button>' +
    '</div>' +
    '<div id="qcExportList"><div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.bar_chart + '</div>Chưa có dữ liệu</div></div>' +
    '</div>' +
    '</div>' +

    '<div id="qcStatus" class="qc-status">Sẵn sàng</div>' +
    '</div>';
}

// ── Update QC name in file when changed ──
function updateQcNameInFile(oldName, newName) {
  if (!qcState.spinFileHandle) return;
  qcStatus('Đang cập nhật tên...', '');
  return qcState.spinFileHandle.getFile()
    .then(function (file) { return parseSpinFile(file); })
    .then(function (result) {
      // Cập nhật spinAllRows: tất cả record có QC SP = oldName → newName
      var updated = false;
      result.allRows.forEach(function (r) {
        if (String(r['QC SP'] || '').trim() === oldName) {
          r['QC SP'] = newName;
          updated = true;
        }
      });
      if (!updated) return;
      // Ghi lại file
      qcState.spinRawHeaders = result.headers;
      qcState.spinAllRows = result.allRows;
      qcState.spinData = result.rows;
      return writeBackToSpinFile().then(function (ok) {
        if (ok) {
          qcStatus('Đã cập nhật tên QC: ' + newName, 'ok');
          renderImportTable();
        }
      });
    })
    .catch(function (e) { qcStatus('Lỗi cập nhật: ' + e.message, 'err'); });
}

// ── Wire all events ──
function wireQcEvents() {
  // Import SPIN (dùng showOpenFilePicker để có thể ghi lại)
  var importBtn = document.getElementById('qcImportBtn');
  if (importBtn) importBtn.addEventListener('click', function () { pickSpinFile().catch(console.error); });

  // Folder pickers
  var folderBtn = document.getElementById('qcFolderBtn');
  if (folderBtn) folderBtn.addEventListener('click', pickExportFolder);

  var pickExpBtn = document.getElementById('qcPickExportFolderBtn');
  if (pickExpBtn) pickExpBtn.addEventListener('click', pickExportFolder);

  // Refresh → đọc lại file SPIN gốc
  var refreshBtn = document.getElementById('qcRefreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', function () { reloadSpinFile().catch(console.error); });

  // QC name
  var nameInput = document.getElementById('qcNameInput');
  if (nameInput) {
    nameInput.addEventListener('input', function (e) {
      var oldName = qcState.qcName;
      var newName = e.target.value.trim();
      qcState.qcName = newName;
      qcSet({ 'qc.qcName': qcState.qcName });
      // Update tên QC trong file nếu có đổi
      if (oldName && newName && oldName !== newName) {
        updateQcNameInFile(oldName, newName);
      }
    });
  }

  // Filters
  var fu = document.getElementById('qcFilterUser');
  var ft = document.getElementById('qcFilterTeam');
  if (fu) fu.addEventListener('input', renderImportTable);
  if (ft) ft.addEventListener('input', renderImportTable);

  // Table delegation (claim / unclaim / score)
  var tableContainer = document.getElementById('qcImportTable');
  if (tableContainer) {
    tableContainer.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.dataset.action, recId = btn.dataset.recid;
      if (!recId) return;
      if (action === 'claim') {
        var record = qcState.spinData.find(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
        if (record) claimRecord(record);
      } else if (action === 'unclaim') {
        unclaimRecord(recId);
      } else if (action === 'score') {
        var rec = qcState.spinData.find(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
        if (rec) { qcState.currentRecord = rec; renderScoringForm(rec); switchQcTab('qcTabScore'); }
      }
    });
  }

  // Save score
  var saveBtn = document.getElementById('qcSaveScoreBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveCurrentScore);

  // Criteria: radio + N-note (event delegation)
  var criteriaForm = document.getElementById('qcCriteriaForm');
  if (criteriaForm) {
    criteriaForm.addEventListener('change', function (e) {
      var input = e.target;
      if (input.type !== 'radio') return;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wow: [], autofail: [], note: '', ghichu: '' };
      var sc = qcState.scores[recId];
      var cid = input.dataset.cid, val = input.dataset.val;
      if (!cid) return;
      sc.criteria[cid] = val;
      // Show/hide note for N, P1, P2
      var noteWrap = criteriaForm.querySelector('[data-noteid="' + cid + '"]');
      var showNote = (val === 'N' || val === 'P1' || val === 'P2');
      if (noteWrap) noteWrap.classList.toggle('n-note-visible', showNote);
      if (!showNote && sc.itemNotes) sc.itemNotes[cid] = '';
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });

    criteriaForm.addEventListener('input', function (e) {
      var ta = e.target;
      if (!ta.classList.contains('n-note-input')) return;
      var cid = ta.dataset.cid;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId || !cid) return;
      if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wowNotes: {}, afNotes: {}, wow: [], autofail: [], note: '' };
      if (!qcState.scores[recId].itemNotes) qcState.scores[recId].itemNotes = {};
      qcState.scores[recId].itemNotes[cid] = ta.value;
      rebuildCombinedNote(recId);
    });
  }

  // WOW: checkbox + note textarea delegation
  var wowList = document.getElementById('qcWowList');
  if (wowList) {
    wowList.addEventListener('change', function (e) {
      var input = e.target;
      if (input.type !== 'checkbox' || input.dataset.wow === undefined) return;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wowNotes: {}, afNotes: {}, wow: [], autofail: [], note: '' };
      var arr = qcState.scores[recId].wow, idx = parseInt(input.dataset.wow, 10);
      if (input.checked) { if (arr.indexOf(idx) < 0) arr.push(idx); }
      else { var i = arr.indexOf(idx); if (i >= 0) arr.splice(i, 1); }
      // Show/hide note
      var wrap = wowList.querySelector('[data-wow-noteid="' + idx + '"]');
      if (wrap) wrap.classList.toggle('factor-note-visible', input.checked);
      if (!input.checked) {
        if (!qcState.scores[recId].wowNotes) qcState.scores[recId].wowNotes = {};
        qcState.scores[recId].wowNotes[idx] = '';
      }
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });
    wowList.addEventListener('input', function (e) {
      var ta = e.target;
      if (!ta.classList.contains('wow-note-input')) return;
      var idx = parseInt(ta.dataset.wow, 10);
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wowNotes: {}, afNotes: {}, wow: [], autofail: [], note: '' };
      if (!qcState.scores[recId].wowNotes) qcState.scores[recId].wowNotes = {};
      qcState.scores[recId].wowNotes[idx] = ta.value;
      rebuildCombinedNote(recId);
    });
  }

  // AutoFail toggle
  var afToggle = document.getElementById('qcAfToggle');
  var afBody = document.getElementById('qcAfBody');
  var afChevron = document.getElementById('qcAfChevron');
  if (afToggle && afBody) {
    afToggle.addEventListener('click', function () {
      var open = afBody.style.display !== 'none';
      afBody.style.display = open ? 'none' : 'block';
      if (afChevron) afChevron.style.transform = open ? '' : 'rotate(180deg)';
    });
  }

  // AutoFail: checkbox + note delegation
  var afList = document.getElementById('qcAfList');
  if (afList) {
    afList.addEventListener('change', function (e) {
      var input = e.target;
      if (input.type !== 'checkbox' || input.dataset.af === undefined) return;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wowNotes: {}, afNotes: {}, wow: [], autofail: [], note: '' };
      var arr = qcState.scores[recId].autofail, idx = parseInt(input.dataset.af, 10);
      if (input.checked) { if (arr.indexOf(idx) < 0) arr.push(idx); }
      else { var j = arr.indexOf(idx); if (j >= 0) arr.splice(j, 1); }
      // Show/hide note
      var wrap = afList.querySelector('[data-af-noteid="' + idx + '"]');
      if (wrap) wrap.classList.toggle('factor-note-visible', input.checked);
      if (!input.checked) {
        if (!qcState.scores[recId].afNotes) qcState.scores[recId].afNotes = {};
        qcState.scores[recId].afNotes[idx] = '';
      }
      _updateAfBadge(qcState.scores[recId].autofail);
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });
    afList.addEventListener('input', function (e) {
      var ta = e.target;
      if (!ta.classList.contains('af-note-input')) return;
      var idx = parseInt(ta.dataset.af, 10);
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      if (!qcState.scores[recId]) qcState.scores[recId] = { criteria: {}, itemNotes: {}, wowNotes: {}, afNotes: {}, wow: [], autofail: [], note: '' };
      if (!qcState.scores[recId].afNotes) qcState.scores[recId].afNotes = {};
      qcState.scores[recId].afNotes[idx] = ta.value;
      rebuildCombinedNote(recId);
    });
  }

  // Export
  var exportBtn = document.getElementById('qcExportBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportResults);
  var expRefBtn = document.getElementById('qcExportRefreshBtn');
  if (expRefBtn) expRefBtn.addEventListener('click', renderExportSummary);
}

// ── Initialize ──
function initQcPanel() {
  return qcGet(['qc.scores', 'qc.qcName']).then(function (d) {
    if (d['qc.scores']) qcState.scores = d['qc.scores'];
    if (d['qc.qcName']) {
      qcState.qcName = d['qc.qcName'];
      var el = document.getElementById('qcNameInput');
      if (el) el.value = qcState.qcName;
    }
    initQcTabs();
    wireQcEvents();
    renderScoringForm({ RECORDED_ID: '', USER: '', Team: '', DURATION: '' });
    // Restore saved folder handles from IndexedDB
    return restoreSavedHandles();
  });
}
