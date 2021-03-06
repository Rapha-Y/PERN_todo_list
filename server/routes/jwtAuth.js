const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware//validInfo');
const authorization = require('../middleware/authorization');

router.post('/register', validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length !== 0) {
            return res.status(401).json('E-mail is already in use');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json('No users are registered under this e-mail');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json('Incorrect password');
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');   
    }
});

module.exports = router;