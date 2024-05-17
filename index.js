import express from "express";
import * as data from "./data.js";
import { Book } from "./models/book.js";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.set("view engine", "ejs");

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

    app.get('/api/books', (req,res) => {
        Book.find({}).lean()
          .then((books) => {
            res.json(books);
          }) .catch(err =>  {
            res.status(500).send('Database Error occurred');
          })
    });

app.get('/api/books/:title', (req,res) => {
    Book.findOne({ title:req.params.title }).lean()
        .then((book) => {
           res.json(book);
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});

app.delete('/api/books/:title', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ title: req.params.title }).lean();

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error occurred');
  }
});


app.post('/api/books', (req,res) => {
     try  {
      const newBook = new Book(req.body);
      newBook.save()
        
        newBook.save();
       
           res.status(201).json(newBook);
         } catch (err) {
           coonsole.log('Faild', err);
           res.status(500).send('Database Error occurred');
       }
        

    
}); 
  
  
  