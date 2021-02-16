/*const http = require('http').createServer(handler);
const fs = require('fs');

function handler(req, res) {
    console.log(req.url);
    let body = null;
    if (req.url != '/index.html' || req.url != '/') {
        const myURL = res.url.pathname;
        body = fs.readFileSync(`./public${myURL}`, 'utf8');
    } else {
        body = fs.readFileSync('./public/index.html', 'utf8');
    }
    res.end(body);
}

const port = process.env.PORT || 3000;
http.listen(port);
console.log(`Server started on port ${port}!`);*/

let express = require('express'),
    app = express();
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server started on port ${port}!`);