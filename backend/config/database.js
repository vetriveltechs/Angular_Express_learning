// const mongoose = require('mongoose');
// const { DB_URI } = require('./config');

// async function getDatabase() {
//     try {
//         await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Database Connected');
//     } catch (error) {
//         console.error('Database Not Connected', error);
//     }
// }

// module.exports = { getDatabase };



const mysql = require('mysql2/promise'); // Use the promise version
const glob = require("glob");
const path = require('path');

require("dotenv").config({ path: path.join(__dirname, '../.variables.env') });

// Ensure you are running node 10.0+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
  console.log(
    "Please go to nodejs.org and download version 10 or greater. 👌\n "
  );
  process.exit();
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);


// Handle errors
pool.on('error', (err) => {
  console.error('MySQL error:', err);
});

module.exports = pool;


// const mongoose = require('mongoose');
// const glob = require("glob");
// const path = require("path");

// // Make sure we are running node 10.0+
// const [major, minor] = process.versions.node.split(".").map(parseFloat);
// if (major < 10 || (major === 10 && minor <= 0)) {
//   console.log(
//     "Please go to nodejs.org and download version 10 or greater. 👌\n "
//   );
//   process.exit();
// }

// const getDatabase = async () => {
//     try {
//         if (!process.env.DATABASE) {
//             throw new Error('DATABASE environment variable not set');
//         }

//         await mongoose.connect(process.env.DATABASE, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         mongoose.Promise = global.Promise;
//         console.log('Database connection successful');

//         // Dynamically load all model files
//         glob.sync("./models/*.js").forEach(function (file) {
//             require(path.resolve(file));
//         });

//         return mongoose.connection.getClient();
//     } catch (err) {
//         console.error('Database connection error:', err.message);
//         process.exit(1);
//     }
// };

// module.exports = { getDatabase };


