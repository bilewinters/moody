'use strict'

let express = require('express');

let app  = express();
let port = 8080;

app.use(express.static(__dirname + '/dist/'));
app.listen(port);
