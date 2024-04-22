import http from 'node:http';
import fs from 'node:fs';


http.createServer((req,res) => {
    let path = req.url.toLowerCase();    
  console.log(path);
    switch(path) {
        case '/':
           fs.readFile("about.html", (err, data) => {
            if (err) return console.error(err);
               res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data.toString());
           });
            break
      case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }    
}).listen(process.env.PORT || 3000);