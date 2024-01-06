const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/employees', (req, res) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});


// Handle POST Request
app.post('/signup', (req, res) => {
    const { username, password, email, phone } = req.body;
    const query = `INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)`;

    db.run(query, [username, password, email, phone], (err) => {
        if (err) {
            res.status(500).send('Error occurred while saving user data.');
            return console.error(err.message);
        }
        res.send('User registered successfully!');
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



// http vs crud, diff let/const, string interpolation, data/event and program
// briefly looked funcations and several ways to create them
// created a form with validations and a post call to update the db.
// created a new table.
