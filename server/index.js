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
  res.send("API is running 🚀");
});

app.post("/api/form", async (req, res) => {
  try {
    const newData = new Form(req.body);
    await newData.save();
    res.send("Data saved");
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).send(err.message);
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await Form.find();
    res.json(data);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).send(err.message);
  }
});

// ✅ PORT
const PORT = process.env.PORT || 8000;

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log("✅ DB connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
})
.catch(err => {
  console.log("❌ DB ERROR:", err);
});