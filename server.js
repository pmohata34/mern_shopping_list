const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const item = require('./routes/api/items'); // Import the Item model

const app = express();

//Body parser middleware
app.use(bodyParser.json());
app.use(express.json());
//DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Use Routes
app.use('/api/items', item);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// Serve the React app
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
