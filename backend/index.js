import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome");
});

//route for saving a book
app.post("/books", async (request, response) => {
  console.log("Request Body:", request.body);
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route for get all books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get books by Id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const books = await Book.findById(id);

    return response.status(200).json(books);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});







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
