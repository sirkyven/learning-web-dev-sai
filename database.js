const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('sqlite3-learn-web', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

// Create employees table
db.serialize(() => {
    db.run(`CREATE TABLE employees (
        employee_id INTEGER PRIMARY KEY,
        name TEXT,
        department TEXT
    )`);

    // Insert sample data
    const stmt = db.prepare("INSERT INTO employees (name, department) VALUES (?, ?)");
    stmt.run("Alice", "HR");
    stmt.run("Bob", "IT");
    stmt.run("Charlie", "Marketing");
    stmt.run("Diana", "Finance");
    stmt.finalize();
});

module.exports = db;
