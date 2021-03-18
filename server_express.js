const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/itemslist/:page', (req, res) => {
    const page = req.params.page;
    fs.readFile(__dirname + `/public/api/items${page}.json`, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/itemslist', (req, res) => {
    const filePath = __dirname + '/public/api/items3.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        const list = JSON.parse(data);
        const newID = 9 + Object.keys(list).length;
        const newItem = req.body;
        newItem.id = newID;
        list[newID] = newItem;
        fs.writeFile(filePath, JSON.stringify(list), (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send(list);
            }
        });
    });
});

app.get('/cartlist', (req, res) => {
    fs.readFile(__dirname + '/public/api/cart.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server started on port ${port}`);