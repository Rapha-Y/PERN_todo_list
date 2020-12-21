const express = require('express');
const app = express();
const pool = require('./db');

//Middleware
app.use(express.json());

//Routes
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query(
            'SELECT * FROM todo'
        );

        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1',
            [id]
        );

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *',
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Connection
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});