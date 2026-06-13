<div align="center">
  <h1>ChuzaJS 🐤</h1>
  <img src="./chuzaJs.png" alt="ChuzaJS Logo" width="400" />
  <p><strong>A minimal, pure, and educational web server library for Node.js</strong></p>
</div>

---

## 🎯 Purpose & Philosophy

**ChuzaJS** was created strictly as an **educational project** to learn how to build a simple web server library from scratch in Node.js. 

It is **NOT** meant to be used for developing production applications.

Unlike modern, production-grade frameworks (like Express, Koa, or Fastify) which leverage complex design patterns, highly optimized routing algorithms (like Radix Trees), and heavy abstraction layers, **ChuzaJS is built with pure, simple, and readable Javascript**. 

By studying this codebase, you can easily understand:
- How incoming HTTP requests are received and routed.
- How request objects are decorated with helper properties (e.g., `req.query`, `req.params`).
- How response objects are decorated with helper methods (e.g., `res.send()`, `res.json()`, `res.redirect()`).
- How dynamic URL matching works under the hood using regex patterns.

---

## 📦 Installation & Setup

You can install the published package directly from npm:

```bash
npm install chuza-js
```

---

## 🚀 Quick Start Example

Here is a simple example demonstrating how to create a server, define routes, parse route and query parameters, and handle redirects:

```javascript
import { createServer } from "chuza-js";

// Initialize the ChuzaJS server instance
const app = createServer();

// 1. Serving HTML Content
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ChuzaJS! 🐤</h1>");
});

// 2. Serving JSON and parsing parameters
// Matches routes like /users/42?filter=active
app.get("/users/:id", (req, res) => {
  res.json({
    userId: req.params.id,
    filter: req.query.filter || "none",
    success: true
  });
});

// 3. Handling POST requests
app.post("/users", (req, res) => {
  res.status(201).json({
    message: "User successfully created!"
  });
});

// 4. Redirecting Requests
app.get("/old-link", (req, res) => {
  res.redirect("/");
});

// Start listening on port 3000
app.runServerOn(3000, () => {
  console.log("🐤 ChuzaJS server running on http://localhost:3000");
});
```

### Explanation of the Example:
- **`createServer()`**: Instantiates a new server object containing router, request decorator, response decorator, and request handler instances.
- **`app.get(path, handler)` / `app.post(path, handler)`**: Registers routes mapped to specific HTTP methods. Path parsing supports Express-style dynamic parameters (e.g., `:id`).
- **`req.params` & `req.query`**: Automatically populated with route path params and query string parameters.
- **`res.send(body)` / `res.json(obj)`**: Automatically sets standard headers like `Content-Type` and `Content-Length` before ending the response writer.
- **`res.redirect(url)`**: Sends a `302 Found` response directing the client to another URL.

---

## 🛠️ Internal Architecture

ChuzaJS divides its responsibilities into small, focused modules:
1. **`lib/server.js`**: Orchestrates the server lifecycle, routing registrations, and the standard Node.js `http.createServer` lifecycle.
2. **`lib/router.js`**: Manages route registrations and performs URL matching using `regexparam`.
3. **`lib/request.js`**: Decorates incoming requests with `path`, `query`, and initializes `params`.
4. **`lib/response.js`**: Decorates standard responses with `status()`, `json()`, `send()`, and `redirect()` helpers.
5. **`lib/handler.js`**: Hooks into Node's server loop to orchestrate decoration, route finding, parameter injection, and request execution.
