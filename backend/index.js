import express from "express";
import environment from "./environment.ts";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors());
 

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome");
});

app.use("/books", booksRoute);

// connection with DB
mongoose
  .connect(environment.mongodbURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(environment.port, () => {
      console.log(`App listening to port ${environment.port}`);
    });
  })
  .catch((error) => {
    console.log("Issues in DB connection");
  });
