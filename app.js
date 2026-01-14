const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

// Middleware to get client IP
app.use((req, res, next) => {
    req.clientIP = req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null);
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    const response = {
        message: `Welcome to Multi-Environment Demo Application!`,
        environment: ENVIRONMENT,
        clientIP: req.clientIP,
        timestamp: new Date().toISOString(),
        serverInfo: {
            nodeVersion: process.version,
            platform: process.platform,
            uptime: process.uptime()
        }
    };
    
    res.json(response);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        environment: ENVIRONMENT,
        timestamp: new Date().toISOString()
    });
});

// IP endpoint
app.get('/ip', (req, res) => {
    res.json({
        clientIP: req.clientIP,
        environment: ENVIRONMENT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 Environment: ${ENVIRONMENT}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});
