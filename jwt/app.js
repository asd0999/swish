// dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const morgan = require("morgan");

// env variables
const PORT = 4000;

// initialize instance of express
const app = express();

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
//unprotected get route
app.get("/api", (req, res) => {
    res.json({
        message: "API is working",
    });
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
    // get the auth header value
    const bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader);
    // check if bearer is undefine
    if (typeof bearerHeader !== "undefined") {
        // extract token from bearer
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}

// listener express - not used
// app.listen(PORT, () => {
//     console.log(`Express server listening on port ${PORT}`);
// });

// listener http
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
    // console.log("HTTP Server running on port 80");
});

// listener https
// const httpsServer = https.createServer({
//         key: fs.readFileSync("/etc/letsencrypt/live/my_api_url/privkey.pem"),
//         cert: fs.readFileSync("/etc/letsencrypt/live/my_api_url/fullchain.pem"),
//     },
//     app
// );
// httpsServer.listen(443, () => {
//     console.log("HTTPS Server running on port 443");
// });