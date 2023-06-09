// Require the MySQL library
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Handle the HTTP POST request from the front end interface
app.post('/create-listing', (req, res) => {
  // Extract the form data from the request body
  const { name, size, price, description } = req.body;

  // Insert the form data into the MySQL database
  const sql = `INSERT INTO listings (name, size, price, description) VALUES (?, ?, ?, ?)`;
  const values = [name, size, price, description];

  connection.query(sql, values, (error, results) => {
    if (error) {
      // Handle the error
      console.error(error);
      res.status(500).send('Error adding listing to database');
    } else {
      // Send a response back to the front end interface
      res.send('Listing added to database');
    }
  });
});
