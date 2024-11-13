const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
require('./src/config/dbConnect').connect();
const authRoutes = require('./src/routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/Public"));

// View engine
app.set('view engine', 'ejs');

// routes
app.use(authRoutes);

// Server
const server = http.createServer(app);
const port = process.env.NODE_PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});