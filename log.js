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
});
