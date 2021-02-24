const express = require('express');
const bodyParser = require('body-parser');
const usuario = require('./rotas/usuario');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/usuario', usuario);

app.get('/usuario/:id?', (req, res) => {
    res.send("Lista de Usuarios");
});

app.post('/usuario', (req, res) => {
    res.send(`${req.body}`);
});

app.delete('/usuario/:id', (req, res) => {
    res.send("Deletar um usuario");
});

app.put('/usuario/:id', (req, res) => {
    res.send("Atualizar um usuario");
});

app.get('/operacao/soma/:numero1/:numero2', (req, res) => {
    const result = parseFloat(req.params.numero1) + parseFloat(req.params.numero2);
    res.send(`${result}`);
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});