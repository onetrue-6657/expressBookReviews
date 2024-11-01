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
public_users.get('/', async function (req, res) {
    const data = await new Promise((resolve) => {
        resolve(books);
    });
    res.send(JSON.stringify(data, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    new Promise((resolve) => {
        resolve(books[isbn]);
    })
    .then((data) => {
        res.send(JSON.stringify(data, null, 4));
    })
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    new Promise((resolve) => {
        let books = [];
        let bookKeys = Object.keys(books);
        for (let i = 0; i < bookKeys.length; i++) {
            let book  = books[bookKeys[i]];
            if (book.author === author) {
                books.push(book);
            }
        }
        resolve(books);
    })
    .then((data) => {
        res.send(JSON.stringify(data, null, 4));
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    new Promise((resolve) => {
        let books = [];
        let bookKeys = Object.keys(books);
        for (let i = 0; i < bookKeys.length; i++) {
            let book  = books[bookKeys[i]];
            if (book.title === title) {
                books.push(book);
            }
        }
        resolve(books);
    })
    .then((data) => {
        res.send(JSON.stringify(data, null, 4));
    })
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
