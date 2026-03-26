const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb+srv://pankaj1504:bNhHtTeOCgYry5Tz@cluster0.kx4xufy.mongodb.net/healthcare")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// ✅ Schema
const formSchema = new mongoose.Schema({
  name: String,
  problem: String
});

const Form = mongoose.model("Form", formSchema);

// ✅ API - save data
app.post("/api/form", async (req, res) => {
  try {
    const newData = new Form(req.body);
    await newData.save();
    res.send("Data saved");
  } catch (err) {
    res.send(err);
  }
});

// ✅ API - get data
app.get("/api/data", async (req, res) => {
  const data = await Form.find();
  res.json(data);
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});