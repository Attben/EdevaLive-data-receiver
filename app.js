'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

app.use(express.json());
const PORT = 8080;
//Route strings
const AddVehicle = "/AddVehicle";

//HTTP requests
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Pages/index.html');
});

app.post('/', (req, res) => {
    let requestBody = req.body;
    console.log(requestBody);
    requestBody.Text = "Hello, ".concat(requestBody.Text);
    res.send(req.body);
});

app.options(AddVehicle, cors()) //Enable CORS pre-flight
app.post(AddVehicle, (req, res) => {
    io.emit("Add Vehicle", req.body);
    res.send("OK");
});

//socket.io connection handlers
io.on('connection', (socket) => {
    console.log("Incoming connection");
});

http.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Node running, listening on port ${PORT}`);
});
