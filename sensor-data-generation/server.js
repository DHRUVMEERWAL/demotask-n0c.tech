// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.production' });

const app = express();


const PORT = process.env.PORT2 || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Sensor Dashboard API is running.');
});

// Load Cron Job
require('./cron-job'); // This starts the cron job on server start

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
