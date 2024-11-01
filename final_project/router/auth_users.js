const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    return users.hasOwnProperty(username);
}

const authenticatedUser = (username, password) => { // returns boolean
    return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    console.log("Login route hit");
    const username = req.body.username;
    const password = req.body.password;
    console.log("Login request received:", req.body);
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in." });
    }

    if (users(username, password)) {
        let accessToken = jwt.sign({ username: username }, 'access', { expiresIn: 60 });

        req.session.authorization = {
            accessToken: accessToken
        };
        return res.status(200).send("User successfully logged in.");
    } else {
        return res.status(401).json({ message: "Invalid token." }); 
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
