'use strict';

const express = require('express');
const app = express();

const http = require('http').createServer(app);

app.use(express.json());
const PORT = 8080;

app.get('/', (req, res) => {
    console.log("Incoming connection");
    res.sendFile(__dirname + '/Pages/index.html');
});

app.post('/', (req, res) => {
    let requestBody = req.body;
    console.log(requestBody);
    requestBody.Text = "Hello, ".concat(requestBody.Text);
    res.send(req.body);
});

http.listen(PORT, () => {
    console.log(__dirname);
    console.log("Hello, world!");
});
