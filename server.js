const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    const logEntry = `${req.ip} - ${new Date().toISOString()}\n`;
    fs.appendFile('visits.log', logEntry, (err) => {
        if (err) console.error('Failed to log visit:', err);
    });
    next();
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/logs', (req, res) => {
    fs.readFile('visits.log', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read logs' });
        res.json({ logs: data.split('\n').filter(line => line) });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
