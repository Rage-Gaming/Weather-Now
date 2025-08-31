const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');

// Route imports

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './build')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

// Error handling middleware
// app.use(errorHandler);

module.exports = app;