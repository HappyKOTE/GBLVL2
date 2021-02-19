// помучался, пока не нашел мануал для либы express, которая существенно упрощает создание сервера

let express = require('express'),
    app = express();
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server started on port ${port}!`);