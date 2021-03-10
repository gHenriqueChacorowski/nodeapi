const { Router } = require('express');
const router = Router();
const controller = require('../controller/checklist')

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const checklist = await controller.getChecklist(id);

  res.send(checklist || []);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const checklist = await controller.save(body);

    res.send(checklist);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const checklist = await controller.edit(id, body);

    res.send(checklist);
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