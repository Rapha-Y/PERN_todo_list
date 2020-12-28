const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

//get user and their todos
router.get('/', authorization, async (req, res) => {
    try {
        const user = await pool.query(
            'SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1',
            [req.user.id]
        );
        
        res.json(user.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
});

//create a todo
router.post('/todos', authorization, async (req, res) => {
    try {
        const { description } = req.body;
        
        const newTodo = await pool.query(
            'INSERT INTO todos (description, user_id) VALUES ($1, $2) RETURNING *',
            [description, req.user.id]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//update a todo
router.put('/todos/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
            [description, id, req.user.id]
        );

        if (updateTodo.rows.length === 0) {
            return res.json('This todo is not yours');
        }

        res.json(updateTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//delete a todo
router.delete('/todos/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query(
            'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );

        if (deleteTodo.rows.length === 0) {
            return res.json('This todo is not yours');
        }

        res.json(deleteTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;