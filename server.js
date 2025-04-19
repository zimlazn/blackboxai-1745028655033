const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// In-memory store for tracking data
const trackingData = {};

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to create a new tracking link
app.post('/api/create-link', (req, res) => {
  const id = uuidv4();
  trackingData[id] = {
    createdAt: new Date(),
    visits: []
  };
  res.json({ trackingLink: `${req.protocol}://${req.get('host')}/track/${id}` });
});

// Endpoint to serve tracking link and log visitor location
app.get('/track/:id', async (req, res) => {
  const id = req.params.id;
  if (!trackingData[id]) {
    return res.status(404).send('Tracking link not found');
  }

  // Get visitor IP address
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Use free IP geolocation API to get location info
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();

    trackingData[id].visits.push({
      timestamp: new Date(),
      ip,
      location: {
        city: geoData.city,
        region: geoData.region,
        country: geoData.country_name,
        latitude: geoData.latitude,
        longitude: geoData.longitude
      }
    });
  } catch (error) {
    trackingData[id].visits.push({
      timestamp: new Date(),
      ip,
      location: null,
      error: 'Failed to get location'
    });
  }

  // Redirect to a simple page or external URL after tracking
  res.sendFile(path.join(__dirname, 'public', 'tracked.html'));
});

// Endpoint to get tracking data for a link
app.get('/api/tracking-data/:id', (req, res) => {
  const id = req.params.id;
  if (!trackingData[id]) {
    return res.status(404).json({ error: 'Tracking link not found' });
  }
  res.json(trackingData[id]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
