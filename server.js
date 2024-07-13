const express = require("express"); // Import the Express framework
const dotenv = require("dotenv"); // Import the dotenv module for environment variable management
const colors = require("colors"); // Import the colors module for console output styling
const morgan = require("morgan"); // Import the morgan module for HTTP request logging
const cors = require("cors"); // Import the cors module for enabling Cross-Origin Resource Sharing
const connectDB = require("./config/db");
const path=require("path");

// Load environment variables from a .env file into process.env
dotenv.config();
// connect to database

connectDB();


// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // This allows the server to parse JSON payloads in requests

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors()); // This enables CORS, allowing the server to handle requests from different origins

// Middleware for HTTP request logging in 'dev' format
app.use(morgan("dev")); // This logs HTTP requests to the console, showing the method and URL of the request

// Routes
// Test route for API version 1
app.use("/api/v1/test", require("./routes/testRoutes")); // This sets up a route for testing API endpoints
app.use("/api/v1/auth", require("./routes/authRoutes"));

app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));

app.use("/api/v1/admin", require("./routes/adminRoutes"));


//static folder

app.use(express.static(path.join(__dirname,"./client/build")));

//static route

app.get("*",function(req,res){
   res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

// Define the port the server will listen on
const PORT = process.env.PORT || 8080; // The port is taken from environment variables or defaults to 8080

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue.white // Logs a message to the console indicating the server is running
  );
});
