// Import Express and user routes, create an instance of Express
const express = require('express');
const routes = require('./routes/users.js');
const app = express();
const PORT = 8080;

// Use JSON parsing middleware and user routes
app.use(express.json()); //parses any incoming JSON request bodies and makes the data available in req.body.
app.use("/mebro", routes); // mounts a router or a group of routes on the /user path. and "routes is file that you may create and having route/s"
// Start the server and log a message when it's running
app.listen(PORT, () => console.log("Server is running at port " + PORT));
