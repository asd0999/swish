// // dependencies
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const socketIo = require("socket.io");
// const https = require("https");
// const fs = require("fs");

// env variables
const PORT = 4000;

// initialize instance of express, http, ws, peerserver
const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
// const wsServer = new WebSocket.Server({ server: httpServer });

// middleware
app.use(express.json());
app.use(morgan(":method :url :status"));

const corsOptions = {
    origin: ["*", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// routes
// unprotected get route
app.get("/api", (req, res) => {
    res.json({
        message: "API is working",
    });
});

// index.html file for socket.io checking
app.get("/api/io", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// protected post route
app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "some_secret_key", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created... ",
                authData,
            });
        }
    });
});

// login route to generate a jwt token
app.post("/api/login", (req, res) => {
    // mock user
    const user = {
        id: 1,
        username: "asd0999",
    };

    // generate token asynchronously, using a callback
    jwt.sign({ user: user }, // data for creating the token
        "some_secret_key", { expiresIn: "30s" },
        (err, token) => {
            // console.log(user, token);
            res.json({
                token: token,
            });
        }
    );
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// verify token before giving access to the protected route
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader);
    if (typeof bearerHeader !== "undefined") {
        // extract token from bearer
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); //forbidden
    }
}

// SOCKET CONNECTION

io.on("connection", function(socket) {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// let clients = [];

// const uuid = () => {
//     let r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16);
//     return r() + r() + r();
// };

// wsServer.on("connection", function(client) {
//     client.id = uuid();
//     clients.push(client.id);
//     console.log("connected:", client.id);
//     console.log(clients);

//     client.on("message", (e) => {
//         const message = JSON.parse(e);
//         console.log(message);
//         client.send(
//             JSON.stringify({
//                 message: "ack",
//             })
//         );
//     });

//     client.on("close", (e) => {
//         console.log("close", e);
//     });
// });

httpServer.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
});