const { Router } = require('express');
const router = Router();
const { Usuario } = require('../models');
const controller = require('../controller/usuario');
const controllerDefault = require('../controller/default');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const usuarios = id ? await controllerDefault.getById(Usuario, id) : await controllerDefault.getAll(Usuario);

  res.send(usuarios || []);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
  
    const usuario = await controllerDefault.save(Usuario, body);
    
    res.send(usuario);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const usuario = await controllerDefault.edit(Usuario, body, id);

    res.send(usuario);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await controllerDefault.remove(Usuario, id);

    res.send({ id });
  } catch (err) {
    res.status(500).send({ err })
  }
});

module.exports = router;