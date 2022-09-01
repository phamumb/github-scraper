const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000 || process.env.PORT;
const repositoriesRouter = require('./routes/repositories');

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});
app.use('/repositories', repositoriesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});