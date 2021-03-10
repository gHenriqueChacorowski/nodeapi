const { Usuario, Nota } = require('../models');
const controller = {};

controller.getNotas = async (id = null) => {
  let result = [];

  if (id) {
    result = await Nota.findByPk(id, {
      include: {
        model: Usuario
      }
    });
  } else {
    result = await Nota.findAll({
      include: {
        model: Usuario
      }
    });
  }

  return result;
};

controller.save = async (nota) => {
  return await Nota.create(nota);
};

controller.edit = async (id, nota) => {
  await Nota.update(nota, {
    where: { id }
  });

  return await controller.getNotas(id);
};

controller.remove = async (id) => {
  try {
    return await Nota.destroy({ where: { id } });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

module.exports = controller;