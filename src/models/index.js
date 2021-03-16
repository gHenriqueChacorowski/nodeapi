const { Sequelize, DataTypes } = require('sequelize');
let { NODE_ENV } = process.env;
let options = require('../config/database');
var _Usuario = require('./usuario');
var _Nota = require('./nota');
var _Tag = require('./tag');
var _Checklist = require('./checklist');
let database = {};

NODE_ENV = NODE_ENV || 'production';

options = options[NODE_ENV];

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
  .then(() => console.log(`Conexão com o banco ${options.database} no ambiente ${NODE_ENV} realizada com sucesso`))
  .catch(err => console.log(`Falha ao conectar ao banco ${options.database}: ${err}`));

database.sequelize = sequelize;

module.exports = database;