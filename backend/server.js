const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./mockDatabase.json');
const { generateReport } = require('./interpretationEngine');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allows your React app (from a different port) to talk to this server
app.use(express.json());

// --- API ROUTES ---

// @route   GET /api/report/:id
// @desc    Get a personalized diet report by user ID
// @access  Public
app.get('/api/report/:id', (req, res) => {
  const { id } = req.params;
  const userData = db[id];

  if (!userData) {
    return res.status(404).json({ msg: 'Report ID not found. Please check the ID and try again.' });
  }

  // Use our engine to interpret the SNPs
  const interpretedTraits = generateReport(userData.snps);

  // Construct the final report object to send to the frontend
  const fullReport = {
    id: id,
    name: userData.name,
    generatedAt: new Date().toISOString(),
    traits: interpretedTraits,
  };

  res.json(fullReport);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});