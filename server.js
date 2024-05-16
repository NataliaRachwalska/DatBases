const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dziennik',
    password: 'postgres',
    port: 2022,
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

app.get('/api/items',authenticateJwt, (req, res) => {
    pool.query('SELECT * FROM items', (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result.rows);
        }
    });
});

app.post('/api/items', authenticateJwt,(req, res) => {
    const { name, description } = req.body;

    pool.query(
        'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
        [name, description],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});

app.put('/api/items/:id', authenticateJwt,(req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    pool.query(
        'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (result.rows.length === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});

app.delete('/api/items/:id',authenticateJwt, (req, res) => {
    const { id } = req.params;

    pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING *',
        [id],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (result.rows.length === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});