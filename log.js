// Function to display logs
function displayLogs() {
    const logContainer = document.getElementById('log');
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logContainer.innerHTML = logs.map(log => `<p>${log}</p>`).join('');
}

// Function to add a log entry
function addLog(entry) {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push(entry);
    localStorage.setItem('logs', JSON.stringify(logs));
    displayLogs();
    updateChart();
}

// Function to clear logs
function clearLogs() {
    localStorage.removeItem('logs');
    displayLogs();
    updateChart(true);
}

// Simulate incoming requests for demonstration
function simulateIncomingRequests() {
    setInterval(() => {
        const timestamp = new Date().toLocaleString();
        addLog(`Request received at ${timestamp}`);
    }, 5000); // Simulate a request every 5 seconds
}

// Initialize logs on page load
document.addEventListener('DOMContentLoaded', () => {
    displayLogs();
    simulateIncomingRequests();
    initializeChart();
});

// Chart.js setup
let requestChart;
function initializeChart() {
    const ctx = document.getElementById('requestChart').getContext('2d');
    requestChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Requests Over Time',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Requests'
                    }
                }
            }
        }
    });
}

// Update the chart with new data
function updateChart(clear = false) {
    if (clear) {
        requestChart.data.labels = [];
        requestChart.data.datasets[0].data = [];
    } else {
        const timestamp = new Date();
        if (requestChart.data.labels.length > 20) {
            requestChart.data.labels.shift();
            requestChart.data.datasets[0].data.shift();
        }
        requestChart.data.labels.push(timestamp);
        requestChart.data.datasets[0].data.push(1);
    }
    requestChart.update();
}
