const { Checklist, Nota, Usuario } = require('../models');
const controller = {};

controller.getChecklist = async (id = null) => {
  let result = [];
    
  try {
    if (id) {
      result = await Checklist.findByPk(id, {
        include: {
          model: Nota,
          include: {
            model: Usuario
          }
        }
      });
    } else {
      result = await Checklist.findAll({
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

controller.save = async (checklist) => {
  return await Checklist.create(checklist);
};

controller.edit = async (id, checklist) => {
  await Checklist.update(checklist, {
    where: { id }
  });

  return await controller.getChecklist(id);
};

controller.remove = async (id) => {
  try {
    return await Checklist.destroy({ where: { id } });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

module.exports = controller;