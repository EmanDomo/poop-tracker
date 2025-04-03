const express = require("express");
const app = express();
const cors = require("cors");

require('./routes/conn');
const loginrouter = require('./routes/login');

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

app.use(cors(corsOptions)); // Move this line above the routes
app.use(express.json());
app.use(loginrouter);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
