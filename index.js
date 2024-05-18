import express from "express";
import * as data from "./data.js";
import { Book } from "./models/book.js";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json()); //Used to parse JSON bodies


// app.set('view engine', 'ejs'); // Duplicate of line 8 - commenting out (Zak)

//app.get('/', (req, res) => {
// const allItems = data.getAll();
//  res.render('home', { items: allItems });
//});

app.get("/", (_, res) => {
  Book.find({})
    .lean()
    .then((books) => {
      res.render("home", { items: books });
    })
    .catch((err) => next(err));
});

app.get("/detail", (req, res) => {
  const key = req.query.key;
  const item = data.getItem(key);
  if (item) {
    res.render("detail", { item });
  } else {
    res.end("Item not found");
  }
});

app.get("/about", (req, res) => {
  console.log(req.url);
  res.end("This class is about creating amazing web applications");
});

app.listen(app.get("port"), () => {
  console.log("Express started");
});

// Confirmed it works!
app.get("/api/books", (req, res) => {
  Book.find({})
    .lean()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Database Error occurred");
    });
});

// Confirmed it works!
app.get("/api/books/:title", (req, res) => {
  Book.findOne({ title: req.params.title })
    .lean()
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Database Error occurred");
    });
});

// Confirmed it works!
app.delete("/api/books/:title", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      title: req.params.title,
    }).lean();
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error occurred");
  }
});


app.put('/api/books/:title', async (req, res) => {
  const filter = { title: req.params.title };
  const updateDoc = req.body;
  const options = { upsert: true, runValidators: true };
  try {
    const result = await Book.updateOne(filter, updateDoc, options);
    if (result.upsertedCount > 0) {
      res.status(201).json({ message: 'Book added' });
    }  if (result.modifiedCount > 0) {
      res.json({ message: 'Book updated' });
    
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    console.error("Failed", err); 
    res.status(500).send("Database Error occurred");
  }
}); 