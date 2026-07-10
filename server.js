const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL', err)
        return
    }
    console.log('Conectado ao bancco de dados MySQL com sucesso!')
})

app.get('/produtos', (req, res) => {
    db.query('SELECT  * FROM produtos', (err, result) => {
        if (err) return res.status(500).json({ error: err.message})
            res.json(result)
    })
})

app.post('/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body;
    db.query('INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)', 
    [nome, preco, descricao], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nome, preco, descricao });
    });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}/produtos`))