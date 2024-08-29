const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const glob = require("glob");
const pool = require('./config/database');
const knex = require('./config/knex');

// const global_file=require('./config/globalconfig'); // Adjust the path as necessary

const cookieParser = require('cookie-parser');
const router = require('./routers/router');

const flash = require('connect-flash');

require("dotenv").config({ path: ".variables.env" });

app.use(cookieParser()); // Parse cookies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(flash());


  app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {  maxAge: 1 * 60 * 1000 } // Set to true if using HTTPS
  }));

app.use(passport.initialize());
app.use(passport.session());

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');


glob.sync("./routes/*.js").forEach(function (file) {
    const route = require(path.resolve(file));
    if (route.path && route.router) {
        app.use(route.path, route.router); // Assuming each route file exports { path, router }
    }
});

app.use('/', router);

const PORT = process.env.PORT;

// Start the server
app.listen(PORT, async () => {
  try {
      console.log(`Server is running on port ${PORT}`);
  } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
  }
});
