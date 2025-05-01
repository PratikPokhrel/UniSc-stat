// script.js (Full Combined Code - Should match previous correct version)

// --- Configuration ---
const config = {
    dataPath: 'navigation_v1.json',
    pageSize: 10,
    defaultSortField: 'title',
    defaultSortDirection: 'asc',
    searchDebounceTime: 300,
    filterCountDebounceTime: 200, // Debounce time for updating filter counts

    filterCategories: [
        { field: 'theme', containerId: 'themeFilters', limit: 0 }, // 0 = no limit
        { field: 'category', containerId: 'categoryFilters', limit: 0 },
        { field: 'group', containerId: 'groupFilters', limit: 0 },
        { field: 'access', containerId: 'accessFilters', limit: 0 },
        { field: 'source', containerId: 'sourceFilters', limit: 0 },
        { field: 'new_updated', containerId: 'statusFilters', limit: 3 } // Keep limit for status if desired
    ],

    tableFields: [
        { field: 'title', display: 'Title', sortable: true, linkField: 'link' },
        { field: 'description', display: 'Description', sortable: false },
        { field: 'bi_next_update', display: 'BI Update', sortable: true },
        { field: 'dataset_next_update', display: 'Dataset Update', sortable: true },
        { field: 'theme', display: 'Theme', sortable: true },
        { field: 'category', display: 'Category', sortable: true },
        { field: 'group', display: 'Group', sortable: true },
        { field: 'access', display: 'Access', sortable: true },
        { field: 'source', display: 'Source/Type', sortable: true },
        { field: 'new_updated', display: 'Status', sortable: true },
    ],

    searchFields: [
        'title', 'description', 'keywords', 'questions_report_can_answer',
        'theme', 'category', 'group', 'dataset', 'source'
    ],

    // Dummy credentials for local login
    localCredentials: {
        username: 'user',
        password: 'password'
    }
};

// --- State Management ---
const state = {
    isLoggedIn: false,
    data: [],
    filteredData: [],
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    // Use Sets for efficient add/delete/has operations in multi-select
    activeFilters: {}, // Example: { theme: new Set(['Course', 'Program']), category: new Set(['School']) }
    sortField: config.defaultSortField,
    sortDirection: config.defaultSortDirection,
    isLoading: true,
    headers: [],
    view: 'table',
    searchTimeout: null // For debouncing search input
};

// --- DOM Elements ---
let elements = {}; // Populated in initPortal

// --- Utility Functions ---

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Domain Icon Mapping
function getDomainIcon(category) {
    const firstCategory = Array.isArray(category) ? category[0] : category;
    if (!firstCategory) return '❓';
    const catLower = String(firstCategory).toLowerCase();
    switch (catLower) {
        case 'students': return '🎓';
        case 'school': return '🏫';
        case 'campus': return '🏢';
        case 'research': return '🔬';
        case 'enrolment planning': return '📅';
        case 'staff': return '👥';
        case 'corporate': return '💼';
        case 'public data': return '🌐';
        case 'curriculum': return '📚';
        default: return '❓';
    }
}

function getItemIcon(item) {
     // Use optional chaining and check first element if source is array
     switch (item.source?.[0]) {
         case 'Power BI': return '📊';
         case 'Dataset': return '📁';
         case 'Document': return '📄';
         case 'Internal':
             return (item.link && typeof item.link === 'string' && item.link.toLowerCase().includes('powerbi.com')) ? '📊' : '🏢';
         case 'External': return '🌐';
         default: return item.link ? '🔗' : '❓';
     }
}

function formatDisplayValue(value) {
     if (value === null || value === undefined || value === '') return 'N/A';
     if (Array.isArray(value)) {
         const filteredValues = value.filter(v => v !== null && v !== undefined && String(v).trim() !== '');
         return filteredValues.length > 0 ? filteredValues.join(', ') : 'N/A';
     }
     const stringValue = String(value);
     if (stringValue.toLowerCase() === 'daily' || stringValue.toLowerCase() === 'weekly' || stringValue.toLowerCase() === 'monthly') {
           return stringValue.charAt(0).toUpperCase() + stringValue.slice(1).toLowerCase();
     }
     if (stringValue.match(/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)?$/) || stringValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}/)) {
         try {
             const date = new Date(stringValue.includes('T') ? stringValue : stringValue + 'T00:00:00Z');
             if (!isNaN(date)) {
                 return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
             }
         } catch (e) { /* Ignore */ }
     }
     return stringValue.replace(/(\r\n|\n|\r)/gm, " ").trim();
 }

// --- Login/Logout ---
function checkLoginState() {
    console.log("Checking login state...");
    if (localStorage.getItem('isLoggedIn') === 'true') {
        console.log("User is logged in.");
        state.isLoggedIn = true;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('portalContent').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('loginForm')?.removeEventListener('submit', handleLogin);
        initPortal(); // Initialize portal content
    } else {
        console.log("User is logged out.");
        state.isLoggedIn = false;
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('portalContent').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        removePortalEventListeners(); // Clean up portal listeners if any
        setupLoginListener();
    }
}

function setupLoginListener() {
    console.log("Setting up login listener.");
    const loginForm = document.getElementById('loginForm');
    loginForm?.removeEventListener('submit', handleLogin); // Prevent duplicates
    loginForm?.addEventListener('submit', handleLogin);

    // Ensure logout listener is attached if button exists (relevant if checkLoginState runs multiple times)
    const logoutBtn = document.getElementById('logoutBtn');
     if (logoutBtn && !logoutBtn.getAttribute('listener-attached')) {
         logoutBtn.addEventListener('click', handleLogout);
         logoutBtn.setAttribute('listener-attached', 'true');
     }
}

function handleLogin(event) {
    event.preventDefault();
    console.log("Handling login attempt...");
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('loginError');

    if (usernameInput.value === config.localCredentials.username && passwordInput.value === config.localCredentials.password) {
        console.log("Login successful.");
        localStorage.setItem('isLoggedIn', 'true');
        errorMsg.style.display = 'none';
        checkLoginState(); // Show portal
    } else {
        console.log("Login failed.");
        errorMsg.style.display = 'block';
    }
}

function handleLogout() {
    console.log("Handling logout.");
    localStorage.removeItem('isLoggedIn');
    // Reset state
    Object.assign(state, {
        isLoggedIn: false, data: [], filteredData: [], currentPage: 1, totalPages: 1,
        searchTerm: '', activeFilters: {}, isLoading: true, headers: [],
        view: 'table', sortField: config.defaultSortField, sortDirection: config.defaultSortDirection
    });
    // Clear preferences
    localStorage.removeItem('portalView');
    localStorage.removeItem('portalSortField');
    localStorage.removeItem('portalSortDirection');

    portalListenersAttached = false; // Reset flag

    // Clear dynamic UI elements (optional but good practice)
    document.getElementById('resultsBody')?. M('');
    document.getElementById('resultsThead')?. M('');
    document.getElementById('pagination')?. M('');
    document.getElementById('kpiContainer')?. M('<div class="loading-kpi"></div>');
    config.filterCategories.forEach(cat => {
         document.getElementById(cat.containerId)?. M('');
    });


    checkLoginState(); // Show login form
}

// --- Portal Initialization ---
let portalInitialized = false;
async function initPortal() {
    if (portalInitialized && state.data.length > 0) { // Prevent re-init if already done and data exists
        console.log("Portal already initialized with data.");
        // Ensure UI reflects current state (e.g., view buttons) in case of quick reloads
        loadPreferences();
        applyFiltersAndSearch(); // Re-apply filters to ensure UI consistency
        return;
    }
    console.log("Initializing Portal...");

    elements = {
        searchInput: document.getElementById('searchInput'),
        resultsTable: document.getElementById('resultsTable'),
        resultsThead: document.getElementById('resultsThead'),
        tableView: document.getElementById('tableView'),
        cardView: document.getElementById('cardView'),
        tableViewBtn: document.getElementById('tableViewBtn'),
        cardViewBtn: document.getElementById('cardViewBtn'),
        resultsBody: document.getElementById('resultsBody'),
        pagination: document.getElementById('pagination'),
        noResultsTable: document.getElementById('noResultsTable'),
        noResultsCard: document.getElementById('noResultsCard'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        dataStats: document.getElementById('dataStats'),
        toggleFilters: document.getElementById('toggleFilters'),
        filtersPanel: document.getElementById('filtersPanel'),
        clearFiltersBtn: document.getElementById('clearFiltersBtn'),
        kpiContainer: document.getElementById('kpiContainer'),
        logoutBtn: document.getElementById('logoutBtn')
    };

    if (!elements.searchInput || !elements.kpiContainer) {
         console.error("Essential portal elements not found. Aborting initialization.");
         showError("Failed to initialize portal UI elements.");
         return;
    }

    showLoading(true);
    portalInitialized = false; // Mark as initializing

    try {
        loadPreferences(); // Load view/sort prefs
        await loadData(); // Fetch and process data
        renderKPIs();
        renderTableHeader(); // Renders header
        setupPortalEventListeners(); // Setup listeners ONCE
        generateFilters(); // Generate filter UI
        applyFiltersAndSearch(); // Initial filter/sort/render/counts
        portalInitialized = true; // Mark as done
        console.log("Portal Initialization Complete.");
        showLoading(false);
    } catch (error) {
        console.error('Failed to initialize the portal:', error);
        elements.dataStats.textContent = `Error: ${error.message}. Check console.`;
        elements.kpiContainer.innerHTML = '<div class="loading-kpi error">Failed to load KPIs.</div>';
        portalInitialized = false; // Allow potential retry?
        showLoading(false);
        showError(`Initialization failed: ${error.message}`);
    }
}

// --- Data Loading & Processing ---
async function loadData() {
    // Skip fetch if data already exists in state (prevent refetch on quick reloads)
    if (state.data.length > 0) {
        console.log("Data already in state, ensuring sort order.");
        sortData(state.sortField, state.sortDirection, state.data); // Ensure it's sorted correctly
        state.filteredData = [...state.data];
        calculatePagination();
        updateDataStats();
        return;
    }

    console.log(`Fetching data from: ${config.dataPath}`);
    try {
        const response = await fetch(config.dataPath);
        if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
        const jsonData = await response.json();
        if (!Array.isArray(jsonData)) throw new Error('Data is not an array.');

        console.log('JSON data loaded:', jsonData.length, 'items');
        state.headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

        // Pre-process data: ensure multi-value fields are arrays
        state.data = jsonData.map(item => {
            const processedItem = { ...item, _icon: getItemIcon(item) };
            config.filterCategories.forEach(cat => {
                const field = cat.field;
                if (processedItem.hasOwnProperty(field)) {
                    let value = processedItem[field];
                    if (value !== null && value !== undefined && !Array.isArray(value)) {
                        // Split logic or wrap single value
                        if (typeof value === 'string' && (value.includes(';#') || value.includes(';'))) {
                             processedItem[field] = value.split(/[#;]/).map(v => v.trim()).filter(Boolean);
                        } else {
                             const singleValue = String(value).replace(/(\r\n|\n|\r)/gm, " ").trim();
                             processedItem[field] = singleValue ? [singleValue] : [];
                        }
                    } else if (value === null || value === undefined) {
                        processedItem[field] = [];
                    }
                } else {
                    processedItem[field] = []; // Ensure field exists
                }
            });
            // Ensure dataset is array
            if (processedItem.dataset && !Array.isArray(processedItem.dataset)) {
                processedItem.dataset = [String(processedItem.dataset).trim()].filter(Boolean);
            } else if (!processedItem.dataset) {
                processedItem.dataset = [];
            }
            return processedItem;
        });

        sortData(state.sortField, state.sortDirection, state.data);
        state.filteredData = [...state.data];
        calculatePagination();
        updateDataStats();
    } catch (error) {
        console.error('Error in loadData:', error);
        if (error instanceof SyntaxError) throw new Error(`Failed to parse JSON data from ${config.dataPath}. Check JSON validity.`);
        throw error;
    }
}

// --- KPI Rendering ---
function renderKPIs() {
    if (!elements.kpiContainer) return;
    if (state.data.length === 0) {
        elements.kpiContainer.innerHTML = '<div class="loading-kpi">No data for KPIs.</div>'; return;
    }
    elements.kpiContainer.innerHTML = '';

    const kpis = [
        { title: 'Total Items', value: state.data.length, text: 'All listed items' },
        { title: 'Power BI Reports', value: state.data.filter(item => item.source?.includes('Power BI')).length, text: 'Source: Power BI' },
        { title: 'New/Updated', value: state.data.filter(item => item.new_updated?.includes('New') || item.new_updated?.includes('Updated')).length, text: 'Marked recently' },
        { title: 'Distinct Themes', value: getUniqueValues('theme').length, text: 'Unique Theme values' }
    ];

    kpis.forEach(kpi => {
        const kpiBox = document.createElement('a');
        kpiBox.className = 'kpi-box'; kpiBox.href = '#';
        kpiBox.addEventListener('click', e => e.preventDefault());
        kpiBox.innerHTML = `
            <div class="kpi-content">
                <h3>${kpi.title}</h3>
                <p class="kpi-figure">${kpi.value?.toLocaleString() ?? '0'}</p>
                <p class="kpi-text">${kpi.text ?? ''}</p>
            </div>`;
        elements.kpiContainer.appendChild(kpiBox);
    });
}

// --- Filter Generation & Handling ---
function generateFilters() {
    config.filterCategories.forEach(category => {
        const containerEl = document.getElementById(category.containerId);
        if (!containerEl) return;
        containerEl.innerHTML = '';

        const values = getUniqueValues(category.field);
        const displayValues = values.slice(0, category.limit || values.length);

        displayValues.forEach((value, index) => {
            if (!value) return;
            const wrapper = document.createElement('label');
            wrapper.classList.add('filter-checkbox-label');
            const checkboxId = `${category.field}-${value.replace(/[^a-zA-Z0-9]/g, '-')}-${index}`; // More robust ID

            wrapper.innerHTML = `
                <input type="checkbox" id="${checkboxId}" class="filter-checkbox" data-field="${category.field}" data-value="${value}">
                <span class="filter-checkbox-text">${value}</span>
            `;
            const checkbox = wrapper.querySelector('input');

            if (state.activeFilters[category.field]?.has(value)) {
                checkbox.checked = true;
                wrapper.classList.add('active');
            }

            checkbox.removeEventListener('change', handleFilterChange); // Prevent duplicates
            checkbox.addEventListener('change', handleFilterChange);

            containerEl.appendChild(wrapper);
        });
    });
    // Initial counts updated by first applyFiltersAndSearch call
}

function handleFilterChange(event) {
    toggleFilter(event.target);
}

function getUniqueValues(field) {
    const valueSet = new Set();
    state.data.forEach(item => {
        const values = item[field]; // Should be an array
        if (Array.isArray(values)) {
            values.forEach(v => {
                const trimmedV = String(v ?? '').trim();
                if (trimmedV) valueSet.add(trimmedV);
            });
        }
    });
    return Array.from(valueSet).sort((a, b) => a.localeCompare(b));
}

function toggleFilter(checkboxElement) {
    const field = checkboxElement.dataset.field;
    const value = checkboxElement.dataset.value;
    const label = checkboxElement.closest('label');

    state.activeFilters[field] = state.activeFilters[field] || new Set();
    const fieldFilters = state.activeFilters[field];

    if (checkboxElement.checked) {
        fieldFilters.add(value);
        label?.classList.add('active');
    } else {
        fieldFilters.delete(value);
        label?.classList.remove('active');
        if (fieldFilters.size === 0) delete state.activeFilters[field];
    }
    state.currentPage = 1;
    applyFiltersAndSearch();
}

function clearAllFilters() {
    state.activeFilters = {};
    document.querySelectorAll('.filter-checkbox:checked').forEach(cb => {
        cb.checked = false;
        cb.closest('label')?.classList.remove('active');
    });
    document.querySelectorAll('.filter-checkbox-label.disabled').forEach(label => {
        label.classList.remove('disabled');
        const cb = label.querySelector('input');
        if (cb) cb.disabled = false;
    });
    state.currentPage = 1;
    applyFiltersAndSearch();
}

// Debounced version of updateFilterCounts
const debouncedUpdateFilterCounts = debounce(updateFilterCounts, config.filterCountDebounceTime);

function updateFilterCounts() {
    let baseFilteredData = [...state.data];
    if (state.searchTerm) { /* ... apply search ... */
         const searchLower = state.searchTerm.toLowerCase();
         baseFilteredData = baseFilteredData.filter(item =>
             config.searchFields.some(field => {
                 const value = item[field];
                 if (Array.isArray(value)) return value.some(v => String(v ?? '').toLowerCase().includes(searchLower));
                 return value !== null && value !== undefined && String(value).toLowerCase().includes(searchLower);
             })
         );
    }

    config.filterCategories.forEach(category => {
        const containerEl = document.getElementById(category.containerId);
        if (!containerEl) return;
        const currentCategoryField = category.field;

        let filteredByOthers = [...baseFilteredData];
        Object.entries(state.activeFilters).forEach(([field, valueSet]) => {
            if (field !== currentCategoryField && valueSet instanceof Set && valueSet.size > 0) {
                filteredByOthers = filteredByOthers.filter(item => {
                    const itemValues = item[field];
                    return Array.isArray(itemValues) && itemValues.some(val => valueSet.has(val));
                });
            }
        });

        const labels = containerEl.querySelectorAll('label');
        labels.forEach(label => {
            const checkbox = label.querySelector('.filter-checkbox');
            if (!checkbox) return;
            const btnValue = checkbox.dataset.value;
            const span = label.querySelector('.filter-checkbox-text');
            if (!span) return;

            const count = filteredByOthers.filter(item => {
                 const itemValues = item[currentCategoryField];
                 return Array.isArray(itemValues) && itemValues.includes(btnValue);
            }).length;

            span.innerHTML = `${btnValue} <span class="filter-count">(${count})</span>`;
            if (count === 0 && !checkbox.checked) {
                label.classList.add('disabled'); checkbox.disabled = true;
            } else {
                label.classList.remove('disabled'); checkbox.disabled = false;
            }
        });
    });
}

// --- Core Filtering, Sorting, Searching ---
function applyFiltersAndSearch() {
    showLoading(true);
    setTimeout(() => {
        let filtered = [...state.data];
        if (state.searchTerm) { /* Apply search */
             const searchLower = state.searchTerm.toLowerCase();
             filtered = filtered.filter(item =>
                 config.searchFields.some(field => {
                     const value = item[field];
                     if (Array.isArray(value)) return value.some(v => String(v ?? '').toLowerCase().includes(searchLower));
                     return value !== null && value !== undefined && String(value).toLowerCase().includes(searchLower);
                 })
             );
        }
        Object.entries(state.activeFilters).forEach(([field, valueSet]) => { /* Apply filters */
             if (valueSet instanceof Set && valueSet.size > 0) {
                  filtered = filtered.filter(item => {
                      const itemValues = item[field];
                      return Array.isArray(itemValues) && itemValues.some(val => valueSet.has(val));
                  });
              }
        });

        state.filteredData = filtered;
        sortData(state.sortField, state.sortDirection, state.filteredData);
        calculatePagination();
        renderResults();
        updateDataStats();
        updateSortIndicators();
        debouncedUpdateFilterCounts();
        showLoading(false);
    }, 50);
}

function sortData(field, direction, dataArray = state.filteredData) {
    if (!field || !dataArray) return dataArray ?? []; // Add guard for dataArray

    dataArray.sort((a, b) => {
        let aValue = Array.isArray(a[field]) ? a[field][0] : a[field]; // Sort by first element if array
        let bValue = Array.isArray(b[field]) ? b[field][0] : b[field];
        const aIsNull = aValue === null || aValue === undefined || String(aValue).trim() === '';
        const bIsNull = bValue === null || bValue === undefined || String(bValue).trim() === '';

        if (aIsNull && bIsNull) return 0; if (aIsNull) return direction === 'asc' ? 1 : -1; if (bIsNull) return direction === 'asc' ? -1 : 1;
        aValue = String(aValue); bValue = String(bValue);

        if (['bi_next_update', 'dataset_next_update'].includes(field)) { /* Date/Frequency Sort Logic */
             const dateRegex = /^\d{4}-\d{2}-\d{2}/;
             const aIsDate = dateRegex.test(aValue); const bIsDate = dateRegex.test(bValue);
             if (aIsDate && bIsDate) { try { const aDate = new Date(aValue.includes('T') ? aValue : aValue + 'T00:00:00Z'); const bDate = new Date(bValue.includes('T') ? bValue : bValue + 'T00:00:00Z'); if (!isNaN(aDate) && !isNaN(bDate)) return direction === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime(); } catch (e) {} }
             const frequencyOrder = { 'daily': 1, 'weekly': 2, 'monthly': 3 }; const aFreq = frequencyOrder[aValue.toLowerCase()]; const bFreq = frequencyOrder[bValue.toLowerCase()];
             if (aFreq && bFreq) return direction === 'asc' ? aFreq - bFreq : bFreq - aFreq;
             if (aIsDate && bFreq) return direction === 'asc' ? 1 : -1; if (bIsDate && aFreq) return direction === 'asc' ? -1 : 1;
        }
        return direction === 'asc' ? aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' }) : bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
    });
    return dataArray;
}

function handleSort(field) {
    const fieldConfig = config.tableFields.find(f => f.field === field);
    if (!fieldConfig?.sortable) return;
    const newDirection = (state.sortField === field && state.sortDirection === 'asc') ? 'desc' : 'asc';
    state.sortField = field; state.sortDirection = newDirection; savePreferences();
    state.currentPage = 1; applyFiltersAndSearch();
}

// --- UI Rendering ---
function renderCardView(pageData) { /* ... (Use the previous correct version) ... */
     if (!elements.cardView) return;
     elements.cardView.innerHTML = '';
     pageData.forEach(item => {
         const card = document.createElement('div'); card.className = 'card';
         const firstCategory = item.category?.[0]; const categoryText = Array.isArray(item.category) ? item.category.join(', ') : 'General';
         const domainIcon = getDomainIcon(firstCategory); card.title = `${domainIcon} ${categoryText}: ${item.title || 'Untitled'}`;
         const header = document.createElement('div'); header.className = 'card-header';
         header.innerHTML = `<h3 class="card-title"><span class="domain-icon">${domainIcon}</span><span style="flex-grow: 1;">${item.title || 'Untitled'}</span><div style="flex-shrink: 0;">${item.new_updated?.includes('New') ? '<span class="tag tag-new">New</span>' : ''}${item.new_updated?.includes('Updated') ? '<span class="tag tag-updated">Updated</span>' : ''}</div></h3>`;
         card.appendChild(header);
         const content = document.createElement('div'); content.className = 'card-content';
         const descriptionText = Array.isArray(item.description) ? item.description.join(' ') : item.description;
         if (descriptionText) { const descP = document.createElement('p'); descP.className = 'card-description'; descP.textContent = formatDisplayValue(descriptionText); descP.title = String(descriptionText).replace(/(\r\n|\n|\r)/gm, " ").trim(); content.appendChild(descP); }
         const meta = document.createElement('div'); meta.className = 'card-meta';
         const metaFields = [ { label: 'Theme', field: 'theme' }, { label: 'Group', field: 'group' }, { label: 'Source', field: 'source' }]; let metaHasContent = false;
         metaFields.forEach(mf => { const values = item[mf.field]; if (Array.isArray(values) && values.length > 0) { values.forEach(singleValue => { const metaItem = document.createElement('div'); metaItem.className = 'card-meta-item'; metaItem.innerHTML = `<strong>${mf.label}:</strong> ${formatDisplayValue(singleValue)}`; meta.appendChild(metaItem); metaHasContent = true; }); } });
         if (metaHasContent) content.appendChild(meta);
         const biUpdate = item.bi_next_update?.[0]; const dsUpdate = item.dataset_next_update?.[0];
         if (biUpdate || dsUpdate) { const updateInfo = document.createElement('div'); updateInfo.className = 'update-info card-meta-item'; let updateText = []; if (biUpdate) updateText.push(`BI: ${formatDisplayValue(biUpdate)}`); if (dsUpdate) updateText.push(`Dataset: ${formatDisplayValue(dsUpdate)}`); updateInfo.innerHTML = `<strong>Updates:</strong> ${updateText.join(' | ')}`; content.appendChild(updateInfo); }
         card.appendChild(content);
         const footer = document.createElement('div'); footer.className = 'card-footer'; let footerContentHTML = '';
         if (item.link) { footerContentHTML += `<a href="${item.link}" class="report-link" target="_blank" rel="noopener noreferrer" title="Open: ${item.title || 'link'}">Open Report</a>`; }
         if (item.detailData?.hasDetails === true && item.id) { footerContentHTML += `<a href="detail.html?report=${item.id}" class="report-link detail-link" title="View details for: ${item.title || 'item'}">View Details</a>`; }
         const accessInfo = item.access?.[0]; if (accessInfo) { footerContentHTML += `<span style="margin-left: auto;">Access: ${formatDisplayValue(accessInfo)}</span>`; }
         if (footerContentHTML) { footer.innerHTML = footerContentHTML; card.appendChild(footer); }
         elements.cardView.appendChild(card);
     });
}

function renderTableHeader() { /* ... (Use previous correct version) ... */
     if (!elements.resultsThead) return; elements.resultsThead.innerHTML = '';
     const tr = document.createElement('tr');
     config.tableFields.forEach(fieldConfig => { const th = document.createElement('th'); th.textContent = fieldConfig.display; th.dataset.field = fieldConfig.field; if (fieldConfig.sortable) { th.classList.add('sortable'); th.removeEventListener('click', handleSortClick); th.addEventListener('click', handleSortClick); } tr.appendChild(th); });
     elements.resultsThead.appendChild(tr); updateSortIndicators();
}
function handleSortClick(event) { const field = event.currentTarget.dataset.field; handleSort(field); } // Named handler

function updateSortIndicators() { /* ... (Use previous correct version) ... */
     if (!elements.resultsThead) return; elements.resultsThead.querySelectorAll('th.sortable').forEach(th => { th.classList.remove('sort-asc', 'sort-desc'); if (th.dataset.field === state.sortField) { th.classList.add(state.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc'); } });
}
function calculatePagination() { /* ... (Use previous correct version) ... */
    if (!state.filteredData) return; const totalItems = state.filteredData.length; state.totalPages = Math.max(1, Math.ceil(totalItems / config.pageSize)); if (state.currentPage > state.totalPages) state.currentPage = 1; else if (state.currentPage < 1 && state.totalPages > 0) state.currentPage = 1; else if (state.totalPages === 0) state.currentPage = 1; renderPagination();
}
function renderPagination() { /* ... (Use previous correct version) ... */
     if (!elements.pagination) return; elements.pagination.innerHTML = ''; if (state.totalPages <= 1) { elements.pagination.style.display = 'none'; return; } elements.pagination.style.display = 'flex';
     const createButton = (text, pageNum, isDisabled = false, isActive = false) => { const btn = document.createElement('button'); btn.className = 'page-btn'; btn.innerHTML = text; btn.disabled = isDisabled; if (isActive) btn.classList.add('active'); btn.removeEventListener('click', handlePageClick); btn.pageNumber = pageNum; btn.addEventListener('click', handlePageClick); return btn; };
     elements.pagination.appendChild(createButton('&laquo;', state.currentPage - 1, state.currentPage === 1)); const maxButtons = 5; let startPage, endPage; if (state.totalPages <= maxButtons) { startPage = 1; endPage = state.totalPages; } else { const mid = Math.floor(maxButtons / 2); if (state.currentPage <= mid + 1) { startPage = 1; endPage = maxButtons; } else if (state.currentPage >= state.totalPages - mid) { startPage = state.totalPages - maxButtons + 1; endPage = state.totalPages; } else { startPage = state.currentPage - mid; endPage = state.currentPage + mid; } }
     if (startPage > 1) { elements.pagination.appendChild(createButton('1', 1)); if (startPage > 2) elements.pagination.appendChild(document.createElement('span')).textContent = '...'; } for (let i = startPage; i <= endPage; i++) { elements.pagination.appendChild(createButton(i, i, false, i === state.currentPage)); } if (endPage < state.totalPages) { if (endPage < state.totalPages - 1) elements.pagination.appendChild(document.createElement('span')).textContent = '...'; elements.pagination.appendChild(createButton(state.totalPages, state.totalPages)); } elements.pagination.appendChild(createButton('&raquo;', state.currentPage + 1, state.currentPage === state.totalPages));
}
function handlePageClick(event) { /* ... (Use previous correct version) ... */
     const pageNum = event.currentTarget.pageNumber; if (state.currentPage !== pageNum) { state.currentPage = pageNum; renderResults(); renderPagination(); scrollToTop(); }
}
function renderResults() { /* ... (Use previous correct version) ... */
     if (!elements.resultsBody || !elements.cardView) return; const start = (state.currentPage - 1) * config.pageSize; const end = start + config.pageSize; const pageData = Array.isArray(state.filteredData) ? state.filteredData.slice(start, end) : []; const hasResults = pageData.length > 0; const tvC = elements.tableView; const cvC = elements.cardView; const tE = elements.resultsTable; const nrtM = elements.noResultsTable; const nrcM = elements.noResultsCard; if (state.view === 'table') { if (tvC) tvC.style.display = 'block'; if (cvC) cvC.style.display = 'none'; renderTableView(pageData); if (nrtM) nrtM.style.display = hasResults ? 'none' : 'block'; if (tE) tE.style.display = hasResults ? 'table' : 'none'; } else { if (tvC) tvC.style.display = 'none'; if (cvC) cvC.style.display = hasResults ? 'grid' : 'block'; renderCardView(pageData); if (nrcM) nrcM.style.display = hasResults ? 'none' : 'block'; if (!hasResults && cvC) { cvC.innerHTML = ''; if (nrcM) { nrcM.style.display = 'block'; cvC.appendChild(nrcM.cloneNode(true)); } else { cvC.innerHTML = '<div class="no-results">No matching records found</div>';} cvC.style.display = 'block'; } }
}
function renderTableView(pageData) { /* ... (Use previous correct version) ... */
     if (!elements.resultsBody) return; elements.resultsBody.innerHTML = ''; pageData.forEach(item => { const row = document.createElement('tr'); config.tableFields.forEach(fieldConfig => { const cell = document.createElement('td'); const value = item[fieldConfig.field]; cell.dataset.label = fieldConfig.display; const displayValue = formatDisplayValue(value); if (fieldConfig.linkField && fieldConfig.field === 'title') { const linkUrl = item[fieldConfig.linkField]; if (linkUrl) { cell.innerHTML = `<a href="${linkUrl}" class="report-link" target="_blank" rel="noopener noreferrer" title="${item._icon || ''} Open report: ${displayValue}">${displayValue}</a>`; if (item.new_updated?.includes('New')) cell.innerHTML += ' <span class="tag tag-new">New</span>'; if (item.new_updated?.includes('Updated')) cell.innerHTML += ' <span class="tag tag-updated">Updated</span>'; } else { cell.textContent = displayValue; if (item.new_updated?.includes('New')) cell.innerHTML += ' <span class="tag tag-new">New</span>'; if (item.new_updated?.includes('Updated')) cell.innerHTML += ' <span class="tag tag-updated">Updated</span>'; } } else if (fieldConfig.field === 'new_updated') { cell.innerHTML = ''; if (value?.includes('New')) cell.innerHTML += '<span class="tag tag-new">New</span> '; if (value?.includes('Updated')) cell.innerHTML += '<span class="tag tag-updated">Updated</span>'; if (!cell.innerHTML.trim()) cell.textContent = 'N/A'; } else { cell.textContent = displayValue; } const tooltipValue = Array.isArray(value) ? value.join(', ') : String(value ?? ''); if (tooltipValue.length > 50 || tooltipValue.includes('\n')) { cell.title = tooltipValue.replace(/(\r\n|\n|\r)/gm, " ").trim(); } row.appendChild(cell); }); elements.resultsBody.appendChild(row); });
}
function updateDataStats() { /* ... (Use previous correct version) ... */
     if (!elements.dataStats) return; const total = state.data?.length ?? 0; const filtered = state.filteredData?.length ?? 0; const start = filtered > 0 ? (state.currentPage - 1) * config.pageSize + 1 : 0; const end = Math.min(start + config.pageSize - 1, filtered); if (filtered === 0) elements.dataStats.textContent = `Showing 0 of ${total} records.`; else if (total === filtered) elements.dataStats.textContent = `Showing ${start}-${end} of ${total} records.`; else elements.dataStats.textContent = `Showing ${start}-${end} of ${filtered} filtered records (Total: ${total}).`;
}
function showLoading(show) { /* ... (Use previous correct version) ... */
     if (elements.loadingIndicator) elements.loadingIndicator.className = show ? 'loading visible' : 'loading'; const pC = document.getElementById('portalContent'); if (pC) { pC.style.opacity = show ? 0.5 : 1; pC.style.pointerEvents = show ? 'none' : 'auto'; }
}
function scrollToTop() { /* ... (Use previous correct version) ... */
     const mainContainer = document.querySelector('main.container'); mainContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function switchView(viewName) { /* ... (Use previous correct version) ... */
     if (state.view === viewName || !elements.tableView || !elements.cardView || !elements.tableViewBtn || !elements.cardViewBtn) return; state.view = viewName; state.currentPage = 1; savePreferences(); if (viewName === 'table') { elements.tableView.style.display = 'block'; elements.cardView.style.display = 'none'; elements.tableViewBtn.classList.add('active'); elements.cardViewBtn.classList.remove('active'); } else { elements.tableView.style.display = 'none'; elements.cardView.style.display = 'grid'; elements.tableViewBtn.classList.remove('active'); elements.cardViewBtn.classList.add('active'); } calculatePagination(); renderResults(); updateDataStats();
}
function toggleFiltersPanel() { /* ... (Use previous correct version) ... */
     if (!elements.filtersPanel || !elements.toggleFilters) return; const isExpanded = elements.filtersPanel.classList.toggle('expanded'); elements.toggleFilters.textContent = isExpanded ? 'Hide Filters' : 'Show Filters';
}
function savePreferences() { /* ... (Use previous correct version) ... */
     localStorage.setItem('portalView', state.view); localStorage.setItem('portalSortField', state.sortField); localStorage.setItem('portalSortDirection', state.sortDirection);
}
function loadPreferences() { /* ... (Use previous correct version) ... */
     const savedView = localStorage.getItem('portalView'); const savedSortField = localStorage.getItem('portalSortField'); const savedSortDirection = localStorage.getItem('portalSortDirection'); state.view = (savedView && ['table', 'card'].includes(savedView)) ? savedView : 'table'; state.sortField = (savedSortField && config.tableFields.some(f => f.field === savedSortField && f.sortable)) ? savedSortField : config.defaultSortField; state.sortDirection = (savedSortDirection && ['asc', 'desc'].includes(savedSortDirection)) ? savedSortDirection : config.defaultSortDirection; if (elements.tableViewBtn && elements.cardViewBtn) { if (state.view === 'table') { elements.tableViewBtn.classList.add('active'); elements.cardViewBtn.classList.remove('active'); } else { elements.tableViewBtn.classList.remove('active'); elements.cardViewBtn.classList.add('active'); } }
}

// --- Event Listeners Setup ---
let portalListenersAttached = false;
function setupPortalEventListeners() {
     if (portalListenersAttached) return;
     console.log("Setting up portal event listeners...");
     if (!elements.searchInput || !elements.tableViewBtn || !elements.cardViewBtn || !elements.toggleFilters || !elements.clearFiltersBtn || !elements.logoutBtn) { console.error("Portal elements missing for listeners."); return; }
     elements.searchInput.removeEventListener('input', handleSearchInput); // Remove first
     elements.tableViewBtn.removeEventListener('click', handleTableViewClick);
     elements.cardViewBtn.removeEventListener('click', handleCardViewClick);
     elements.toggleFilters.removeEventListener('click', toggleFiltersPanel);
     elements.clearFiltersBtn.removeEventListener('click', clearAllFilters);
     elements.searchInput.addEventListener('input', handleSearchInput);
     elements.tableViewBtn.addEventListener('click', handleTableViewClick);
     elements.cardViewBtn.addEventListener('click', handleCardViewClick);
     elements.toggleFilters.addEventListener('click', toggleFiltersPanel);
     elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
     if (!elements.logoutBtn.getAttribute('listener-attached')) { elements.logoutBtn.addEventListener('click', handleLogout); elements.logoutBtn.setAttribute('listener-attached', 'true'); }
     portalListenersAttached = true;
     console.log("Portal listeners attached.");
}
function removePortalEventListeners() { // Function to explicitly remove listeners on logout/error
     console.log("Removing portal event listeners...");
     elements.searchInput?.removeEventListener('input', handleSearchInput);
     elements.tableViewBtn?.removeEventListener('click', handleTableViewClick);
     elements.cardViewBtn?.removeEventListener('click', handleCardViewClick);
     elements.toggleFilters?.removeEventListener('click', toggleFiltersPanel);
     elements.clearFiltersBtn?.removeEventListener('click', clearAllFilters);
     // Remove dynamically added listeners
     elements.resultsThead?.querySelectorAll('.sortable').forEach(th => th.removeEventListener('click', handleSortClick));
     elements.pagination?.querySelectorAll('.page-btn').forEach(btn => btn.removeEventListener('click', handlePageClick));
     document.querySelectorAll('.filter-checkbox').forEach(cb => cb.removeEventListener('change', handleFilterChange));
     portalListenersAttached = false; // Reset flag
}

// --- Event Handlers ---
function handleSearchInput(e) { /* ... (Use previous correct version) ... */
     clearTimeout(state.searchTimeout); state.searchTimeout = setTimeout(() => { state.searchTerm = e.target.value.trim(); state.currentPage = 1; applyFiltersAndSearch(); }, config.searchDebounceTime);
}
function handleTableViewClick() { switchView('table'); }
function handleCardViewClick() { switchView('card'); }

// Utility function to show errors
function showError(message) {
     console.error("Application Error:", message);
     if (elements.dataStats) {
         elements.dataStats.textContent = `Error: ${message}`;
         elements.dataStats.style.color = 'var(--danger)';
         elements.dataStats.style.fontWeight = 'bold';
     }
}

// --- Application Entry Point ---
document.addEventListener('DOMContentLoaded', checkLoginState);