import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;

// Serve static files from the dist directory
app.use(express.static(path.join(path.resolve(), 'dist')));

// API route
app.get('/api/stats/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video stats' });
    }

});

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