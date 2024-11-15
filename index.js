const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
require('./src/config/dbConnect').connect();
const authRoutes = require('./src/routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/Public"));
app.use(cookieParser())

// View engine
app.set('view engine', 'ejs');

// routes
app.use(authRoutes);

app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'pydevazmi', { maxAge: 5000, httpOnly: false });
    res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    const cookie = req.cookies.name;
    res.send(`Cookie value: ${cookie}`);
});

// Server
const server = http.createServer(app);
const port = process.env.NODE_PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});