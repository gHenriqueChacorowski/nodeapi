const { Router } = require('express');
const router = Router();
const controller = require('../controller/usuario');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  
  const usuarios = await controller.getUsuarios(id);

  res.send(usuarios || []);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
  
    const usuario = await controller.save(body);
    
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

    await controller.remove(id);

    res.send({ id });
  } catch (err) {
    res.status(500).send({ err })
  }
});

module.exports = router;