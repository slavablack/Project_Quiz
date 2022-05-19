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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// mongoose.connect(url).then(() => {
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });
