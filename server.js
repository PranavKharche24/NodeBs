const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'bookapp',
  password: 'Thisisthebookapp@22',
  database: 'book_management'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API routes
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching books' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;
  db.query('INSERT INTO books (title, author, year) VALUES (?, ?, ?)', [title, author, year], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding book' });
      return;
    }
    res.json({ id: result.insertId, title, author, year });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));