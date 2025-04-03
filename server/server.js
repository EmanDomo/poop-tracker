const express = require("express");
const app = express();
const cors = require("cors");

// Your existing imports
require('./routes/conn');
const loginrouter = require('./routes/login');

// Updated CORS configuration
const whitelist = [
  'http://localhost:5173', // Local development
  'https://tangerine-paletas-13711e.netlify.app' // Your Netlify domain
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(loginrouter);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});