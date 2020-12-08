// dependencies
const express = require("express");
const jwt = require("jsonwebtoken");

// port
const PORT = 4000;

const app = express();

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
    jwt.sign({ user: user },
        "some_secret_key", { expiresIn: "30s" },
        (err, token) => {
            console.log(user, token);
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
    console.log(bearerHeader);
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

// listener
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});