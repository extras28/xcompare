// Express app entry point
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const path = require("path");
const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
