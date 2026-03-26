const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Schema
const formSchema = new mongoose.Schema({
  name: String,
  problem: String
});

const Form = mongoose.model("Form", formSchema);

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.post("/api/form", async (req, res) => {
  try {
    const newData = new Form(req.body);
    await newData.save();
    res.send("Data saved");
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).send("Error saving data");
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await Form.find();
    res.json(data);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).send("Error fetching data");
  }
});

// ✅ PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 8000;

// ✅ DB CONNECT + SERVER START
mongoose.connect(
  "mongodb+srv://testuser:test123@cluster0.mcrasvj.mongodb.net/healthcare?retryWrites=true&w=majority"
)
.then(() => {
  console.log("✅ DB connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
})
.catch(err => {
  console.log("❌ DB ERROR:", err);
});