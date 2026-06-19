require('dotenv').config({ path: __dirname + '/.env' });

const express = require("express");
const mongoose = require("mongoose");

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.use(express.json());

app.listen(5000, () => {
    console.log("Server running on port 5000");
});