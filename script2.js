document.addEventListener("DOMContentLoaded", () => {
  // Check if data is loaded
  if (typeof flowchartData === "undefined") {
    console.error(
      "Flowchart data not loaded. Make sure flowchart-data.js is included and correct."
    );
    return;
  }

  const dynamicFiltersContainer = document.getElementById(
    "dynamic-filters-container"
  );
  const xmttResult = document.getElementById("xmtt-result");
  const notesResult = document.getElementById("notes-result");
  const pdfViewer = document.getElementById("pdf-viewer");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const mainHeader = document.getElementById("main-header");
  const mainContent = document.getElementById("main-content");
  const body = document.body;
  const logoBtnElement = document.getElementById("logo-btn");
  const toastContainer = document.getElementById("toast-container");

  const FOLDER_MAP = {
    1: "THONG_TIN_CHUNG",
    2: "THONG_TIN_SAN_PHAM",
    3: "DANG_KY_VAY",
    4: "GIAI_NGAN",
    5: "KENH_THANH_TOAN",
    6: "THANH_TOAN_CIC",
  };

  const overlay = document.getElementById("overlay");

  let lastScrollY = 0;
  let isHeaderHidden = false;

  // --- INITIALIZATION ---
  function initialize() {
    createFirstLevelDropdown();
    setupEventListeners();
  }

  const levelLabels = {
    1: "Chọn vấn đề:",
    2: "Chọn chi tiết vấn đề:",
    3: "Chọn loại HĐ:",
    4: "Chọn kênh:",
    5: "Chọn loại đầu vào:",
  };

  // --- DROPDOWN CREATION ---
  function createFirstLevelDropdown() {
    if (!dynamicFiltersContainer) return;
    dynamicFiltersContainer.innerHTML = ""; // Clear previous dropdowns
    const initialOptions = Object.keys(flowchartData);
    createDropdown(initialOptions, 1, flowchartData);
  }

  function createDropdown(options, level, dataNode) {
    const filterGroup = document.createElement("div");
    filterGroup.className = "filter-group";

    const label = document.createElement("label");
    label.className = "filter-label";
    label.textContent = levelLabels[level] || `Chọn điều kiện cấp ${level}:`;

    const select = document.createElement("select");
    select.className = "filter-select";
    select.dataset.level = level;

    select.innerHTML = '<option value="">-- Chọn --</option>';
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      select.appendChild(option);
    });

    select.addEventListener("change", (e) =>
      handleSelection(e, level, dataNode)
    );

    filterGroup.appendChild(label);
    filterGroup.appendChild(select);
    dynamicFiltersContainer.appendChild(filterGroup);
  }

  function isObject(value) {
    return typeof value === "object" && value !== null;
  }

  function isLeaf(node) {
    return node.pdf !== undefined;
  }

  // --- EVENT HANDLING ---
  function handleSelection(event, level, parentDataNode) {
    const selectedKey = event.target.value;

    // --- CAPTURE FUTURE PATH (using text content) ---
    const futureSelections = [];
    const allSelects =
      dynamicFiltersContainer.querySelectorAll("select");
    allSelects.forEach((select) => {
      const selectLevel = parseInt(select.dataset.level, 10);
      if (selectLevel > level && select.selectedIndex > 0) {
        futureSelections.push(select.options[select.selectedIndex].text);
      }
    });

    removeDropdowns(level + 1);
    resetResults();

    if (!selectedKey) {
      return;
    }

    let currentNode = parentDataNode[selectedKey];
    let currentLevel = level + 1;
    let lastKey = selectedKey;

    if (isObject(currentNode) && isLeaf(currentNode)) {
      displayResult(currentNode, lastKey);
      return;
    }

    if (isObject(currentNode) && !isLeaf(currentNode)) {
      createDropdown(Object.keys(currentNode), currentLevel, currentNode);
    } else {
      return; // Nothing to do if it's not a valid node
    }

    // --- TRY TO REAPPLY FUTURE PATH ---
    let reselectionSuccessful = true;
    while (futureSelections.length > 0 && reselectionSuccessful) {
      const conceptToTry = futureSelections.shift();
      const nextSelect = dynamicFiltersContainer.querySelector(
        `select[data-level="${currentLevel}"]`
      );

      if (conceptToTry && nextSelect) {
        const matchingOption = Array.from(nextSelect.options).find(
          (opt) => opt.text === conceptToTry
        );

        if (matchingOption) {
          const keyToTry = matchingOption.value;
          nextSelect.value = keyToTry;
          lastKey = keyToTry;
          const nextNode = currentNode[keyToTry];

          if (isObject(nextNode) && isLeaf(nextNode)) {
            displayResult(nextNode, lastKey);
            reselectionSuccessful = false; // End the loop
          } else if (isObject(nextNode) && !isLeaf(nextNode)) {
            currentNode = nextNode;
            currentLevel++;
            createDropdown(Object.keys(currentNode), currentLevel, currentNode);
          } else {
            reselectionSuccessful = false;
          }
        } else {
          reselectionSuccessful = false;
        }
      } else {
        reselectionSuccessful = false;
      }
    }
  }

  const headerSearch = document.getElementById("header-search");
  const searchResultsContainer = document.getElementById("search-results-container");

  function searchFlowchartData(query) {
    const results = [];
    if (!query) return results;
    const lowerQuery = query.toLowerCase();

    Object.keys(flowchartData).forEach(level1Key => {
      const level1Node = flowchartData[level1Key];
      // Search Level 1
      if (level1Key.toLowerCase().includes(lowerQuery)) {
        results.push({
          path: [level1Key],
          display: level1Key
        });
      }
      // Search Level 2
      if (isObject(level1Node) && !isLeaf(level1Node)) {
        Object.keys(level1Node).forEach(level2Key => {
          if (level2Key.toLowerCase().includes(lowerQuery)) {
            results.push({
              path: [level1Key, level2Key],
              display: `${level1Key.split('. ')[1]} > ${level2Key}`
            });
          }
        });
      }
    });
    return results;
  }

  function displaySearchResults(results) {
    searchResultsContainer.innerHTML = "";
    if (results.length === 0) {
      searchResultsContainer.classList.remove("show");
      return;
    }

    results.forEach(result => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.textContent = result.display;
      resultItem.dataset.path = JSON.stringify(result.path);
      searchResultsContainer.appendChild(resultItem);
    });
    searchResultsContainer.classList.add("show");
  }

  function applySearchResult(path) {
    createFirstLevelDropdown(); // Reset to start
    let currentNode = flowchartData;
    
    for (let i = 0; i < path.length; i++) {
        const key = path[i];
        const level = i + 1;
        const select = dynamicFiltersContainer.querySelector(`select[data-level="${level}"]`);
        
        if (select && Array.from(select.options).some(opt => opt.value === key)) {
            select.value = key;
            currentNode = currentNode[key];
            
            if (isObject(currentNode) && !isLeaf(currentNode)) {
                createDropdown(Object.keys(currentNode), level + 1, currentNode);
            } else if (isObject(currentNode) && isLeaf(currentNode)) {
                displayResult(currentNode, key);
            }
        }
    }
    
    searchResultsContainer.classList.remove("show");
    headerSearch.value = "";
  }

  function setupSearchEventListeners() {
    headerSearch.addEventListener("input", (e) => {
      const query = e.target.value;
      if (query.length > 1) {
        const results = searchFlowchartData(query);
        displaySearchResults(results);
      } else {
        searchResultsContainer.classList.remove("show");
      }
    });

    headerSearch.addEventListener("focus", (e) => {
        const query = e.target.value;
        if (query.length > 1) {
            const results = searchFlowchartData(query);
            if (results.length > 0) {
                searchResultsContainer.classList.add("show");
            }
        }
    });

    // Use mousedown instead of click to fire before blur
    searchResultsContainer.addEventListener("mousedown", (e) => {
        const resultItem = e.target.closest(".search-result-item");
        if (resultItem && resultItem.dataset.path) {
            const path = JSON.parse(resultItem.dataset.path);
            applySearchResult(path);
        }
    });

    headerSearch.addEventListener("blur", () => {
      setTimeout(() => {
        searchResultsContainer.classList.remove("show");
      }, 150);
    });
  }

  // --- EVENT HANDLING ---
  function handleSelection(event, level, parentDataNode) {
    const selectedKey = event.target.value;

    // --- CAPTURE FUTURE PATH (using text content) ---
    const futureSelections = [];
    const allSelects =
      dynamicFiltersContainer.querySelectorAll("select");
    allSelects.forEach((select) => {
      const selectLevel = parseInt(select.dataset.level, 10);
      if (selectLevel > level && select.selectedIndex > 0) {
        futureSelections.push(select.options[select.selectedIndex].text);
      }
    });

    removeDropdowns(level + 1);
    resetResults();

    if (!selectedKey) {
      return;
    }

    let currentNode = parentDataNode[selectedKey];
    let currentLevel = level + 1;
    let lastKey = selectedKey;

    if (isObject(currentNode) && isLeaf(currentNode)) {
      displayResult(currentNode, lastKey);
      return;
    }

    if (isObject(currentNode) && !isLeaf(currentNode)) {
      createDropdown(Object.keys(currentNode), currentLevel, currentNode);
    } else {
      return; // Nothing to do if it's not a valid node
    }

    // --- TRY TO REAPPLY FUTURE PATH ---
    let reselectionSuccessful = true;
    while (futureSelections.length > 0 && reselectionSuccessful) {
      const conceptToTry = futureSelections.shift();
      const nextSelect = dynamicFiltersContainer.querySelector(
        `select[data-level="${currentLevel}"]`
      );

      if (conceptToTry && nextSelect) {
        const matchingOption = Array.from(nextSelect.options).find(
          (opt) => opt.text === conceptToTry
        );

        if (matchingOption) {
          const keyToTry = matchingOption.value;
          nextSelect.value = keyToTry;
          lastKey = keyToTry;
          const nextNode = currentNode[keyToTry];

          if (isObject(nextNode) && isLeaf(nextNode)) {
            displayResult(nextNode, lastKey);
            reselectionSuccessful = false; // End the loop
          } else if (isObject(nextNode) && !isLeaf(nextNode)) {
            currentNode = nextNode;
            currentLevel++;
            createDropdown(Object.keys(currentNode), currentLevel, currentNode);
          } else {
            reselectionSuccessful = false;
          }
        } else {
          reselectionSuccessful = false;
        }
      } else {
        reselectionSuccessful = false;
      }
    }
  }

  function setupEventListeners() {
    sidebarToggle.addEventListener("click", () => {
      body.classList.toggle("sidebar-collapsed");
    });

    logoBtnElement &&
      logoBtnElement.addEventListener("click", () => location.reload());

    setupSearchEventListeners(); // Call search event listeners setup
    // Event listeners for expand buttons
    const expandBtns = document.querySelectorAll(".expand-btn");
    expandBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetBox = document.getElementById(btn.dataset.target);
        if (targetBox) {
          const isExpanded = targetBox.classList.toggle("expanded");
          overlay.classList.toggle("show", isExpanded);
          btn.textContent = isExpanded ? "✖" : "⤢";
        }
      });
    });

    // Event listener for overlay to close expanded boxes
    overlay.addEventListener("click", () => {
      const expandedBox = document.querySelector(".sub-header-box.expanded");
      if (expandedBox) {
        expandedBox.classList.remove("expanded");
        overlay.classList.remove("show");
        // Reset the button text
        const expandBtn = expandedBox.querySelector(".expand-btn");
        if (expandBtn) {
          expandBtn.textContent = "⤢";
        }
      }
    });
  }

  // --- UI UPDATES ---
  function displayResult(resultObject, selectionText) {
    xmttResult.innerHTML = resultObject.xmtt
      ? `<p>${resultObject.xmtt}</p>`
      : "<p>Không yêu cầu XMTT.</p>";
    notesResult.innerHTML = resultObject.note
      ? `<p>${resultObject.note}</p>`
      : "<p>Không có lưu ý.</p>";

    if (resultObject.pdf) {
      let pdfPath;
      // If pdf value contains a '/', treat it as a full path
      if (resultObject.pdf.includes("/")) {
        pdfPath = resultObject.pdf;
      } else {
        // Otherwise, construct path dynamically based on the TOP-LEVEL category
        const firstLevelSelect = document.querySelector('select[data-level="1"]');
        const firstLevelSelection = firstLevelSelect ? firstLevelSelect.value : "";
        const categoryIndex = firstLevelSelection.charAt(0);
        const folderName = FOLDER_MAP[categoryIndex];
        
        if (folderName) {
          pdfPath = `./pdfile/${folderName}/${resultObject.pdf}`;
        } else {
          // Fallback to root pdfile directory if no folder is mapped
          pdfPath = `./pdfile/${resultObject.pdf}`;
        }
      }
      pdfViewer.src = pdfPath;
    } else {
      pdfViewer.src = "";
    }

    // Handle single or multiple alerts
    if (resultObject.alert) {
      if (Array.isArray(resultObject.alert)) {
        resultObject.alert.forEach((msg) => showNotification(msg));
      } else {
        showNotification(resultObject.alert);
      }
    }
  }

  function showNotification(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "notification-toast";

    const toastMessage = document.createElement("p");
    toastMessage.textContent = message;

    const toastClose = document.createElement("button");
    toastClose.className = "toast-close";
    toastClose.innerHTML = "✕";
    toastClose.onclick = () => {
      toast.classList.remove("show");
      // Optional: remove the element after transition
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    };

    toast.appendChild(toastMessage);
    toast.appendChild(toastClose);
    toastContainer.appendChild(toast);

    // Trigger the show animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 10); // Short delay to allow CSS transition
  }

  function resetResults() {
    xmttResult.innerHTML = "<p>Chọn điều kiện để xem kết quả</p>";
    notesResult.innerHTML = "<p>Thông báo và lưu ý sẽ hiển thị ở đây</p>";
    pdfViewer.src = "";
  }

  function removeDropdowns(startLevel) {
    const allDropdowns =
      dynamicFiltersContainer.querySelectorAll(".filter-group");
    allDropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector("select");
      if (parseInt(select.dataset.level, 10) >= startLevel) {
        dropdown.remove();
      }
    });
  }


  // --- START THE APP ---
  initialize();
});
