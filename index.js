const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const public = require ('./routes/public');
const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const checklist = require('./routes/checklist');
const tag = require('./routes/tag');
const login = require('./routes/login');
const auth = require('./middlewares/auth');
const port = 4443;
// const fs = require('fs');
// const https = require('https');
const cors = require('cors');
// const portaHttps = 4443;

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/usuario/new', public);
app.use('/login', login);
app.use(auth);
app.use('/nota', nota);
app.use('/usuario', usuario);
app.use('/checklist', checklist);
app.use('/tag', tag);

// const key = fs.readFileSync('certs/localhost-key.pem');
// const cert = fs.readFileSync('certs/localhost.pem');

// const credentials = { key, cert };

// const httpsServer = https.createServer(credentials, app);

app.listen(port, () => {
  console.log(`API rodando seguramente na porta ${port}`);
});
