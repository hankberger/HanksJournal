// Import required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to SQLite database (creates the file if it doesn't exist)
// Updated the path to the database file so it is stored in /app/data
const db = new sqlite3.Database('/app/data/blog.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the posts table if it doesn't exist, without an image column
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating posts table:', err);
  }
});

// Route to POST a new blog post
app.post('/api/blog', (req, res) => {
  const { title, body } = req.body;
  
  // Validate request body
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }

  const sql = 'INSERT INTO posts (title, body) VALUES (?, ?)';
  db.run(sql, [title, body], function(err) {
    if (err) {
      console.error('Error inserting blog post:', err);
      return res.status(500).json({ error: 'Could not create blog post.' });
    }
    // Return the newly created post's details
    res.status(201).json({ id: this.lastID, title, body });
  });
});

// Route to GET all post titles
app.get('/api/blog/titles', (req, res) => {
  const sql = 'SELECT id, title FROM posts ORDER BY created_at DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving post titles:', err);
      return res.status(500).json({ error: 'Could not retrieve post titles.' });
    }
    res.json(rows);
  });
});

// Route to GET all blog posts
app.get('/api/blog', (req, res) => {
  const sql = 'SELECT * FROM posts';
  
  db.all(sql, (err, rows) => {
    if (err) {
      console.error('Error retrieving posts:', err);
      return res.status(500).json({ error: 'Could not retrieve posts.' });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No posts found.' });
    }
    res.json(rows);
  });
});

// Route to GET a blog post by ID
app.get('/api/blog/:id', (req, res) => {
  const postId = req.params.id;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  
  db.get(sql, [postId], (err, row) => {
    if (err) {
      console.error('Error retrieving post:', err);
      return res.status(500).json({ error: 'Could not retrieve post.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.json(row);
  });
});

// New route to download the entire database file
app.get('/api/download-db', (req, res) => {
  const filePath = '/app/data/blog.db'; // Path to the database file
  res.download(filePath, 'blog.db', (err) => {
    if (err) {
      console.error('Error downloading the database file:', err);
      return res.status(500).json({ error: 'Error downloading the database file.' });
    }
  });
});

// Health check route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
