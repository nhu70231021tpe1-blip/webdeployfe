// Main tab switching - Note <-> QC Tool
(function () {
  function getEl(id) { return document.getElementById(id); }

  var noteBtn   = getEl('mainTabNote');
  var qcBtn     = getEl('mainTabQc');
  var notePanel = getEl('notePanel');
  var qcPanel   = getEl('qcPanel');

  if (!noteBtn || !qcBtn) {
    console.error('[QC] Tab buttons not found');
    return;
  }

  function switchMain(tab) {
    var isNote = (tab === 'note');
    noteBtn.classList.toggle('active', isNote);
    qcBtn.classList.toggle('active', !isNote);
    notePanel.classList.toggle('active', isNote);
    qcPanel.classList.toggle('active', !isNote);
  }

  noteBtn.addEventListener('click', function () {
    switchMain('note');
  });

  qcBtn.addEventListener('click', function () {
    switchMain('qc');
    if (!qcPanel.dataset.built) {
      try {
        qcPanel.innerHTML = buildQcPanelHtml();
        qcPanel.dataset.built = '1';
        initQcPanel().catch(function (e) {
          console.error('[QC] initQcPanel error:', e);
        });
      } catch (e) {
        console.error('[QC] buildQcPanelHtml error:', e);
        qcPanel.innerHTML =
          '<div style="padding:20px;color:#dc2626;font-size:12px;font-family:sans-serif">' +
          '<b>Lỗi khởi tạo QC Panel:</b><br>' + e.message + '</div>';
        qcPanel.dataset.built = '1';
      }
    }
  });
})();
