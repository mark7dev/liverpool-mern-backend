require('dotenv').config()
const chalk = require('chalk');
const express = require('express');
const logger = require('morgan');
const ODM = require('mongoose');

const api = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;


ODM.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});

ODM.connection.on('connected', () => {
    const formatedMessage = {
      host: process.env.MONGODB_PROVIDER,
      success: true
    };
  
    console.log(JSON.stringify(formatedMessage, null, 2));
});

app.use(logger('dev'));
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.listen(PORT, () => {
    const formatedMessage = chalk.green(`Express server running on PORT: ${ PORT }`);
  
    console.log(formatedMessage);
});

app.use('/apilivercrud/v1', api);