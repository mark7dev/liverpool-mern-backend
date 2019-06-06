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


app.set('views', './src/views');
app.set('view engine', 'pug');
app.set('json spaces', 2);


app.use(logger('dev'));
app.use('/static', express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));


app.get('/', (request, response) => {
    response.render('main', {
      title: 'Liverpool CRUD',
      subtitle: 'Liverpool CRUD challenge'
    });
});


app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  
    next();
});


app.options('*', (request, response, next) => {
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    response.send(200);
    next();
});


app.use('/apilivercrud/v1', api);

app.use((request, response, next) => {
    const ERROR_404 = {
      error: {
        message: 'The requested resource is not defined.',
        status: 404
      }
    };
  
    next(ERROR_404);
});

app.use((error, request, response, next) => {
    const body = error.error;
    const STATUS_CODE = body.status || 500;
    const ERROR_505 = body.message || '500. Internal Server Error :(';
  
    const formatedMessage = JSON.stringify(error, null, 2);
  
    response
      .status(STATUS_CODE)
      .json({
        error: {
          message: ERROR_505,
          status: STATUS_CODE
        }
      });
  
    console.log(chalk.red(formatedMessage));
});


app.listen(PORT, () => {
    const formatedMessage = chalk.green(`Express server running on PORT: ${ PORT }`);
  
    console.log(formatedMessage);
});