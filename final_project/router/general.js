const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    console.log("Login route hit");
    const username = req.body.username;
    const password = req.body.password;

    if (users.some(user => user.username === username)) {
        res.status(404).json({message: "Unable to register. Username already exists."});
    } else {
        if (username && password) {
            if (!isValid(username)) {
                users.push({"username": username, "password": password});
                return res.status(200).json({message: "User successfully registered"});
            } 
        } 
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authorName = req.params.author;
    const book = Object.values(books).filter(book => book.author === authorName);

    if (book.length > 0) {
        res.send(book);
    } else {
        res.status(404).json({ message: "No books found by this author." });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const titleName = req.params.title;
    const book = Object.values(books).filter(book => book.title === titleName);

    if (book.length > 0) {
        res.send(book);
    } else {
        res.status(404).json({ message: "No books found by this author." });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = Object.values(books).filter(book => book.isbn === isbn);

    if (book.length > 0) {
        res.send(book[review]);
    } else {
        res.status(404).json({ message: "No books found by this author." });
    }
});

module.exports.general = public_users;
