import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"

import cors from "cors"

const app = express();

// middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors())

//allow custom origins
// app.use(
//   cors({
//     origin:'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome");
});


app.use('/books', booksRoute)

// connection with DB
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Issues in DB connection");
  });
 