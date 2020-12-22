const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//Middleware
app.use(cors());

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

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
            [description, id]
        );

        res.json(updateTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
            [id]
        );

        res.json(deleteTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Connection
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});