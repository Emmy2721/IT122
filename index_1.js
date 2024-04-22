import express from 'express';


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const allItems = data.getAll();
  res.render('home', { items: allItems });
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
