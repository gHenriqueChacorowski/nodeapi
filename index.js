const express = require('express');
const bodyParser = require('body-parser');
const usuario = require('./src/routes/usuario');
const nota = require('./src/routes/nota');
const checklist = require('./src/routes/checklist');
const tag = require('./src/routes/tag');
const login = require('./src/routes/login');
const auth = require('./src/middlewares/auth');
const morgan = require('morgan');
// const fs = require('fs');
// const https = require('https');
const app = express();
// const cors = require('cors');
const port = 3000;
// const portHttps = 443;

// app.use(
//   cors({
//     origin: ['https://localhost:8080']
//   })
// );
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/login', login);
app.use(auth);
app.use('/usuario', usuario);
app.use('/nota', nota);
app.use('/checklist', checklist);
app.use('/tag', tag);

// const key = fs.readFileSync('src/certs/localhost-key.pem');
// const cert = fs.readFileSync('src/certs/localhost.pem');

// const credentials = { key, cert };

// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(portHttps, () => {
//   console.log(`API rodando seguramente na porta ${portHttps}`)
// })

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});