document.getElementById("viewLogs").addEventListener("click", () => {
    fetch('/logs')
        .then(response => response.json())
        .then(data => {
            const logsContainer = document.getElementById("logsContainer");
            logsContainer.innerHTML = "<h3>Logs:</h3>";
            logsContainer.innerHTML += data.logs.length
                ? `<ul>${data.logs.map(log => `<li>${log}</li>`).join('')}</ul>`
                : "<p>No logs available.</p>";
        })
        .catch(error => console.error("Error fetching logs:", error));
});
