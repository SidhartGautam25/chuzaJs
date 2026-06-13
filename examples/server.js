import { createServer } from "../package/index.js";

const app = createServer();

// HTML Response
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ChuzaJS! 🐤</h1><p>A simple, pure library designed for educational purposes.</p>");
});

// JSON Response with dynamic route params and query params
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const searchFilter = req.query.filter || "none";
  res.json({
    userId,
    filter: searchFilter,
    success: true,
    message: `Fetched user data for ID: ${userId}`
  });
});

// Post Request returning JSON
app.post("/users", (req, res) => {
  res.status(201).json({
    message: "User successfully created (mocked)"
  });
});

// Redirection example
app.get("/old-path", (req, res) => {
  res.redirect("/");
});

// Error handling test route
app.get("/trigger-error", (req, res) => {
  throw new Error("Something went wrong!");
});

const PORT = 3000;
app.runServerOn(PORT, () => {
  console.log(`🐤 ChuzaJS example server running on http://localhost:${PORT}`);
});
