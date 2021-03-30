const { Router } = require('express');
const router = Router();
const controller = require('../controller/nota')

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const nota = await controller.getById(id);

  res.send(nota);
});

router.get('/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const { tag } = req.query;

  const notaUsuario = await controller.getByUsuarioId(usuarioId, tag);

  res.send(notaUsuario);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const nota = await controller.save(body);

    res.send(nota);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const nota = await controller.edit(id, body);

    res.send(nota);
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