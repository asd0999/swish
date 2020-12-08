var express = require("express");
var exp_app = new express();
var http = require("http"),
    fs = require("fs"),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + "/index.html");

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
}, exp_app);

// Socket.io server listens to our app
var io = require("socket.io")(app);

// Send current time to all connected clients
function sendTime() {
    io.emit("time", { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on("connection", function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit("welcome", { message: "Welcome!", id: socket.id });

    socket.on("i am client", console.log);
});

app.listen(5000, () => {
    console.log("sketch listening on port 5000...");
});