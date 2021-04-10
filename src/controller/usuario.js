const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario, Nota, Checklist, Tag, sequelize } = require('../models');
const { secret } = require('../config/security');
const usuario = require('../models/usuario');
const tag = require('../models/tag');
const nota = require('../models/nota');
const controller = {};

controller.login = async (email, senha) => {
  try {
    const usuario = await Usuario.scope('login').findOne({ where: { email } });
    const senhaCorreta = bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) return false;

    return jwt.sign({ id: usuario.id }, secret, {
      expiresIn: '24h',
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

controller.getUsuarios = async (id) => {
  return await Usuario.findOne({
    where: {
      id
    },
    include: [
      {
        model: Nota,
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
      },
    ]
  });
};

controller.save = async (usuario) => {
  return await Usuario.create(usuario);
};

controller.edit = async (id, { nome, email, avatar = null, notas = []}) => {
  try {
    const usuarioEditado = await Usuario.update({nome, email, avatar}, {
      where: { id }
    })

    if (notas.length > 0 ) {
      notas.forEach(nota => {
        let { id, usuarioId, titulo, descricao } = nota;

        const notaEditada = Nota.update({titulo, descricao}, {
          where: { id, usuarioId }
        })

        nota.checklists.forEach(checklist => {
          let { id, descricao, notaId } = checklist;

          const checklistEditado = Checklist.update({ descricao }, {
            where: { id, notaId }
          })
        })

        nota.tags.forEach(tag => {
          let { id, nome, notaId } = tag;

          const tagEditada = Tag.update({ nome }, {
            where: { id, notaId }
          })
        })
      }); 
    }

    return await controller.getUsuarios(id);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

controller.remove = async (id) => {
  try {
    return await Usuario.destroy({ where: { id } });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

module.exports = controller;