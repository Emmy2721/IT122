import express from 'express';
import * as data from './data.js';
import {Book} from './models/book.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.set('view engine', 'ejs');

//app.get('/', (req, res) => {
 // const allItems = data.getAll();
//  res.render('home', { items: allItems });
//});

app.get('/', (_,res) => {
    Book.find({}).lean().then((books) => {
        res.render('home', {items: books});
    }).catch(err => next(err));
});

app.get('/detail', (req, res) => {
  const key = req.query.key;
  const item = data.getItem(key);
  if (item) {
    res.render('detail', { item });
  } else {
    res.send('Item not found');
  }
});


app.get( '/about', (req, res) => {
  console.log(req.url);
  res.send('This class is about creating amazing web applications');
});

app.listen(app.get('port'), () => {
  console.log('Express started'); 
});