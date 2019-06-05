require('dotenv').config()
const chalk = require('chalk');
const express = require('express');
const logger = require('morgan');
const ODM = require('mongoose');

/* Import all the routes configuration */
const api = require('./src/routes/api');

/* [0] Instantiate the Express Class into  `app` variable. */
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    const formatedMessage = chalk.green(`Express server running on PORT: ${ PORT }`);
  
    console.log(formatedMessage);
  });