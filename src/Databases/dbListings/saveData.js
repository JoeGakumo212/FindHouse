const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbListings'
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ' + error.stack);
    return;
  }
  console.log('Connected to the database with ID ' + connection.threadId);
});

// Define the data to be inserted
const floorPlanData = [
  {
    name: 'First Floor',
    size: '1267 Sqft',
    rooms: '670 Sqft',
    baths: '530 Sqft',
    price: 1489,
    description: 'Plan description. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
  },
  {
    name: 'Second Floor',
    size: '1367 Sqft',
    rooms: '770 Sqft',
    baths: '630 Sqft',
    price: 1589,
    description: 'Plan description. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
  }
];

// Insert the data into the floor_plans table
const query = 'INSERT INTO floor_plans (name, size, rooms, baths, price, description) VALUES ?';
connection.query(query, [floorPlanData.map(plan => Object.values(plan))], (error, result) => {
  if (error) throw error;
  console.log(`Inserted ${result.affectedRows} rows into the floor_plans table.`);
});

// Close the database connection
connection.end();
