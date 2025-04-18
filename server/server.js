const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Fallback route for all other requests
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    } else {
        next();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

