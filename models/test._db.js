import { Book } from "./models/book.js";

// return all records
Book.find({}).lean()
  .then((books) => {
    console.log(books);
  })
  .catch(err => console.log(err));