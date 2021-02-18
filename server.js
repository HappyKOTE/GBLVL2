const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    let body = null
    try {
        if (req.url.split('.')[1] == 'svg') {
            res.setHeader('Content-Type', 'image/svg+xml');
        }
        body = fs.readFileSync(`./public${req.url}`)
    } catch (err) {
        body = fs.readFileSync('./public/index.html')
    }
    res.end(body)
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server started on port ${port}!`);