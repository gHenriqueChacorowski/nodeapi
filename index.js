const express = require('express');
const bodyParser = require('body-parser');
const usuario = require('./src/routes/usuario/usuario.js');
const nota = require('./src/routes/nota/nota.js');
const checklist = require('./src/routes/checklist/checklist.js');
const tag = require('./src/routes/tag/tag.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/usuario', usuario);
app.use('/nota', nota);
app.use('/checklist', checklist);
app.use('/tag', tag);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});