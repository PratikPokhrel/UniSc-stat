// FILE: detail.js (Corrected renderTimeSeriesChart function)

// --- Configuration ---
const mainDataPath = 'navigation_v1.json'; // Correct path relative to detail.html

// --- DOM Elements ---
const elements = {
    title: document.getElementById('detailTitle'),
    description: document.getElementById('detailDescription'),
    echartsContainer: document.getElementById('echartsTimeSeriesContainer'),
    echartsChartDiv: document.getElementById('echartsTimeSeries'),
    barChartContainer: document.getElementById('barChartContainer'),
    barChartCanvas: document.getElementById('barChart'),
    detailsText: document.getElementById('detailsText'),
    detailContent: document.getElementById('detailContent'),
    detailError: document.getElementById('detailError')
};

let barChartInstance = null;
let echartsInstance = null;
let resizeHandler = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadReportDetails();
});

async function loadReportDetails() {
    const params = new URLSearchParams(window.location.search);
    const reportId = params.get('report');

    if (!reportId) {
        showError("No report ID specified in the URL.");
        return;
    }

    try {
        console.log(`Fetching main data from ${mainDataPath} to find report ${reportId}`);
        const response = await fetch(mainDataPath);
        if (!response.ok) throw new Error(`Failed to fetch portal data: ${response.status} ${response.statusText}`);
        const allReports = await response.json();
        if (!Array.isArray(allReports)) throw new Error("Portal data is not a valid array.");

        const reportData = allReports.find(item => item.id === reportId);
        if (!reportData) throw new Error(`Report with ID '${reportId}' not found.`);

        console.log("Found report data:", reportData);

        if (reportData.detailData?.hasDetails === true) {
            populateDetails(reportData.detailData, reportData);
            renderCharts(reportData.detailData);
        } else {
            console.log(`No embedded detailData for ${reportId}. Showing basic info.`);
            populateDetails({}, reportData);
            if (elements.echartsContainer) elements.echartsContainer.innerHTML = '<div class="chart-info">Time series chart not available.</div>';
            if (elements.barChartContainer) elements.barChartContainer.innerHTML = '<div class="chart-info">Bar chart not available.</div>';
            if (elements.detailsText) elements.detailsText.textContent = 'No further details provided.';
        }

    } catch (error) {
        console.error("Error loading report details:", error);
        showError(`Could not load details for report '${reportId}'. ${error.message}`);
    }
}

function populateDetails(detailData, mainReportData) {
    if (!elements.title || !elements.description || !elements.detailsText) return;
    elements.title.textContent = detailData?.detailTitle || mainReportData?.title || 'Report Details';
    elements.description.textContent = detailData?.detailDescription || mainReportData?.description || '';
    elements.detailsText.textContent = detailData?.detailsText || 'No additional details provided.';
}

function renderCharts(detailData) {
    renderTimeSeriesChart(detailData?.timeSeriesData);
    renderBarChart(detailData?.barChartData);
}

// --- ECharts Time Series Rendering ---
function renderTimeSeriesChart(timeSeriesData) {
    if (typeof echarts === 'undefined') {
         console.error('ECharts library is not loaded.'); if (elements.echartsChartDiv) elements.echartsChartDiv.innerHTML = '<div class="chart-error">Charting library failed to load.</div>'; return;
    }
     if (!elements.echartsChartDiv) { console.error('ECharts container element not found'); return; }
     if (!Array.isArray(timeSeriesData) || timeSeriesData.length < 2 || !Array.isArray(timeSeriesData[0])) {
        console.warn('Invalid/insufficient time series data for ECharts.'); elements.echartsChartDiv.innerHTML = '<div class="chart-info">No time series data available.</div>'; elements.echartsChartDiv.classList.remove('chart-loading'); return;
     }

    try {
        if (echartsInstance) echartsInstance.dispose();
        echartsInstance = echarts.init(elements.echartsChartDiv);
        elements.echartsChartDiv.classList.remove('chart-loading');

        const headers = timeSeriesData[0];
        const sourceData = timeSeriesData.slice(1);
        const formattedSource = sourceData.map(row => {
             if (!Array.isArray(row) || row.length !== headers.length) return null;
             // Ensure date is first, then numbers
             const dateVal = row[0]; // Keep as string for ECharts 'time' axis
             const seriesVals = row.slice(1).map(val => Number(val) || 0); // Convert rest to numbers
             return [dateVal, ...seriesVals];
        }).filter(Boolean);

        if (formattedSource.length === 0) throw new Error("No valid data points after formatting.");

        // --- FIX: Remove encode property when using dataset ---
        const seriesList = headers.slice(1).map((headerName) => ({
            name: headerName,
            type: 'line',
            smooth: true,
            areaStyle: {}
            // No 'encode' property here, dataset handles mapping
        }));
        // -----------------------------------------------------

        const option = {
            title: { text: 'EFTSL Time Series', subtext: 'Domestic vs. International' },
            tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
            legend: { data: headers.slice(1) },
            toolbox: { feature: { saveAsImage: {} } },
            grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true }, // Increased bottom for zoom
            xAxis: { type: 'time', boundaryGap: false },
            yAxis: { type: 'value', axisLabel: { formatter: '{value}' }, axisPointer: { snap: true } },
            dataset: { dimensions: headers, source: formattedSource }, // Map dimensions here
            series: seriesList, // Series refer to dataset implicitly
            dataZoom: [ { type: 'inside', start: 0, end: 100 }, { start: 0, end: 100 } ],
        };
        echartsInstance.setOption(option);

         if (resizeHandler) window.removeEventListener('resize', resizeHandler);
         resizeHandler = debounce(() => echartsInstance?.resize(), 150);
         window.addEventListener('resize', resizeHandler);

    } catch (error) {
        console.error("ECharts rendering error:", error);
        elements.echartsChartDiv.innerHTML = `<div class="chart-error">Error rendering chart: ${error.message}</div>`;
        elements.echartsChartDiv.classList.remove('chart-loading');
    }
}

// --- Chart.js Bar Chart Rendering ---
function renderBarChart(barChartData) {
    if (!elements.barChartCanvas || !barChartData || typeof barChartData !== 'object' || !barChartData.labels || !barChartData.datasets) {
        if (elements.barChartContainer) elements.barChartContainer.innerHTML = '<div class="chart-info">No valid bar chart data.</div>'; return;
    }
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded.'); if (elements.barChartContainer) elements.barChartContainer.innerHTML = '<div class="chart-error">Charting library failed.</div>'; return;
    }

    const ctx = elements.barChartCanvas.getContext('2d');
    if (barChartInstance) barChartInstance.destroy();

    try {
        elements.barChartCanvas.style.display = 'block';
        elements.barChartCanvas.classList.remove('chart-loading');
        barChartInstance = new Chart(ctx, {
            type: 'bar', data: barChartData,
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Headcount Enrolment by School (Most Recent Year)' },
                    legend: { display: barChartData.datasets.length > 1 },
                    tooltip: { callbacks: { label: function(context) { let label = context.dataset.label || ''; if (label) label += ': '; if (context.parsed.y !== null) label += context.parsed.y.toLocaleString(); return label; }}}
                },
                scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return value.toLocaleString(); } } } }
            }
        });
    } catch(error) {
        console.error("Chart.js rendering error:", error);
        if (elements.barChartContainer) elements.barChartContainer.innerHTML = '<div class="chart-error">Error rendering bar chart.</div>';
    }
}

// --- Error Handling ---
function showError(message) {
    if (elements.detailContent) elements.detailContent.style.display = 'none';
    if (elements.detailError) {
        elements.detailError.textContent = message;
        elements.detailError.style.display = 'block';
    }
}

// Simple Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout); timeout = setTimeout(later, wait);
    };
};