const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.00hicxj.mongodb.net/transactionDB`,);
const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes
app.get("/",(req, res) => {
  res.sendFile(__dirname + "/public/index1.html");
});

app.post("/transactions", async (req, res) => {
  try{
    const { description, amount } = req.body;
    const newTransaction = new Transaction({ description, amount });
    await newTransaction.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
