// Express app entry point
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Enable CORS for all origins
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Custom format cho morgan log
morgan.token("client-ip", (req) => {
    return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
});
morgan.token("custom-date", () => {
    return new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
});

// Logging middleware với format tùy chỉnh
app.use(morgan(":custom-date [IP: :client-ip] :method :url :status :res[content-length] - :response-time ms"));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", routes);

// Serve React app for any other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
