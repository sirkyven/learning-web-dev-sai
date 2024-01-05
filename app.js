const express = require('express');
const db = require('./database');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome Venky to </h1>');
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
