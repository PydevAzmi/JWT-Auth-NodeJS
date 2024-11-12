const http = require('http');
const dotenv = require('dotenv');
require('./src/config/dbConnect').connect();
const express = require('express');

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const port = process.env.NODE_PORT || 8000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});