const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const { Usuario } = require('../models');
const controller = require('../controller/usuario');
const controllerDefault = require('../controller/default');

router.get('/', async (req, res) => {
  const [type, token] = req.headers['authorization'].split(' ');

  const { id } = jwt.decode(token);

  const usuario = await controllerDefault.getById(Usuario, id);

  res.send(usuario);
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

    const usuario = await controller.edit(id, body);

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