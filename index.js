const express = require('express');
const bodyParser = require('body-parser');
const usuario = require('./src/routes/usuario.js');
const nota = require('./src/routes/nota.js');
const checklist = require('./src/routes/checklist.js');
const tag = require('./src/routes/tag.js');
const fs = require('fs');
const https = require('https');
const app = express();
// const cors = require('cors');
const port = 3000;
const portHttps = 443;

// app.use(
//   cors({
//     origin: ['https://localhost:8080']
//   })
// );

app.use(bodyParser.json());

app.use('/usuario', usuario);
app.use('/nota', nota);
app.use('/checklist', checklist);
app.use('/tag', tag);

const key = fs.readFileSync('src/certs/localhost-key.pem');
const cert = fs.readFileSync('src/certs/localhost.pem');

const credentials = { key, cert };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(portHttps, () => {
  console.log(`API rodando seguramente na porta ${portHttps}`)
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});