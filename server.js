require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const logger = require("./middleware/logger");
const bookRoutes = require("./routes/books");

console.log("logger =", logger);
console.log("bookRoutes =", bookRoutes);
console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/books", bookRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});