const { Nota, Tag, Usuario } = require('../models');
const controller = {};

controller.getTags = async (id = null) => {
  let result = [];

  try {
    if (id) {
      result = await Tag.findByPk(id, {
        include: {
          model: Nota,
          include: {
            model: Usuario
          }
        }
      });
    } else {
      result = await Tag.findAll({
        include: {
          model: Nota,
          include: {
            model: Usuario
          }
        }
      });
    }
  
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

controller.save = async (tag) => {
  return await Tag.create(tag);
};

controller.edit = async (id, tag) => {
  await Tag.update(tag, {
    where: { id }
  });

  return await controller.getTags(id);
};

controller.remove = async (id) => {
  try {
    return await Tag.destroy({ where: { id } });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

module.exports = controller;