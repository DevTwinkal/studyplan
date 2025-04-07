const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "study"
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// Route to redirect to the index page
app.get("/", (req, res) => {
  res.redirect("index");
});

// Signup Route
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Check if email already exists
  db.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length > 0) {
      // Email already exists
      return res.json({ error: "Email already exists" });
    }

    // Insert new user into the database
    db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Database insert failed" });
        }

        // Redirect to the login page after successful signup
        res.redirect('login.html');

      }
    );
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      // If email does not exist
      return res.status(400).json({ error: "Incorrect Email and Password" });
     
    }
    const user = results[0];
    if (user.password !== password) {
      // If the passwords do not match
      return res.status(400).json({ error: "Incorrect email and password" });
    }
    res.redirect('dashboard.html');
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
