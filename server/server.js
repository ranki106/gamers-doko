import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;

// Serve static files from the dist directory
app.use(express.static(path.join(path.resolve(), 'dist')));

// Fallback route for all other requests
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.resolve('dist', 'index.html'));
    } else {
        next();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});