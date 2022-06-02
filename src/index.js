// const express = require("express");
// const app = express();
// const port = 3000;
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
// const connect = process.env.DB_LOCALCONNECTION;
const url = process.env.DB_REMOTTE;

const quizSchema = new mongoose.Schema({
  Frage: String,
  antwort: Array,
  correct: Number,
});
const Quiz = mongoose.model("QuizApp", quizSchema, "quizquestions");
const getQuestions = async () => {
  return await Quiz.find().exec();
};

const newPlayer = new mongoose.Schema({
  Name: String,
});
const Player = mongoose.model("Users", newPlayer, "users");

const addNewPlayer = async () => {
  return await Player.find().exec();
};

app.get("/", async (req, res) => {
  try {
    const data = await getQuestions();
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
});
app.post("/addplayer", async (req, res) => {
  // res.header("Access-Control-Allow-Methods", "POST");
  // console.log(req);
  console.log(req.body);
  try {
    const newGamer = new Player({
      ...req.body,
    });
    const newSpieler = await newGamer.save();
    res.json(newSpieler);
  } catch (err) {
    res.json({ err: err.message });
  }
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
mongoose.connect(url).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
