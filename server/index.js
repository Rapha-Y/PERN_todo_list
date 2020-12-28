const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//Middleware
app.use(cors());

app.use(express.json());

app.use('/auth', require('./routes/jwtAuth'));

app.use('/dashboard', require('./routes/dashboard'));

//Connection
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});