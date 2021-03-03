const database = require('../models');
const controller = {};

controller.getUsuarios = () => {
  return [
    {
      "nome": "Henrique"
    },
    {
      "nome": "Pedro"
    }
  ]
};


module.exports = controller;