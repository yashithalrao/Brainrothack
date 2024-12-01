const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const challengeRoutes = require("./routes/challengesRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express(); 
const PORT = 5000; 

app.use(express.json()); 
app.use(cors()); 

mongoose
  .connect("mongodb://127.0.0.1:27017/alphaChallenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


app.use('/challenges', challengeRoutes)
app.use('/users', userRoutes); 

app.listen(PORT, ()=>console.log("yes"))








