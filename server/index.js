const express = require('express');
const app = express();
const pool = require('./db');

//Middleware
app.use(express.json());

//Routes
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *',
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

//Connection
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});