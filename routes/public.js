const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const controller = require('../controller/default');
const { Usuario } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const usuario = await controller.save(Usuario, body);

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
