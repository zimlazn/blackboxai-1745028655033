
Built by https://www.blackbox.ai

---

# Tracking Link Generator

## Project Overview

The Tracking Link Generator is a Node.js application that allows users to create tracking links to monitor visitor activity. This application generates unique tracking links for each user and logs visitor information, including IP addresses and geographic locations, using a third-party IP geolocation API. It is useful for applications requiring insights into user engagement and geographic distribution.

## Installation

To set up the Tracking Link Generator on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tracking-link-generator.git
   cd tracking-link-generator
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

Run the server with the following command:

```bash
node server.js
```

The application will start, and you can access it by navigating to `http://localhost:3000` in your web browser.

### API Endpoints

- **Create a Tracking Link**: Send a POST request to `/api/create-link` to generate a new tracking link.
- **Track Visits**: Access the link generated to log a visit and receive a redirection.
- **Get Tracking Data**: Send a GET request to `/api/tracking-data/:id` to retrieve visit data for a specific tracking ID.

### Example Requests

- **Create a link:**
  ```bash
  curl -X POST http://localhost:3000/api/create-link
  ```
  This will return:
  ```json
  {
    "trackingLink": "http://localhost:3000/track/unique_id"
  }
  ```

- **Get tracking data:**
  ```bash
  curl http://localhost:3000/api/tracking-data/unique_id
  ```

## Features

- Generate unique tracking links using UUIDs.
- Log visitor information including timestamps, IP addresses, and geographical locations.
- Simple web interface for creating and viewing tracking links.
- Serve static files for a user-friendly experience.

## Dependencies

This project relies on the following npm packages:

- `express`: A web framework for Node.js.
- `node-fetch`: A module to make HTTP requests.
- `uuid`: A library to generate unique IDs for tracking links.

You can find these listed in the `package.json` file:

```json
{
  "dependencies": {
    "express": "^5.1.0",
    "node-fetch": "^3.3.2",
    "uuid": "^11.1.0"
  }
}
```

## Project Structure

```plaintext
.
├── package.json       # Project manifest containing dependencies
├── package-lock.json  # Dependency tree
├── public             # Directory for static files
│   └── tracked.html   # HTML file served after logging a visit
└── server.js          # Main application file that runs the Express server
```

## Conclusion

The Tracking Link Generator is a simple yet powerful tool for monitoring visitor interactions. It is built using Express.js and can be easily extended with additional features based on your needs. Feel free to clone and contribute to the application!