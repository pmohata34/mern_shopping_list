const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const item = require('./routes/api/items'); // Import the Item route

const app = express();

// Body parser middleware
// app.use(bodyParser.json());
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Log all route files in ./routes/api
console.log('📂 Listing API route files:');
fs.readdirSync('./routes/api').forEach(file => {
  console.log('🔹 Found route file:', file);
});

// Use Routes
console.log('🔍 Router type:', typeof item);
console.log('🔍 Router loaded with keys:', Object.keys(item));
app.use('/api/items', item);
console.log('✅ Registered: /api/items');

// Log registered Express routes
if (app._router && app._router.stack) {
  app._router.stack.forEach(layer => {
    if (layer.route && layer.route.path) {
      console.log('🚦 Route registered:', layer.route.path);
    }
  });
}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    console.log('🧭 Wildcard route hit:', req.originalUrl);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));