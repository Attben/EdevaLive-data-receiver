'use strict';

const express = require('express');
const app = express();

const http = require('http').createServer(app);

const PORT = 8080;

app.get('/', (req, res) => {
    console.log("Incoming connection");
    res.sendFile(__dirname + '/Pages/index.html');
});

http.listen(PORT, () => {
    console.log(__dirname);
    console.log("Hello, world!");
});
