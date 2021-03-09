const { Sequelize, DataTypes } = require('sequelize');
const _Usuario = require('./usuario');
const _Nota = require('./nota');
const _Tag = require('./tag');
const _Checklist = require('./checklist');
const database = {};

const options = {
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
};

const sequelize = new Sequelize(options);

let Usuario = _Usuario(sequelize, DataTypes);
let Nota = _Nota(sequelize, DataTypes);
let Tag = _Tag(sequelize, DataTypes);
let Checklist = _Checklist(sequelize, DataTypes);

database['Usuario'] = Usuario;
database['Nota'] = Nota;
database['Tag'] = Tag;
database['Checklist'] = Checklist;

for (const key in database) {
  if (database[key].associate) database[key].associate(database);
};

sequelize
  .authenticate()
  .then(() => console.log(`Conexão com o banco ${options.database} realizada com sucesso`))
  .catch(err => console.log(`Falha ao conectar ao banco ${options.database}: ${err}`));

database.sequelize = sequelize;

module.exports = database;