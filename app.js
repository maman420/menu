const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { validationResult } = require('express-validator');

const testRouter = require('./clientApi/test');

const app = express();
const port = process.env.PORT || 3000;

// Set various HTTP headers for security
app.use(helmet());

// Limit the number of requests from an IP address to prevent DoS attacks
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })
);

app.use(cors({
    origin: 'https://red-island-05208dc03.3.azurestaticapps.net/',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/test', testRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Request validation middleware
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
});


app.listen(port, () =>{
  console.log('server is listening on port ' + port)
})