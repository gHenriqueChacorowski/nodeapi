const { Router } = require('express');
const router = Router();
const controller = require('../controller/tag')

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const tag = await controller.getTags(id);

  res.send(tag || []);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const tag = await controller.save(body);

    res.send(tag);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const tag = await controller.edit(id, body);

    res.send(tag);
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