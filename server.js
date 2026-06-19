//require('dotenv').config({ path: __dirname + '/.env' });

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bookRoutes = require("./routes/books");

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

app.use(express.json());
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Online Bookstore API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});