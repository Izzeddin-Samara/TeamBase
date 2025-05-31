const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userroutes"); // Import user routes
const employeeRoutes = require("./routes/employeeroutes");

require("./config/db"); // Connects to MongoDB

const app = express();

app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows JSON parsing

app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

// Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
