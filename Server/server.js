const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userroutes"); // Import user routes
const employeeRoutes = require("./routes/employeeroutes");
const session = require("express-session");

require("./config/db"); // Connects to MongoDB

const app = express();

app.use(
  cors({
    origin: "https://team-base-dd23.vercel.app",
    credentials: true, //
  })
);

app.use(express.json()); // Allows JSON parsing

const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      httpOnly: true,
      sameSite: "None",
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

// Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
