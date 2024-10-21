require("dotenv").config();


console.log(process.env.MONGO_URL);
const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const {MONGO_URL} = require("./config")

const app = express();

app.use(express.json());



mongoose.connect(MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
 .then(()=>{
  console.log("Connected to MongoDB successfully")
 })
 .catch((e)=>{
  console.log( `Error is ${e.message}`)
 });


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Listenining on Port ${PORT}`);
});
