const { Usuario, Nota, Checklist, Tag, sequelize } = require('../models');
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

controller.getById = async (id) => {
  return await Nota.findOne({
    where: {
      id
    },
    include: [
      {
        model: Checklist,
        as: 'checklists',
      },
      {
        model: Tag,
        as: 'tags',
      }
    ]
  });
};

controller.getByUsuarioId = async (usuarioId, tagName = null) => {
  let where = null;
  let required = false;

  if (tagName) {
    where = { nome: tagName };
    required = true;
  }
  
  return await Nota.findOne({
    where: {
      usuarioId
    },
    include: [
      {
        model: Checklist,
        as: 'checklists',
      },
      {
        model: Tag,
        as: 'tags',
        where,
        required
      }
    ]
  });
};

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
  const transaction = await sequelize.transaction();

  try {
    let { dataValues } = await Nota.create({
      usuarioId,
      titulo,
      descricao,
    }, {
      transaction,
    });

    let notaSalva = dataValues;

    let checklistsSalvos = [];

    if (checklists.length > 0) {
      for (let checklist of checklists) {
        checklist = {...checklist, notaId: notaSalva.id };

        const checklistSalvo = await Checklist.create(checklist, {
          transaction,
        });
  
        checklistsSalvos = [ ...checklistsSalvos, checklistSalvo ];
      };
    }
    console.log(checklistsSalvos);

    let tagsSalvas = [];

    if (tags.length > 0) {
      for (let tag of tags) {
        tag = {...tag, notaId: notaSalva.id };
        
        const tagSalva = await Tag.create(tag, {
          transaction,
        });
  
        tagsSalvas = [ ...tagsSalvas, tagSalva ];
      };
    }

    notaSalva = { ...notaSalva, checklist: checklistsSalvos, tag: tagsSalvas };
   
    await transaction.commit();
    
    return notaSalva;
  } catch (err) {
    console.log(err);
    await transaction.rollback();
  }
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